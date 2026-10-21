import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_HEROIC_ABILITIES, DB_PROFESSIONS } from "@/lib/data/db-data";
import type { DbHeroicAbility, DbRequirement } from "@/lib/data/db-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DbHeader, ChipRow, SearchForm, CountLine, EmptyState, BackLink, RuleNote, cardCls, nameCls, badge, hbBadge, one, isHb, srcKey, srcChips, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/abilities";

const ANY_LABEL: Record<string, string> = { melee: "any melee weapon skill", strMelee: "any STR-based melee skill", weapon: "any weapon skill", magic: "any school of magic" };
const TIMING_LABEL: Record<string, string> = { action: "Action", free: "No action", reaction: "Reaction", passive: "Passive", downtime: "Downtime", roundStart: "Start of round" };

function reqText(r: DbRequirement | null): string {
  if (!r) return "None";
  if (r.skills?.length) return `${r.skills.join(" or ")} ${r.level}`;
  if (r.any) return `${ANY_LABEL[r.any] ?? r.any} ${r.level}`;
  return "None";
}
const wpText = (wp: DbHeroicAbility["wp"]) => (wp == null ? "—" : wp === "varies" ? "Varies" : `${wp} WP`);
const reqKey = (r: DbRequirement | null) => (!r ? "none" : r.any ? "group" : "skill");

export default async function DbAbilitiesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "db-ability" }),
    ownHomebrew(user.id, "db-ability"),
    userCampaigns(user.id),
  ]);
  const hbList = hbV.map((h) => h.data as unknown as DbHeroicAbility);
  const all = [...hbList, ...DB_HEROIC_ABILITIES];

  const pick = one(raw.a);
  const selected = pick ? all.find((a) => a.id === pick || a.name === pick) ?? null : null;
  if (selected) {
    const starting = DB_PROFESSIONS.filter((p) => p.heroicAbilities.includes(selected.name)).map((p) => p.name);
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <DbHeader title="Heroic Abilities" subtitle={selected.name} />
        <BackLink href={BASE} label="All heroic abilities" />
        <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--db)" }}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-3xl text-[var(--sys-link)]">{selected.name} {isHb(selected) ? <span className={hbBadge}>HB</span> : null}</h2>
            <span className="flex gap-1.5"><span className={badge}>{wpText(selected.wp)}</span><span className={badge}>{TIMING_LABEL[selected.timing] ?? selected.timing}</span></span>
          </div>
          <dl className="mt-3 flex flex-col gap-1 text-[13px] text-[var(--muted)]">
            <div><dt className="inline font-semibold text-[var(--text)]">Requirement:</dt> <dd className="inline">{reqText(selected.requirement)}</dd></div>
            <div><dt className="inline font-semibold text-[var(--text)]">Willpower Points:</dt> <dd className="inline">{wpText(selected.wp)}</dd></div>
            {selected.repeatable ? <div><dt className="inline font-semibold text-[var(--text)]">Repeatable:</dt> <dd className="inline">Can be taken more than once.</dd></div> : null}
            {starting.length ? <div><dt className="inline font-semibold text-[var(--text)]">Starting ability for:</dt> <dd className="inline">{starting.join(", ")}</dd></div> : null}
          </dl>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">{selected.text}</p>
          {selected.page ? <p className="mt-4 text-[12px] italic text-[var(--muted)]">Core Rules p.{selected.page}.</p> : null}
        </div>
      </div>
    );
  }

  const q = one(raw.q).trim().toLowerCase();
  const timings = Object.keys(TIMING_LABEL).filter((t) => all.some((a) => a.timing === t));
  const timing = timings.includes(one(raw.timing)) ? one(raw.timing) : "";
  const reqs = [{ key: "none", label: "No requirement" }, { key: "skill", label: "Specific skill" }, { key: "group", label: "Skill group" }];
  const req = reqs.some((r) => r.key === one(raw.req)) ? one(raw.req) : "";
  const wpOpts = [{ key: "wp", label: "Costs WP" }, { key: "free", label: "No WP" }];
  const wp = wpOpts.some((o) => o.key === one(raw.wp)) ? one(raw.wp) : "";
  const srcOpts = srcChips(all.map((a) => a.source as string | undefined));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), timing, req, wp, src };
  const facets = (a: DbHeroicAbility) => ({ timing: a.timing, req: reqKey(a.requirement), wp: a.wp == null ? "free" : "wp", src: srcKey(a.source as string | undefined) });
  const show = (a: DbHeroicAbility) => facetMatch(facets(a), current) && (!q || a.name.toLowerCase().includes(q) || a.text.toLowerCase().includes(q));
  const list = all.slice().sort((a, b) => a.name.localeCompare(b.name));
  const shown = list.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DbHeader title="Heroic Abilities" subtitle={`${DB_HEROIC_ABILITIES.length} heroic abilities${hbList.length ? ` · +${hbList.length} homebrew` : ""}`} />
      <HomebrewEditor kind="db-ability" campaigns={campaigns} initial={hbOwn} />
      <RuleNote title="Gaining heroic abilities">
        <p>Everyone but mages starts with their profession&apos;s heroic ability, ignoring its requirement. You gain another of your choice whenever a skill reaches 18, and the GM may award one after a grand heroic deed (at most once per adventure). New abilities must meet their requirement. Abilities can be combined in one action, paying the WP for each.</p>
      </RuleNote>
      <InstantFilter>
        <SearchForm base={BASE} q={one(raw.q)} placeholder="Search heroic abilities…" hidden={{ timing, req, wp, src }} />
        <ChipRow label="Timing" base={BASE} current={current} param="timing" options={timings.map((t) => ({ key: t, label: TIMING_LABEL[t] }))} active={timing} />
        <ChipRow label="Requirement" base={BASE} current={current} param="req" options={reqs} active={req} />
        <ChipRow label="Cost" base={BASE} current={current} param="wp" options={wpOpts} active={wp} />
        <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
        <CountLine count={shown} noun="heroic ability" plural="heroic abilities" base={BASE} filtered={!!(q || timing || req || wp || src)} />
        <EmptyState noun="heroic ability" base={BASE} hidden={shown > 0} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {list.map((a, i) => (
            <li key={`${a.id}-${i}`} className={cardCls} hidden={!show(a)} data-f={facetAttr(facets(a))}>
              <a href={`${BASE}?a=${encodeURIComponent(a.id)}`} className="group block">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`${nameCls} group-hover:underline`}>{a.name} {isHb(a) ? <span className={hbBadge}>HB</span> : null}</h3>
                  <span className="flex shrink-0 gap-1.5"><span className={badge}>{wpText(a.wp)}</span></span>
                </div>
                <p className="mt-0.5 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Requirement:</span> {reqText(a.requirement)} · {TIMING_LABEL[a.timing] ?? a.timing}{a.repeatable ? " · repeatable" : ""}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{a.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </InstantFilter>
    </div>
  );
}
