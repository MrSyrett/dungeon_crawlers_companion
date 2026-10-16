import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_PATRONS, LOTR_FELLOWSHIP, LOTR_SAFE_HAVENS, LOTR_CALLINGS } from "@/lib/data/lotr-data";
import type { LotrPatron } from "@/lib/data/lotr-types";
import { LotrHeader, ChipRow, CountLine, Bullets, Field, cardCls, nameCls, badge, eyebrow, sectionH, one, type RawQuery } from "@/components/LotrRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/lotr/patrons";

export default async function LotrPatronsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const callings = LOTR_CALLINGS.map((c) => c.name).filter((n) => LOTR_PATRONS.some((p) => p.callings.includes(n)));
  const cal = callings.includes(one(raw.cal)) ? one(raw.cal) : "";
  const current = { cal };
  const facets = (p: LotrPatron) => ({ cal: p.callings });
  const show = (p: LotrPatron) => facetMatch(facets(p), current);
  const shown = LOTR_PATRONS.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <LotrHeader title="Patrons" subtitle={`${LOTR_PATRONS.length} patrons · fellowship · safe havens`} />

      <section className={`${cardCls} mb-6`}>
        <p className={eyebrow}>Patrons</p>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">A patron is a great figure of the Free Peoples who points the Company toward its tasks. The Company chooses a main patron (through the Meet Patron undertaking); that patron adds their bonus to the Fellowship rating and unlocks a special advantage paid for with Fellowship points. Heroes of a patron&rsquo;s favoured callings start the next Adventuring Phase with inspiration after meeting them.</p>
      </section>

      <InstantFilter>
        <ChipRow label="Favoured calling" base={BASE} current={current} param="cal" options={callings.map((c) => ({ key: c, label: c }))} active={cal} />
        <CountLine count={shown} noun="patron" base={BASE} filtered={!!cal} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {LOTR_PATRONS.map((p) => (
            <li key={p.name} className={cardCls} hidden={!show(p)} data-f={facetAttr(facets(p))}>
              <div className="flex items-start justify-between gap-2">
                <h3 className={nameCls}>{p.name}</h3>
                <span className={`${badge} shrink-0`}>{p.race}</span>
              </div>
              <p className="mt-1 text-[13px] italic leading-relaxed text-[var(--muted)]">{p.description}</p>
              <dl className="mt-2 grid gap-y-1 text-[12.5px] leading-relaxed text-[var(--muted)]">
                <Field label="Favoured callings">{p.callings.join(", ")}</Field>
                <Field label="Fellowship bonus">{p.fellowship > 0 ? `+${p.fellowship}` : String(p.fellowship)}</Field>
                <Field label={p.advantage}><span className="text-[var(--text)]">{p.advantageText}</span></Field>
                <Field label="Agenda">{p.agenda}</Field>
                <Field label="Where to find">{p.where}</Field>
              </dl>
            </li>
          ))}
        </ul>
      </InstantFilter>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={`${cardCls} md:col-span-2`}>
          <h2 className={sectionH}>Fellowship</h2>
          <Bullets items={LOTR_FELLOWSHIP} />
        </div>
        <div className={cardCls}>
          <h2 className={sectionH}>Safe Havens</h2>
          <p className="mb-2 text-[12.5px] text-[var(--muted)]">The Company&rsquo;s base and refuge for Fellowship Phases — usually where the heroes first met (Bree is the classic choice). More are found through play.</p>
          <Bullets items={LOTR_SAFE_HAVENS} />
        </div>
      </section>
    </div>
  );
}
