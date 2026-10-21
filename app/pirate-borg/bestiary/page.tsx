import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_MONSTERS, PB_RULES } from "@/lib/data/pb-data";
import type { PbMonster } from "@/lib/data/pb-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { PbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, Bullets, DieTable, MonsterBlock, MonsterCard, N, cardCls, eyebrow, sectionH, one, srcKey, srcChips, catLabel, type RawQuery } from "@/components/PbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/pirate-borg/bestiary";
const CATS = ["npc", "undead", "beast", "spirit", "monster"];

export default async function PbBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "pb-monster" }),
    ownHomebrew(user.id, "pb-monster"),
    userCampaigns(user.id),
  ]);
  const hbMonsters = hbV.map((h) => h.data as unknown as PbMonster);
  const all = [...hbMonsters, ...PB_MONSTERS];

  const pick = one(raw.m);
  const selected = pick ? all.find((m) => m.id === pick || m.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <PbHeader title="Bestiary" subtitle={`${catLabel(selected.category)} · ${selected.source}`} />
        <BackLink href={BASE} label="All creatures" />
        <MonsterBlock m={selected} />
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const cats = [...CATS, ...new Set(all.map((m) => m.category).filter((c) => !CATS.includes(c)))].filter((c) => all.some((m) => m.category === c));
  const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
  const srcOpts = srcChips(all.map((m) => m.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), cat, src };
  const facets = (m: PbMonster) => ({ cat: m.category, src: srcKey(m.source) });
  const searchText = (m: PbMonster) => [m.name, m.text, typeof m.group === "string" ? m.group : "", ...m.attacks.map((a) => a.name), ...m.specials.map((s) => s.name + " " + s.text)].join(" ").toLowerCase();
  const show = (m: PbMonster) => facetMatch(facets(m), current) && (!q || searchText(m).includes(q));
  const list = all.slice().sort((a, b) => a.name.replace(/^\W+/, "").localeCompare(b.name.replace(/^\W+/, "")));
  const shown = list.filter(show).length;
  const R = PB_RULES;
  const tt = PB_MONSTERS.filter((m) => m.source === "Trapped in the Tropics").length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Bestiary" subtitle={`${PB_MONSTERS.length} creatures & NPCs${hbMonsters.length ? ` + ${hbMonsters.length} homebrew` : ""} · zombies, Redcoats & horrors of the deep`} />
      <HomebrewEditor kind="pb-monster" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[{ id: "creatures", label: "Creatures" }, { id: "fighting", label: "Fighting Enemies" }]} />

      <p className="mb-4 max-w-[70ch] text-[13px] leading-relaxed text-[var(--muted)]">
        The Player&apos;s Guidebook carries no bestiary: <N>{tt}</N> of these come from the <em>Trapped in the Tropics</em> adventure and the rest are the few creatures the Guidebook&apos;s magic can call up. Add your own with Homebrew above.
      </p>

      <section id="creatures" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search creatures, attacks or specials…" hidden={{ cat, src }} />
          <ChipRow label="Category" base={BASE} current={current} param="cat" options={cats.map((c) => ({ key: c, label: catLabel(c) }))} active={cat} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="creature" base={BASE} filtered={!!(q || cat || src)} />
          <EmptyState noun="creature" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {list.map((m, i) => (
              <li key={`${m.id}-${i}`} className={cardCls} hidden={!show(m)} data-f={facetAttr(facets(m))} data-s={searchText(m)}>
                <MonsterCard m={m} href={`${BASE}?m=${encodeURIComponent(m.id)}`} />
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="fighting" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Fighting enemies</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>How enemies act</p>
            <Bullets className="mt-1" items={[
              R.violence.text,
              <>PCs attack in melee with STRENGTH and at range with PRESENCE, both against <N>DR12</N> unless the creature&apos;s block says otherwise; to avoid a hit they defend with AGILITY <N>DR12</N>.</>,
              "A failed defense means the enemy hits: take its damage, minus your armor die. An enemy's armor die is subtracted from your damage the same way — but black powder ignores armor.",
              "Outside combat creatures have no abilities: when a test is needed they roll a plain d20 against the DR.",
              <>Morale <N>–</N> means the creature never breaks (most undead and summoned things).</>,
            ]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Morale <N className="ml-1 text-[var(--pb-ink)]">{R.morale.die}</N></p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{R.morale.text}</p>
            <Bullets className="mt-1" items={R.morale.triggers} />
            <div className="mt-3"><DieTable title="Demoralized" die={R.morale.result.die} rows={R.morale.result.rows} /></div>
          </div>
          <div className={cardCls}>
            <DieTable title="Reaction" die={R.reaction.die} note={R.reaction.text} rows={R.reaction.rows} />
          </div>
          <div className={cardCls}>
            <DieTable title="Initiative" die={R.violence.initiative.die} rows={R.violence.initiative.rows} note={`Optional individual initiative: ${R.violence.initiative.individual}.`} />
          </div>
        </div>
      </section>
    </div>
  );
}
