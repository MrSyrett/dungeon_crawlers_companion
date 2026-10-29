import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_MONSTERS, PB_RULES, PB_ENEMY_BUILDER, PB_MARROW_CANNONS, PB_CAPTAINS, PB_SHIP_TEMPLATES, PB_SHIPS, PB_FACTIONS, PB_GM_TABLES } from "@/lib/data/pb-data";
import type { PbMonster } from "@/lib/data/pb-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { PbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, Bullets, DieTable, TableCard, MonsterBlock, MonsterCard, N, cardCls, chipBase, chipOff, eyebrow, sectionH, badge, dBadge, one, srcKeys, srcChips, sourceRefs, catLabel, hpLabel, moraleLabel, armorDie, BESTIARY, type RawQuery } from "@/components/PbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = BESTIARY;
const CATS = ["npc", "undead", "beast", "spirit", "monster", "flora", "construct"];
// Galleries and rosters collapse into families for the Group chips ("Dark Fauna:
// Avian" → Dark Fauna; the four captains' rosters → Archetype Captains).
const FAMILY_ORDER = ["Dark Fauna", "Dark Flora", "Skeletons", "Zombies", "Ghosts", "Marrow Cannons", "Archetype Captains", "Vessel from the Deep", "Redcoats", "Skeleton Point"];
function family(m: PbMonster): string {
  const g = typeof m.group === "string" ? m.group : "";
  if (!g) return "";
  if (g.startsWith("Dark Fauna")) return "Dark Fauna";
  if (g.startsWith("Archetype Captain")) return "Archetype Captains";
  if (g.startsWith("Skeleton Point")) return "Skeleton Point";
  return g;
}
const slug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sortName = (m: PbMonster) => m.name.replace(/^(The|Skeleton:|Zombie:)\s+/i, "").replace(/^\W+/, "");

function MiniMonster({ m }: { m: PbMonster }) {
  return (
    <a href={`${BASE}?m=${encodeURIComponent(m.id)}`} className="group block rounded border border-[var(--border)] bg-[var(--panel-2)] p-2.5 hover:border-[var(--pb)]">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-[14px] font-semibold text-[var(--sys-link)] group-hover:underline">{m.name}</span>
        <span className={badge}>{catLabel(m.category)}</span>
      </span>
      <span className="mt-0.5 block text-[12px] text-[var(--muted)]"><N className="text-[var(--text)]">HP {hpLabel(m)} · Morale {moraleLabel(m)} · {m.armor ? armorDie(m.armor.die) : "no armor"}</N></span>
    </a>
  );
}

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
  const byId = new Map(PB_MONSTERS.map((m) => [m.id, m]));
  const captainName = (m: PbMonster) => (typeof m.captain === "string" ? PB_CAPTAINS.find((c) => c.id === m.captain)?.name : undefined);

  const pick = one(raw.m);
  const selected = pick ? all.find((m) => m.id === pick || m.name === pick) ?? null : null;
  if (selected) {
    const g = typeof selected.group === "string" ? selected.group : "";
    const siblings = g ? all.filter((m) => m.group === g && m.id !== selected.id) : [];
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <PbHeader title="Bestiary" subtitle={`${catLabel(selected.category)} · ${selected.source}`} />
        <BackLink href={BASE} label="All creatures" />
        <MonsterBlock m={selected} captainName={captainName(selected)} />
        {siblings.length ? (
          <nav aria-label={g} className="mt-4">
            <p className={eyebrow}>Also in {g}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {siblings.sort((a, b) => (Number(a.roll ?? 0) - Number(b.roll ?? 0)) || a.name.localeCompare(b.name)).map((m) => <a key={m.id} href={`${BASE}?m=${encodeURIComponent(m.id)}`} className={`${chipBase} ${chipOff}`}>{typeof m.roll === "number" ? <N className="mr-1 text-[var(--pb-ink)]">{m.roll}</N> : null}{m.name}</a>)}
            </div>
          </nav>
        ) : null}
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const cats = [...CATS, ...new Set(all.map((m) => m.category).filter((c) => !CATS.includes(c)))].filter((c) => all.some((m) => m.category === c));
  const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
  const fams = [...FAMILY_ORDER, ...new Set(all.map(family).filter((f) => f && !FAMILY_ORDER.includes(f)))].filter((f) => all.some((m) => family(m) === f));
  const grpOpts = fams.map((f) => ({ key: slug(f), label: f }));
  const grp = grpOpts.some((o) => o.key === one(raw.grp)) ? one(raw.grp) : "";
  const srcOpts = srcChips(all.flatMap((m) => sourceRefs(m).map((r) => r.source)));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), cat, grp, src };
  const facets = (m: PbMonster) => ({ cat: m.category, grp: family(m) ? slug(family(m)) : "", src: srcKeys(m) });
  const searchText = (m: PbMonster) => [m.name, m.text, typeof m.group === "string" ? m.group : "", ...m.attacks.map((a) => a.name), ...m.specials.map((s) => s.name + " " + s.text)].join(" ").toLowerCase();
  const show = (m: PbMonster) => facetMatch(facets(m), current) && (!q || searchText(m).includes(q));
  const list = all.slice().sort((a, b) => sortName(a).localeCompare(sortName(b)));
  const shown = list.filter(show).length;
  const R = PB_RULES, EB = PB_ENEMY_BUILDER;
  const count = (s: string) => PB_MONSTERS.filter((m) => sourceRefs(m).some((r) => r.source === s)).length;
  const zombieLook = PB_GM_TABLES[EB.variants.zombies?.appearanceTable ?? "zombieAppearance"];
  const ids = (xs: string[]) => xs.map((id) => byId.get(id)).filter((m): m is PbMonster => !!m);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Bestiary" subtitle={`${PB_MONSTERS.length} creatures & NPCs${hbMonsters.length ? ` + ${hbMonsters.length} homebrew` : ""} · the dead, the deep & the damned`} />
      <HomebrewEditor kind="pb-monster" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[
        { id: "creatures", label: "Creatures" }, { id: "make-your-own", label: "Make Your Own Enemies" }, { id: "undead-crews", label: "Undead Crews" },
        { id: "marrow-cannons", label: "Marrow Cannons" }, { id: "captains", label: "Archetype Captains" }, { id: "fighting", label: "Fighting Enemies" },
      ]} />

      <p className="mb-4 max-w-[75ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Every creature block from the Core Rules (<N>{count("Core Rules")}</N>), its module <em>The Curse of Skeleton Point</em> (<N>{count("The Curse of Skeleton Point")}</N>), the <em>Trapped in the Tropics</em> adventure (<N>{count("Trapped in the Tropics")}</N>) and the few things the Player&apos;s Guidebook&apos;s magic calls up (<N>{count("Player's Guidebook")}</N>). A block printed in more than one book shows under each source. Add your own with Homebrew above.
      </p>

      <section id="creatures" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search creatures, attacks or specials…" hidden={{ cat, grp, src }} />
          <ChipRow label="Category" base={BASE} current={current} param="cat" options={cats.map((c) => ({ key: c, label: catLabel(c) }))} active={cat} />
          <ChipRow label="Group" base={BASE} current={current} param="grp" options={grpOpts} active={grp} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="creature" base={BASE} filtered={!!(q || cat || grp || src)} />
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

      <section id="make-your-own" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Make your own enemies</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{EB.note} Roll (or pick) on each table in turn — {EB.procedure.map((k) => EB.tables[k].name).join(", ")} — then describe it. <span className={dBadge}>pg. {EB.page}</span></p>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {EB.procedure.map((k) => <TableCard key={k} t={EB.tables[k]} id={`eb-${k}`} cols={1} />)}
        </div>
        {EB.variants.customisable ? (
          <div className={`${cardCls} mt-4`}>
            <p className={eyebrow}>Customisable minions</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">Blocks marked <em>choose 1 or 2</em> give a weapon list instead of fixed attacks: arm each minion with one or two of them so no two look alike.</p>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">{ids(EB.variants.customisable.ids).map((m) => <MiniMonster key={m.id} m={m} />)}</div>
          </div>
        ) : null}
      </section>

      <section id="undead-crews" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Undead crews</h2>
        <div className="grid items-start gap-4 md:grid-cols-3">
          {(["skeletons", "zombies", "ghosts"] as const).map((k) => {
            const v = EB.variants[k];
            if (!v) return null;
            return (
              <div key={k} className={cardCls} id={`undead-${k}`}>
                <div className="flex items-baseline justify-between gap-2"><p className={eyebrow}>{k.charAt(0).toUpperCase() + k.slice(1)}</p>{v.page ? <span className={dBadge}>pg. {v.page}</span> : null}</div>
                {v.rule ? <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{v.rule}</p> : null}
                <div className="mt-2 flex flex-col gap-1.5">{ids(v.ids).map((m) => <MiniMonster key={m.id} m={m} />)}</div>
                {k === "zombies" && zombieLook?.rows ? <div className="mt-3"><DieTable title={zombieLook.name} die={zombieLook.die} rows={zombieLook.rows} /></div> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section id="marrow-cannons" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Marrow cannons</h2>
        <div className={cardCls}>
          <p className="text-[13px] leading-relaxed text-[var(--muted)]">{PB_MARROW_CANNONS.text} <span className="italic">By {PB_MARROW_CANNONS.author}.</span> <span className={dBadge}>pg. {PB_MARROW_CANNONS.page}</span></p>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-3">{ids(PB_MARROW_CANNONS.monsters).map((m) => <MiniMonster key={m.id} m={m} />)}</div>
          <p className="mt-2 text-[12.5px] text-[var(--muted)]"><a href="/pirate-borg/naval#template-ship-of-bone" className="text-[var(--sys-link)] hover:underline">Ship of Bone template →</a></p>
        </div>
      </section>

      <section id="captains" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Archetype captains</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">Four ready-made enemy captains, each with officers, a crew and a fleet. The fleet entry is a template laid over one of the listed vessels.</p>
        <div className="grid items-start gap-4 lg:grid-cols-2">
          {PB_CAPTAINS.map((c) => {
            const fleet = PB_SHIP_TEMPLATES.find((t) => t.id === c.ships);
            const base = fleet?.template ? PB_SHIP_TEMPLATES.find((t) => t.id === fleet.template) : undefined;
            const faction = PB_FACTIONS.find((f) => f.id === c.faction);
            const boss = byId.get(c.captain);
            return (
              <article key={c.id} id={`captain-${c.id}`} className={`${cardCls} scroll-mt-20 border-l-4 border-r-4`} style={{ borderLeftColor: "var(--pb)", borderRightColor: "var(--pb)" }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[22px] leading-tight text-[var(--sys-link)]">{c.name}</h3>
                  <span className="flex gap-1.5">{faction ? <span className={badge}>{faction.name}</span> : null}<span className={dBadge}>pg. {c.page}</span></span>
                </div>
                <p className="mt-1 text-[13px] italic leading-relaxed text-[var(--muted)]">{c.text}</p>
                <p className={`${eyebrow} mt-3`}>Captain, officers &amp; crew</p>
                <div className="mt-1 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">{[...(boss ? [boss] : []), ...ids(c.officers), ...ids(c.crew)].map((m) => <MiniMonster key={m.id} m={m} />)}</div>
                <p className={`${eyebrow} mt-3`}>Aboard their ship</p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--muted)]">{c.aboard}</p>
                {fleet ? (
                  <>
                    <p className={`${eyebrow} mt-3`}>Fleet: {fleet.name}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--muted)]">{fleet.text}</p>
                    <Bullets className="mt-1" items={[...(base ? base.traits.map((t) => <><b className="text-[var(--text)]">{t.name}</b> ({base.name}): {t.text}</>) : []), ...fleet.traits.map((t) => <><b className="text-[var(--text)]">{t.name}:</b> {t.text}</>)]} />
                  </>
                ) : null}
                <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Vessels:</span>{c.vessels.map((v) => { const s = PB_SHIPS.find((x) => x.id === v); return s ? <a key={v} href={`/pirate-borg/naval?s=${encodeURIComponent(v)}`} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{s.name}</a> : null; })}</p>
              </article>
            );
          })}
        </div>
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
              "Big sea creatures carry a second, naval block: in naval combat they fight as ships, ignore the wind and move up to their speed in any direction.",
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
