import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_SPELLS, DB_MAGIC_TRICKS, DB_SUMMONS, DB_MAGIC_RULES, DB_GM_TABLES, DB_ADVANCEMENT } from "@/lib/data/db-data";
import type { DbSpell, DbMagicTrick, DbSummon } from "@/lib/data/db-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, SectionNav, DieTable, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, one, isHb, srcKey, srcChips, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/magic";
const SCHOOLS = ["General", "Animism", "Elementalism", "Mentalism"];
const SCHOOL_LABEL: Record<string, string> = { General: "General Magic", Animism: "Animism", Elementalism: "Elementalism", Mentalism: "Mentalism" };
const CAST_LABEL: Record<string, string> = { action: "Action", reaction: "Reaction", stretch: "Stretch", shift: "Shift" };
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function costText(s: DbSpell): string {
  return s.powerLevels ? "2 WP per power level (1–3)" : "2 WP";
}
function scaleText(s: DbSpell): string {
  const d = s.damage, h = s.healing;
  const parts: string[] = [];
  if (d) parts.push(`${d.base} damage${d.perLevel ? `, +${d.perLevel} per extra power level` : ""}${d.chain?.length ? ` · chains ${d.chain.join(" → ")}` : ""}`);
  if (h) parts.push(`heals ${h.base}${h.perLevel ? `, +${h.perLevel} per extra power level` : ""}`);
  return parts.join(" · ");
}
function reqText(s: DbSpell): string {
  return s.requirements.map(cap).join(", ") + (s.requirementDetail ? ` (${s.requirementDetail})` : "");
}

function SpellCard({ s, full }: { s: DbSpell; full?: boolean }) {
  const line = (label: string, val?: string) => (val ? <div><dt className="inline font-semibold text-[var(--text)]">{label}:</dt> <dd className="inline">{val}</dd></div> : null);
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        {full ? <h2 className="text-3xl text-[var(--sys-link)]">{s.name} {isHb(s) ? <span className={hbBadge}>HB</span> : null}</h2> : <h3 className={nameCls}>{s.name} {isHb(s) ? <span className={hbBadge}>HB</span> : null}</h3>}
        <span className="flex shrink-0 gap-1.5"><span className={badge}>{SCHOOL_LABEL[s.school] ?? s.school}</span><span className={badge}>Rank {s.rank}</span></span>
      </div>
      <dl className="mt-1.5 grid gap-x-4 gap-y-0.5 text-[12.5px] text-[var(--muted)] sm:grid-cols-2">
        {line("Prerequisite", s.prerequisite)}
        {line("Requirement", reqText(s))}
        {line("Casting time", CAST_LABEL[s.castingTime] ?? s.castingTime)}
        {line("Range", s.range)}
        {line("Duration", s.duration)}
        {line("Cost", costText(s))}
      </dl>
      {scaleText(s) ? <p className="mt-1.5 text-[12.5px] text-[var(--text)]">{scaleText(s)}</p> : null}
      <p className={`mt-1.5 leading-relaxed text-[var(--muted)] ${full ? "text-[14px]" : "text-[12.5px]"}`}>{s.text}</p>
      <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{[s.dodge ? "Can be dodged" : "", s.parry ? "Can be parried" : "", s.page ? `p.${s.page}` : ""].filter(Boolean).join(" · ")}</p>
    </>
  );
}

function SummonCard({ m }: { m: DbSummon }) {
  return (
    <div className={cardCls}>
      <div className="flex items-start justify-between gap-2"><h3 className={nameCls}>{m.name}</h3><span className={badge}>{m.spell}</span></div>
      <p className="mt-1 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Movement</span> {m.movement} · <span className="font-semibold text-[var(--text)]">HP</span> {m.hpPerLevel} per power level · <span className="font-semibold text-[var(--text)]">Armor</span> {m.armor ?? "—"}</p>
      <p className="mt-1 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{m.attack.name}.</span> {m.attack.damage} {m.attack.type}. {m.attack.note}</p>
      <Bullets className="mt-1" items={[...m.abilities, ...m.resistances.map((r) => `Resistance: ${r}`), ...m.immunities.map((r) => `Immunity: ${r}`)]} />
    </div>
  );
}

export default async function DbMagicPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "db-spell" }),
    ownHomebrew(user.id, "db-spell"),
    userCampaigns(user.id),
  ]);
  const hbData = hbV.map((h) => h.data as Record<string, unknown>);
  const hbSpells = hbData.filter((d) => !d.trick) as unknown as DbSpell[];
  const hbTricks = hbData.filter((d) => d.trick) as unknown as DbMagicTrick[];
  const spells = [...hbSpells, ...DB_SPELLS];
  const tricks = [...hbTricks, ...DB_MAGIC_TRICKS];

  const pick = one(raw.sp);
  const selected = pick ? spells.find((s) => s.id === pick || s.name === pick) ?? null : null;
  if (selected) {
    const leadsTo = spells.filter((s) => s.prerequisite.split(/ and | or |, /).map((x) => x.trim()).includes(selected.name)).map((s) => s.name);
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <DbHeader title="Magic" subtitle={`${SCHOOL_LABEL[selected.school] ?? selected.school} · rank ${selected.rank}`} />
        <BackLink href={BASE} label="All spells" />
        <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--db)" }}>
          <SpellCard s={selected} full />
          {leadsTo.length ? <p className="mt-3 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Prerequisite for:</span> {leadsTo.join(", ")}</p> : null}
        </div>
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const school = SCHOOLS.includes(one(raw.school)) ? one(raw.school) : "";
  const ranks = [...new Set(spells.map((s) => s.rank))].sort((a, b) => a - b).map(String);
  const rank = ranks.includes(one(raw.rank)) ? one(raw.rank) : "";
  const casts = Object.keys(CAST_LABEL).filter((c) => spells.some((s) => s.castingTime === c));
  const cast = casts.includes(one(raw.cast)) ? one(raw.cast) : "";
  const srcOpts = srcChips([...spells, ...tricks].map((s) => s.source as string | undefined));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), school, rank, cast, src };
  const facets = (s: DbSpell) => ({ school: s.school, rank: String(s.rank), cast: s.castingTime, src: srcKey(s.source as string | undefined) });
  const show = (s: DbSpell) => facetMatch(facets(s), current) && (!q || s.name.toLowerCase().includes(q) || s.text.toLowerCase().includes(q));
  const list = spells.slice().sort((a, b) => SCHOOLS.indexOf(a.school) - SCHOOLS.indexOf(b.school) || a.rank - b.rank || a.name.localeCompare(b.name));
  const shown = list.filter(show).length;
  const R = DB_MAGIC_RULES;
  const L = DB_ADVANCEMENT.magic;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="Magic" subtitle={`${DB_SPELLS.length} spells · ${DB_MAGIC_TRICKS.length} magic tricks · 3 schools + General Magic${hbData.length ? ` · +${hbData.length} homebrew` : ""}`} />
      <HomebrewEditor kind="db-spell" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[{ id: "casting", label: "Casting Rules" }, { id: "spells", label: "Spells" }, { id: "tricks", label: "Magic Tricks" }, { id: "summons", label: "Summoned Elementals" }, { id: "learning", label: "Learning Magic" }, { id: "mishaps", label: "Magical Mishaps" }]} />

      <section id="casting" className="scroll-mt-20">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Casting a spell</p>
            <Bullets className="mt-1" items={[
              "Spend WP and roll your skill in the spell's school (any school can cast General Magic). On a failure the WP is still spent.",
              `Power level 1–${R.maxPowerLevel} costs ${R.wpPerPowerLevel} WP per level; spells without power levels cost ${R.fixedCost} WP. Magic tricks cost ${R.trickCost} WP and always work.`,
              `Prepared spells: ${R.preparedLimit}. Preparing takes a shift with your grimoire.`,
              R.grimoire,
              R.metal,
              R.powerFromBody.text,
            ]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Dragons, Demons &amp; durations</p>
            <p className="mt-1 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Dragon:</span> the target needs a Dragon to resist, dodge or parry, and you choose one:</p>
            <Bullets className="mt-1" items={R.dragon} />
            <p className="mt-1.5 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Demon:</span> {R.demon}</p>
            <p className="mt-1.5 text-[12.5px] text-[var(--muted)]">{R.aoe}</p>
            <dl className="mt-1.5 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
              {Object.entries(R.durations).map(([k, v]) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{k}:</dt> <dd className="inline">{v}</dd></div>)}
            </dl>
          </div>
        </div>
        <p className="mt-3 text-[12.5px] text-[var(--muted)]">Spell ranks 1–5 show how complex a spell is; they have no mechanical effect. Requirements: <span className="text-[var(--text)]">Word</span> (spoken aloud), <span className="text-[var(--text)]">Gesture</span>, <span className="text-[var(--text)]">Focus</span> (an item held in hand) and <span className="text-[var(--text)]">Ingredient</span> (used up).</p>
      </section>

      <section id="spells" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Spells</h2>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search spells…" hidden={{ school, rank, cast, src }} />
          <ChipRow label="School" base={BASE} current={current} param="school" options={SCHOOLS.map((s) => ({ key: s, label: SCHOOL_LABEL[s] }))} active={school} />
          <ChipRow label="Rank" base={BASE} current={current} param="rank" options={ranks.map((r) => ({ key: r, label: `Rank ${r}` }))} active={rank} />
          <ChipRow label="Casting" base={BASE} current={current} param="cast" options={casts.map((c) => ({ key: c, label: CAST_LABEL[c] }))} active={cast} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="spell" base={BASE} filtered={!!(q || school || rank || cast || src)} />
          <EmptyState noun="spell" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {list.map((s, i) => (
              <li key={`${s.id}-${i}`} className={cardCls} hidden={!show(s)} data-f={facetAttr(facets(s))}>
                <a href={`${BASE}?sp=${encodeURIComponent(s.id)}`} className="block hover:[&_h3]:underline"><SpellCard s={s} /></a>
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="tricks" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Magic tricks</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Minor spells: always prepared (they don&apos;t count against the limit), always need a gesture, cost 1 WP and succeed automatically.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {SCHOOLS.map((sc) => {
            const t = tricks.filter((x) => x.school === sc);
            if (!t.length) return null;
            return (
              <div key={sc} className={cardCls}>
                <p className="font-display text-lg text-[var(--text)]">{SCHOOL_LABEL[sc]}</p>
                <dl className="mt-1 flex flex-col gap-1 text-[12.5px] leading-relaxed text-[var(--muted)]">
                  {t.map((x) => <div key={x.id}><dt className="inline font-semibold text-[var(--text)]">{x.name}{isHb(x) ? " (HB)" : ""}.</dt> <dd className="inline">{x.text}</dd></div>)}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      <section id="summons" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Summoned elementals</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Rank 3 Elementalism. Each counts as a monster in combat, obeys its summoner (a free action), acts on its own initiative and must stay within sight of the mage.</p>
        <div className="grid gap-3 md:grid-cols-2">{DB_SUMMONS.map((m) => <SummonCard key={m.id} m={m} />)}</div>
      </section>

      <section id="learning" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Learning magic</h2>
        <div className={cardCls}>
          <Bullets items={[L.spellFromTeacher, L.spellFromGrimoire, L.trick, L.school, "A newly created mage chooses three rank 1 spells and three magic tricks from their school or General Magic, and gets a grimoire."]} />
        </div>
      </section>

      <section id="mishaps" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Magical mishaps</h2>
        <DieTable die={DB_GM_TABLES.magicalMishaps.die} note={DB_GM_TABLES.magicalMishaps.note} rows={DB_GM_TABLES.magicalMishaps.rows ?? []} />
      </section>
    </div>
  );
}
