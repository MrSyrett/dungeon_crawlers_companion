import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_SETTING, PB_FACTIONS, PB_HISTORY, PB_ASH, PB_CAPTAINS } from "@/lib/data/pb-data";
import { PbHeader, SectionNav, RuleNote, GenTable, N, cardCls, sectionH, badge, dBadge, chipBase, chipOff, type RawQuery } from "@/components/PbRef";

export const dynamic = "force-dynamic";

export default async function PbSettingPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await searchParams;
  const S = PB_SETTING;
  const loose = S.places.filter((p) => !p.faction || !PB_FACTIONS.some((f) => f.id === p.faction));
  const storylines = (PB_HISTORY.storylines as string[] | undefined) ?? (PB_HISTORY.columns ?? []).map((c) => c.name);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="The Dark Caribbean" subtitle="the Scourge, the ASH trade & the powers that remain" />
      <SectionNav items={[
        { id: "overview", label: "The Scourge" }, { id: "ash", label: "ASH" }, { id: "map", label: "The Map" },
        { id: "factions", label: "Factions" }, { id: "places", label: "Other Places" }, { id: "history", label: "General History" },
      ]} />

      <section id="overview" className="scroll-mt-20">
        <h2 className={sectionH}>The Scourge</h2>
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div className={cardCls}>
            <p className="text-[14px] leading-relaxed text-[var(--muted)]">{S.summary}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{S.scourge}</p>
            <p className="mt-2"><span className={dBadge}>pg. {S.page}</span></p>
          </div>
          <RuleNote title="Using the setting" className="">
            <p>The Dark Caribbean is a backdrop, not a rulebook: take the factions, places and the general history as rumors, plot hooks and current events, and change whatever your table needs.</p>
          </RuleNote>
        </div>
      </section>

      <section id="ash" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>ASH</h2>
        <div className={cardCls}>
          <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">{PB_ASH.text}</p>
          <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">One dose:</span> {PB_ASH.dose.text} · standard rate <N className="text-[var(--text)]">{PB_ASH.dose.standardRate}s</N>.</p>
          <p className="mt-2 text-[13px]"><a href="/pirate-borg/alchemy" className="text-[var(--sys-link)] hover:underline">The ASH market, the effects of consuming it and the alchemy potion generator →</a></p>
        </div>
      </section>

      <section id="map" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>The map</h2>
        <div className={cardCls}>
          <p className="text-[13px] leading-relaxed text-[var(--muted)]">The Core Rules map (pg. <N>{S.map.page}</N>) is a {S.map.scale}. It marks:</p>
          <p className="mt-2 flex flex-wrap gap-1.5">{S.map.places.map((p) => { const pl = S.places.find((x) => p.startsWith(x.name.replace(/ \(.*\)$/, "")) || x.name.startsWith(p)); return <a key={p} href={pl ? `#place-${pl.id}` : "#map"} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{p}</a>; })}</p>
        </div>
      </section>

      <section id="factions" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Factions</h2>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {PB_FACTIONS.map((f) => {
            const places = S.places.filter((p) => p.faction === f.id);
            const caps = PB_CAPTAINS.filter((c) => c.faction === f.id);
            return (
              <article key={f.id} id={`faction-${f.id}`} className={`${cardCls} scroll-mt-20 border-l-4`} style={{ borderLeftColor: "var(--pb)" }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[22px] leading-tight text-[var(--sys-link)]">{f.name}</h3>
                  <span className={dBadge}>pg. {f.page}</span>
                </div>
                {f.aka?.length ? <p className="mt-0.5 text-[12px] italic text-[var(--muted)]">Also: {f.aka.join(", ")}</p> : null}
                <p className="mt-1 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Seat:</span> {f.seat}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{f.text}</p>
                {places.length ? (
                  <dl className="mt-2.5 flex flex-col gap-1.5 border-t border-[var(--border)] pt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                    {places.map((p) => <div key={p.id} id={`place-${p.id}`} className="scroll-mt-20"><dt className="inline font-semibold text-[var(--text)]">{p.name}</dt> <N className="text-[11px]">(pg. {p.page})</N><dd className="inline">: {p.text}</dd></div>)}
                  </dl>
                ) : null}
                {caps.length ? <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Archetype captain:</span>{caps.map((c) => <a key={c.id} href={`/pirate-borg/bestiary#captain-${c.id}`} className={`${chipBase} ${chipOff} !px-2 !py-0.5`}>{c.name}</a>)}</p> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section id="places" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Other places</h2>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {loose.map((p) => (
            <div key={p.id} id={`place-${p.id}`} className={`${cardCls} scroll-mt-20`}>
              <div className="flex items-baseline justify-between gap-2"><h3 className="text-[20px] text-[var(--sys-link)]">{p.name}</h3><span className={dBadge}>pg. {p.page}</span></div>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{p.text}</p>
              {p.id === "black-coral-bay" ? <p className="mt-1.5"><span className={badge}>The Curse of Skeleton Point</span></p> : null}
            </div>
          ))}
        </div>
      </section>

      <section id="history" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>{PB_HISTORY.name} <N className="text-[20px] text-[var(--muted)]">{PB_HISTORY.die}</N></h2>
        <p className="mb-2 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">Six storylines told over six chapters: {storylines.map((x, i) => <span key={x}>{i ? " · " : ""}<N className="text-[var(--pb-ink)]">{i + 1}</N> {x}</span>)}. <span className={dBadge}>pg. {PB_HISTORY.page}</span></p>
        <div className={cardCls}><GenTable t={PB_HISTORY} bare /></div>
      </section>
    </div>
  );
}
