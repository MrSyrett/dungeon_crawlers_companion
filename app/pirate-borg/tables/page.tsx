import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_GM_TABLES } from "@/lib/data/pb-data";
import type { PbTable } from "@/lib/data/pb-types";
import { PbHeader, ChipRow, SearchForm, CountLine, EmptyState, TableCard, N, sectionH, one, srcKey, srcChips, tableText, type RawQuery } from "@/components/PbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/pirate-borg/tables";

// The Guidebook / Trapped in the Tropics tables carry no `group`; file them here.
const FALLBACK: Record<string, string> = {
  reaction: "Rules & Combat", morale: "Rules & Combat", broken: "Rules & Combat", misfire: "Rules & Combat", amongTheDead: "Rules & Combat",
  joker: "Relics & Rituals", relics: "Relics & Rituals", rituals: "Relics & Rituals", mishaps: "Relics & Rituals",
  names: "Names",
  derelict: "Naval & Weather", windDirection: "Naval & Weather", changingWinds: "Naval & Weather", foulWeather: "Naval & Weather", shanties: "Naval & Weather",
  maritimeEvents: "Maritime Travel Events", plunder: "Cargo",
  zombieAppearance: "Undead", traps: "Traps", trapDetails: "Traps",
};
const ORDER = [
  "Rules & Combat", "Relics & Rituals", "Names", "NPCs", "Carousing & Taverns", "Rumors", "Jobs & Quests", "Pirate Generator",
  "Setting", "ASH", "Alchemy", "Loot & Treasure", "Treasure Maps", "Uncharted Islands", "Naval & Weather", "Maritime Travel Events",
  "Ships at Sea", "Cargo", "Derelict Ship", "Enemy Builder", "Undead", "Traps", "The Curse of Skeleton Point",
];
const groupOf = (t: PbTable): string => (typeof t.group === "string" && t.group ? t.group : FALLBACK[t.id] ?? "Other");
const slug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function PbTablesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const all = Object.values(PB_GM_TABLES);
  const present = [...new Set(all.map(groupOf))];
  const groups = [...ORDER.filter((g) => present.includes(g)), ...present.filter((g) => !ORDER.includes(g))];
  const grpOpts = groups.map((g) => ({ key: slug(g), label: g }));
  const grp = grpOpts.some((o) => o.key === one(raw.grp)) ? one(raw.grp) : "";
  const srcOpts = srcChips(all.map((t) => t.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const q = one(raw.q).trim().toLowerCase();
  const current = { q: one(raw.q), grp, src };
  const facets = (t: PbTable) => ({ grp: slug(groupOf(t)), src: srcKey(t.source) });
  const show = (t: PbTable) => facetMatch(facets(t), current) && (!q || tableText(t).toLowerCase().includes(q));
  const shown = all.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="GM Tables" subtitle={`${all.length} random tables · islands, pirates, jobs, rumors, carousing & more`} />
      <p className="mb-4 max-w-[75ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Every random table in the Pirate Borg data, grouped the way you reach for them at the table. The GM Screen&apos;s table roller draws on these same tables; this page is the reference. <N>d66</N>: roll two d6, the first is the tens. Multi-column tables can be rolled one die per column or read straight across.
      </p>
      <InstantFilter>
        <SearchForm base={BASE} q={one(raw.q)} placeholder="Search every table…" hidden={{ grp, src }} />
        <ChipRow label="Group" base={BASE} current={current} param="grp" options={grpOpts} active={grp} />
        <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
        <CountLine count={shown} noun="table" base={BASE} filtered={!!(q || grp || src)} />
        <EmptyState noun="table" base={BASE} hidden={shown > 0} />
        {groups.map((g) => {
          const list = all.filter((t) => groupOf(t) === g);
          const wide = (t: PbTable) => (t.columns?.length ?? 0) > 1 || (t.rows?.length ?? 0) > 24;
          return (
            <section key={g} id={`group-${slug(g)}`} data-section hidden={!list.some(show)} className="mb-8 scroll-mt-20">
              <h2 className={sectionH}>{g} <N className="text-[16px] text-[var(--muted)]">{list.length}</N></h2>
              <div className="grid items-start gap-4 md:grid-cols-2">
                {list.map((t) => (
                  <div key={t.id} id={`t-${t.id}`} hidden={!show(t)} data-f={facetAttr(facets(t))} className={`min-w-0 scroll-mt-20 ${wide(t) ? "md:col-span-2" : ""}`}>
                    <TableCard t={t} cols={wide(t) ? 2 : 1} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </InstantFilter>
    </div>
  );
}
