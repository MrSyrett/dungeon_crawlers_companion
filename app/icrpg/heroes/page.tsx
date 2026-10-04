import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ICRPG_TYPES } from "@/lib/data/icrpg-hero-types";
import { ICRPG_ABILITIES } from "@/lib/data/icrpg-abilities";
import type { IcrpgType, IcrpgAbility } from "@/lib/data/icrpg-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  IcrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, hbBadge,
  WORLDS, worldName, one, type Query, type RawQuery,
} from "@/components/IcrpgRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/icrpg/heroes";

type TypeRow = IcrpgType & { homebrew?: boolean };
type AbilityRow = IcrpgAbility & { homebrew?: boolean };

const s = (data: Record<string, unknown>, k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
const list = (data: Record<string, unknown>, k: string) => (Array.isArray(data[k]) ? (data[k] as unknown[]) : []).filter((x): x is string => typeof x === "string");

function hbToType(data: Record<string, unknown>, name: string): TypeRow {
  const startingLoot = list(data, "startingLoot");
  const abilities = list(data, "abilities");
  return {
    name, world: s(data, "world") || "core", desc: s(data, "desc"),
    statFocus: s(data, "statFocus") || undefined,
    startingLoot: startingLoot.length ? startingLoot : undefined,
    abilities: abilities.length ? abilities : undefined,
    homebrew: true,
  };
}
function hbToAbility(data: Record<string, unknown>, name: string): AbilityRow {
  return { name, kind: s(data, "kind") || "Ability", world: s(data, "world") || "core", desc: s(data, "desc"), homebrew: true };
}

export default async function IcrpgHeroesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbTypes, ownTypes, hbAbilities, ownAbilities, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "icrpg-type" }),
    ownHomebrew(user.id, "icrpg-type"),
    visibleHomebrew(user.id, { type: "icrpg-ability" }),
    ownHomebrew(user.id, "icrpg-ability"),
    userCampaigns(user.id),
  ]);

  const typeRows: TypeRow[] = [...hbTypes.map((h) => hbToType(h.data as Record<string, unknown>, h.name)), ...ICRPG_TYPES.map((t) => ({ ...t }))];
  const abilityRows: AbilityRow[] = [...hbAbilities.map((h) => hbToAbility(h.data as Record<string, unknown>, h.name)), ...ICRPG_ABILITIES.map((a) => ({ ...a }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const world = WORLDS.some((w) => w.key === one(raw.world)) ? one(raw.world) : "";
  const current: Query = { q, world };

  // Every type and ability is rendered; the World chip and the search filter on
  // the client (InstantFilter). `show*` applies the URL's filters for the
  // initial paint, through the same facet match the client uses.
  const types = typeRows.slice().sort((a, b) => a.name.localeCompare(b.name, "en"));
  const abilities = abilityRows.slice().sort((a, b) => a.name.localeCompare(b.name, "en"));
  const typeFacets = (t: TypeRow) => ({ world: t.world || "core" });
  const abilityFacets = (a: AbilityRow) => ({ world: a.world || "core" });
  const showType = (t: TypeRow) => facetMatch(typeFacets(t), current) && (!needle || [t.name, t.desc, t.statFocus ?? "", (t.abilities ?? []).join(" ")].join(" ").toLowerCase().includes(needle));
  const showAbility = (a: AbilityRow) => facetMatch(abilityFacets(a), current) && (!needle || [a.name, a.kind, a.desc].join(" ").toLowerCase().includes(needle));
  const shown = types.filter(showType).length + abilities.filter(showAbility).length;
  const filtered = Boolean(needle || world);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Heroes" subtitle={`${ICRPG_TYPES.length} types · ${ICRPG_ABILITIES.length} abilities`} />

      <div className="mb-6 flex flex-col gap-6">
        <HomebrewEditor kind="icrpg-type" campaigns={campaigns} initial={ownTypes} />
        <HomebrewEditor kind="icrpg-ability" campaigns={campaigns} initial={ownAbilities} />
      </div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search heroes…" hidden={{ world }} />
      <ChipRow label="World" base={BASE} current={current} param="world" options={WORLDS} active={world} />
      <CountLine count={shown} noun="entry" base={BASE} filtered={filtered} />

      <EmptyState noun="hero option" base={BASE} hidden={shown > 0} />
      <>
        <section className="mb-8" data-section>
          <SectionH>Hero Types</SectionH>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {types.map((t) => (
              <li key={`${t.homebrew ? "hb" : "bk"}-t-${t.name}`} className={cardCls} hidden={!showType(t)} data-f={facetAttr(typeFacets(t))}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{t.name}</h3>
                  {t.homebrew ? <span className={hbBadge}>Homebrew</span> : (t.world && t.world !== "core") ? <span className={badge}>{worldName(t.world)}</span> : null}
                  {t.statFocus ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{t.statFocus}</span> : null}
                </div>
                {t.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{t.desc}</p> : null}
                {t.startingLoot?.length ? <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Loot:</span> {t.startingLoot.join(", ")}</p> : null}
                {t.abilities?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Abilities:</span> {t.abilities.join(", ")}</p> : null}
              </li>
            ))}
          </ul>
        </section>
        <section data-section>
          <SectionH>Abilities, Powers &amp; Augments</SectionH>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {abilities.map((a) => (
              <li key={`${a.homebrew ? "hb" : "bk"}-a-${a.name}`} className={cardCls} hidden={!showAbility(a)} data-f={facetAttr(abilityFacets(a))}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className={nameCls}>{a.name}</h3>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{a.kind}</span>
                  {a.homebrew ? <span className={hbBadge}>Homebrew</span> : (a.world && a.world !== "core") ? <span className={badge}>{worldName(a.world)}</span> : null}
                </div>
                {a.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{a.desc}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      </>
      </InstantFilter>
    </div>
  );
}
