import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_RELICS, PB_RITUALS, PB_MISHAPS, PB_PRAYERS, PB_DEITIES, PB_SPELLS, PB_RULES, PB_CLASSES } from "@/lib/data/pb-data";
import type { PbRelic, PbRitual } from "@/lib/data/pb-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { PbHeader, ModeRow, ChipRow, SearchForm, CountLine, EmptyState, RuleNote, Bullets, DieTable, HbBadge, N, cardCls, nameCls, badge, dBadge, eyebrow, sectionH, one, srcKey, srcChips, rankLine, rollCls, rollTag, type RawQuery } from "@/components/PbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/pirate-borg/magic";

type Entry = (PbRelic | PbRitual) & { source?: string; numeral?: string };

function EntryList({ list, show, facets, kind }: { list: Entry[]; show: (e: Entry) => boolean; facets: (e: Entry) => Record<string, string>; kind: "relic" | "ritual" }) {
  return (
    <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
      {list.map((e, i) => (
        <li key={`${e.id}-${i}`} className={cardCls} hidden={!show(e)} data-f={facetAttr(facets(e))}>
          <div className="flex items-start justify-between gap-2">
            <h3 className={nameCls}><span className={rollTag}>{kind === "ritual" && e.numeral ? e.numeral : e.roll ? e.roll : ""}</span> {e.name} <HbBadge x={e} /></h3>
            {e.duration ? <span className={dBadge}>{e.duration}</span> : null}
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{e.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default async function PbMagicPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const view = ["rituals", "prayers", "spells"].includes(one(raw.view)) ? one(raw.view) : "relics";

  const [hbR, hbROwn, hbT, hbTOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "pb-relic" }), ownHomebrew(user.id, "pb-relic"),
    visibleHomebrew(user.id, { type: "pb-ritual" }), ownHomebrew(user.id, "pb-ritual"),
    userCampaigns(user.id),
  ]);
  const relics: Entry[] = [...hbR.map((h) => h.data as unknown as PbRelic), ...PB_RELICS];
  const rituals: Entry[] = [...hbT.map((h) => h.data as unknown as PbRitual), ...PB_RITUALS];
  const q = one(raw.q).trim().toLowerCase();
  const modes = [{ key: "relics", label: "Ancient Relics" }, { key: "rituals", label: "Arcane Rituals & Mishaps" }, { key: "prayers", label: "Zealot Prayers" }, { key: "spells", label: "Sorcerer Spells" }];
  const R = PB_RULES;

  let body: React.ReactNode;
  if (view === "relics" || view === "rituals") {
    const list = view === "relics" ? relics : rituals;
    const srcOpts = srcChips(list.map((e) => e.source));
    const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
    const viewKey = view === "relics" ? "" : view;
    const current = { view: viewKey, q: one(raw.q), src };
    const facets = (e: Entry) => ({ src: srcKey(e.source) });
    const show = (e: Entry) => facetMatch(facets(e), { ...current, view: "" }) && (!q || `${e.name} ${e.text}`.toLowerCase().includes(q));
    const shown = list.filter(show).length;
    const noun = view === "relics" ? "relic" : "ritual";
    const base = viewKey ? `${BASE}?view=${viewKey}` : BASE;
    body = (
      <>
        <HomebrewEditor kind={view === "relics" ? "pb-relic" : "pb-ritual"} campaigns={campaigns} initial={view === "relics" ? hbROwn : hbTOwn} />
        {view === "relics" ? (
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <RuleNote title="Using a relic" className=""><p>{R.relics.text}</p></RuleNote>
            <div className={cardCls}>
              <p className={eyebrow}>After use — SPIRIT <N>DR12</N></p>
              <Bullets className="mt-1" items={[<><b className="text-[var(--text)]">Failure:</b> {String(R.relics.failure)}</>, <><b className="text-[var(--text)]">Fumble:</b> {String(R.relics.fumble)}</>, <><b className="text-[var(--text)]">Crit:</b> {String(R.relics.crit)}</>]} />
            </div>
          </div>
        ) : (
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <RuleNote title="Casting a ritual" className="">
              <p>{R.rituals.text}</p>
              <p className="mt-1.5"><b className="text-[var(--text)]">Success:</b> {String(R.rituals.success)} <b className="text-[var(--text)]">Failure:</b> {String(R.rituals.failure)} <b className="text-[var(--text)]">Crit or fumble:</b> {String(R.rituals.critOrFumble)}</p>
            </RuleNote>
            <div className={cardCls}>
              <p className={eyebrow}>Ritual modifiers</p>
              <ul className="mt-1 flex flex-col gap-1 text-[13px] text-[var(--muted)]">
                {R.rituals.modifiers.map((m) => <li key={m.id} className="flex gap-2"><span className={rollCls}>{m.dr != null ? `${m.dr > 0 ? "+" : "−"}${Math.abs(m.dr)}${m.orMore ? "+" : ""}` : m.drPerHp ? "−1/HP" : "×2"}</span><span>{m.text}{m.dr != null ? " (DR)" : m.drPerHp ? " (−1 DR per HP spent)" : ""}</span></li>)}
              </ul>
              <p className="mt-2 text-[12.5px] italic text-[var(--muted)]">Casts per day: <N>{R.rituals.castsPerDay}</N>, rerolled at {R.rituals.reset}. Brutes can&apos;t use rituals.</p>
            </div>
          </div>
        )}
        <h2 className={sectionH}>{view === "relics" ? "Ancient relics" : "Arcane rituals"} <N className="text-[20px] text-[var(--muted)]">d20</N></h2>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder={`Search ${noun}s…`} hidden={{ view: viewKey, src }} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun={noun} base={base} filtered={!!(q || src)} />
          <EmptyState noun={noun} base={base} hidden={shown > 0} />
          <EntryList list={list} show={show} facets={facets} kind={view === "relics" ? "relic" : "ritual"} />
        </InstantFilter>
        {view === "rituals" ? (
          <section id="mishaps" className="mt-10 scroll-mt-20">
            <h2 className={sectionH}>Mystical mishaps <N className="text-[20px] text-[var(--muted)]">d20</N></h2>
            <div className={cardCls}>
              <DieTable rows={PB_MISHAPS} note={`Rolled when a ritual fails. Italic text is what the caster may not realize at first. ${String(R.rituals.repeatedMishap)}`} />
            </div>
          </section>
        ) : null}
      </>
    );
  } else if (view === "prayers") {
    const zealot = PB_CLASSES.find((c) => c.id === "zealot");
    body = (
      <>
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <RuleNote title="Praying" className="">
            <p>Zealots learn one random prayer when they begin and another each time they gain experience (reroll duplicates). They can pray <N>{zealot?.prayers?.usesPerDay ?? "d2 + SPIRIT"}</N> times a day, rerolled at dawn. Praying takes your action and needs no roll unless the prayer says so.</p>
            <p className="mt-1.5">{zealot?.text}</p>
          </RuleNote>
          <div className={cardCls}><DieTable title="Whom dost thou serve?" die="d8" rows={PB_DEITIES.map((d) => ({ roll: d.roll, name: d.numeral, text: d.name }))} cols={2} /></div>
        </div>
        <h2 className={sectionH}>Prayers <N className="text-[20px] text-[var(--muted)]">d10</N></h2>
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {PB_PRAYERS.map((p) => (
            <li key={p.id} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <h3 className={nameCls}><span className={rollTag}>{p.numeral}</span> {p.name}</h3>
                <span className="flex gap-1.5">{p.test ? <span className={badge}>{p.test.ability} DR{String(p.test.dr)}</span> : null}{p.noAction ? <span className={badge}>No action</span> : null}</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{p.text}</p>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    const sorc = PB_CLASSES.find((c) => c.id === "sorcerer");
    body = (
      <>
        <RuleNote title="Sorcery">
          <p>Sorcerers begin with one rank I spell. Each time they gain experience they roll again: a spell they already know rises one rank (to a maximum of III). They cast <N>{sorc?.spells?.castsPerDay ?? "d2 + SPIRIT"}</N> spells a day, reset at {sorc?.spells?.reset ?? "sunset"}; casting takes your action and needs no roll unless noted.</p>
          <p className="mt-1.5">{sorc?.text}</p>
        </RuleNote>
        <h2 className={sectionH}>Spells <N className="text-[20px] text-[var(--muted)]">d6</N></h2>
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {PB_SPELLS.map((s) => (
            <li key={s.id} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <h3 className={nameCls}><span className={rollTag}>{s.roll}</span> {s.name}</h3>
                {s.test ? <span className={badge}>{s.test.ability} DR{String(s.test.dr)}</span> : null}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{s.text}</p>
              <div className="mt-2 grid grid-cols-3 gap-1 text-center">
                {rankLine(s.ranks).split(" · ").map((r) => { const [rk, v] = r.split(": "); return (
                  <div key={rk} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1">
                    <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Rank {rk}</div>
                    <div className="[font-family:var(--font-garamond),Georgia,serif] text-[13px] font-semibold lining-nums text-[var(--text)]">{v}</div>
                  </div>
                ); })}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Relics & Rituals" subtitle={`${PB_RELICS.length} relics · ${PB_RITUALS.length} rituals · ${PB_PRAYERS.length} prayers · ${PB_SPELLS.length} spells${hbR.length + hbT.length ? ` · +${hbR.length + hbT.length} homebrew` : ""}`} />
      <ModeRow base={BASE} current={{}} param="view" options={modes} active={view} />
      {body}
      <p className="mt-8 text-[12px] italic text-[var(--muted)]">{String(R.armor.magic)}</p>
    </div>
  );
}
