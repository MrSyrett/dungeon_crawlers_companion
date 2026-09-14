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

  const matchWorld = (w: string) => !world || (w || "core") === world;
  const types = typeRows.filter((t) => matchWorld(t.world) && (!needle || [t.name, t.desc, t.statFocus ?? "", (t.abilities ?? []).join(" ")].join(" ").toLowerCase().includes(needle))).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const abilities = abilityRows.filter((a) => matchWorld(a.world) && (!needle || [a.name, a.kind, a.desc].join(" ").toLowerCase().includes(needle))).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const total = types.length + abilities.length;
  const filtered = Boolean(needle || world);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Heroes" subtitle={`${ICRPG_TYPES.length} types · ${ICRPG_ABILITIES.length} abilities`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Every hero assigns 6 points across STR, DEX, CON, INT, WIS &amp; CHA (max +10 each), then picks a Type and its Abilities, Powers, and Augments. Your World sets which options are on the table.</p>

      <div className="mb-6 flex flex-col gap-6">
        <HomebrewEditor kind="icrpg-type" campaigns={campaigns} initial={ownTypes} />
        <HomebrewEditor kind="icrpg-ability" campaigns={campaigns} initial={ownAbilities} />
      </div>

      <SearchForm base={BASE} q={q} placeholder="Search heroes…" hidden={{ world }} />
      <ChipRow label="World" base={BASE} current={current} param="world" options={WORLDS} active={world} />
      <CountLine count={total} noun="entry" base={BASE} filtered={filtered} />

      {total === 0 ? (
        <EmptyState noun="hero option" base={BASE} />
      ) : (
        <>
          {types.length ? (
            <section className="mb-8">
              <SectionH>Hero Types</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {types.map((t) => (
                  <li key={`${t.homebrew ? "hb" : "bk"}-t-${t.name}`} className={cardCls}>
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
          ) : null}
          {abilities.length ? (
            <section>
              <SectionH>Abilities, Powers &amp; Augments</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {abilities.map((a) => (
                  <li key={`${a.homebrew ? "hb" : "bk"}-a-${a.name}`} className={cardCls}>
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
          ) : null}
        </>
      )}
    </div>
  );
}
