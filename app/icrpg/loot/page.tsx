import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ICRPG_LOOT } from "@/lib/data/icrpg-loot";
import { ICRPG_GEAR } from "@/lib/data/icrpg-gear";
import type { IcrpgLoot, IcrpgGear } from "@/lib/data/icrpg-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  IcrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, hbBadge,
  WORLDS, worldName, one, type Query, type RawQuery,
} from "@/components/IcrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/icrpg/loot";

type LootRow = IcrpgLoot & { homebrew?: boolean };
type GearRow = IcrpgGear & { homebrew?: boolean };

const s = (data: Record<string, unknown>, k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
const list = (data: Record<string, unknown>, k: string) => (Array.isArray(data[k]) ? (data[k] as unknown[]) : []).filter((x): x is string => typeof x === "string");

function hbToLoot(data: Record<string, unknown>, name: string): LootRow {
  const effects = list(data, "effects");
  return { name, table: s(data, "table") || "Homebrew", roll: s(data, "roll") || undefined, desc: s(data, "desc"), effects: effects.length ? effects : undefined, homebrew: true };
}
function hbToGear(data: Record<string, unknown>, name: string): GearRow {
  const effects = list(data, "effects");
  return { name, world: s(data, "world") || "core", category: s(data, "category") || "Gear", desc: s(data, "desc"), effects: effects.length ? effects : undefined, homebrew: true };
}

export default async function IcrpgLootPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbLoot, ownLoot, hbGear, ownGear, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "icrpg-loot" }),
    ownHomebrew(user.id, "icrpg-loot"),
    visibleHomebrew(user.id, { type: "icrpg-gear" }),
    ownHomebrew(user.id, "icrpg-gear"),
    userCampaigns(user.id),
  ]);

  const lootRows: LootRow[] = [...hbLoot.map((h) => hbToLoot(h.data as Record<string, unknown>, h.name)), ...ICRPG_LOOT.map((l) => ({ ...l }))];
  const gearRows: GearRow[] = [...hbGear.map((h) => hbToGear(h.data as Record<string, unknown>, h.name)), ...ICRPG_GEAR.map((g) => ({ ...g }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const world = WORLDS.some((w) => w.key === one(raw.world)) ? one(raw.world) : "";
  const current: Query = { q, world };

  // Loot tables aren't world-tagged, so the world chip only narrows Gear.
  const loot = lootRows.filter((l) => !needle || [l.name, l.table, l.desc, (l.effects ?? []).join(" ")].join(" ").toLowerCase().includes(needle)).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const gear = gearRows.filter((g) => (!world || (g.world || "core") === world) && (!needle || [g.name, g.category, g.desc, (g.effects ?? []).join(" ")].join(" ").toLowerCase().includes(needle))).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const showLoot = !world; // hide loot section when a world is selected
  const total = (showLoot ? loot.length : 0) + gear.length;
  const filtered = Boolean(needle || world);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <IcrpgHeader title="Loot &amp; Gear" subtitle={`${ICRPG_LOOT.length} loot · ${ICRPG_GEAR.length} gear`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Loot tables are rolled for treasure and rewards; gear is what a hero carries. Weapons roll d6 EFFORT, Guns d6/d8, Magic &amp; Energy d10. The World chip filters gear by setting.</p>

      <div className="mb-6 flex flex-col gap-6">
        <HomebrewEditor kind="icrpg-loot" campaigns={campaigns} initial={ownLoot} />
        <HomebrewEditor kind="icrpg-gear" campaigns={campaigns} initial={ownGear} />
      </div>

      <SearchForm base={BASE} q={q} placeholder="Search loot &amp; gear…" hidden={{ world }} />
      <ChipRow label="World (gear)" base={BASE} current={current} param="world" options={WORLDS} active={world} />
      <CountLine count={total} noun="entry" base={BASE} filtered={filtered} />

      {total === 0 ? (
        <EmptyState noun="item" base={BASE} />
      ) : (
        <>
          {showLoot && loot.length ? (
            <section className="mb-8">
              <SectionH>Loot Tables</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {loot.map((l) => (
                  <li key={`${l.homebrew ? "hb" : "bk"}-l-${l.table}-${l.name}`} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{l.name}</h3>
                      {l.roll ? <span className="font-mono text-[11px] text-[#e8823c]">{l.roll}</span> : null}
                      {l.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={badge}>{l.table}</span>}
                    </div>
                    {l.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{l.desc}</p> : null}
                    {l.effects?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Effects:</span> {l.effects.join(", ")}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {gear.length ? (
            <section>
              <SectionH>Gear</SectionH>
              <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                {gear.map((g) => (
                  <li key={`${g.homebrew ? "hb" : "bk"}-g-${g.name}`} className={cardCls}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className={nameCls}>{g.name}</h3>
                      <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{g.category}</span>
                      {g.homebrew ? <span className={hbBadge}>Homebrew</span> : (g.world && g.world !== "core") ? <span className={badge}>{worldName(g.world)}</span> : null}
                    </div>
                    {g.desc ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{g.desc}</p> : null}
                    {g.effects?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Effects:</span> {g.effects.join(", ")}</p> : null}
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
