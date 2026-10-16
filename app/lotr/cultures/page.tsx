import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_CULTURES, LOTR_BACKGROUNDS, LOTR_VIRTUES, LOTR_STANDARDS } from "@/lib/data/lotr-data";
import type { LotrCulture } from "@/lib/data/lotr-types";
import { LotrHeader, ChipRow, BackLink, Field, cardCls, nameCls, badge, eyebrow, sectionH, one, asiText, type RawQuery } from "@/components/LotrRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/lotr/cultures";
const STANDARDS = ["Frugal", "Common", "Prosperous", "Rich", "Very Rich"];

function asiLine(c: LotrCulture): string {
  const fixed = asiText(c.asi);
  return c.asiChoice ? `${fixed}, +${c.asiChoice.amount} to ${c.asiChoice.count === 1 ? "one other score" : `${c.asiChoice.count} other scores`}` : fixed;
}

export default async function LotrCulturesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.c);
  const selected = LOTR_CULTURES.find((c) => c.name === pick) ?? null;

  if (!selected) {
    const stds = STANDARDS.filter((s) => LOTR_CULTURES.some((c) => c.standardOfLiving === s));
    const sizes = [...new Set(LOTR_CULTURES.map((c) => c.size))];
    const std = stds.includes(one(raw.std)) ? one(raw.std) : "";
    const size = sizes.includes(one(raw.size)) ? one(raw.size) : "";
    const current = { std, size };
    const facets = (c: LotrCulture) => ({ std: c.standardOfLiving, size: c.size });
    const show = (c: LotrCulture) => facetMatch(facets(c), current);
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <LotrHeader title="Heroic Cultures" subtitle={`${LOTR_CULTURES.length} cultures of the Free Peoples`} />
        <InstantFilter>
          <ChipRow label="Standard of living" base={BASE} current={current} param="std" options={stds.map((s) => ({ key: s, label: s }))} active={std} />
          {sizes.length > 1 ? <ChipRow label="Size" base={BASE} current={current} param="size" options={sizes.map((s) => ({ key: s, label: s }))} active={size} /> : null}
          <ul className="mt-4 grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {LOTR_CULTURES.map((c) => (
              <li key={c.name} className={cardCls} hidden={!show(c)} data-f={facetAttr(facets(c))}>
                <div className="flex items-start justify-between gap-2">
                  <a href={`${BASE}?c=${encodeURIComponent(c.name)}`} className={`${nameCls} hover:underline`}>{c.name}</a>
                  <span className={badge}>{c.standardOfLiving}</span>
                </div>
                <p className="mt-1 text-[13px] italic leading-snug text-[var(--muted)]">{c.flavor}</p>
                <dl className="mt-2 grid gap-y-0.5 text-[12.5px] text-[var(--muted)]">
                  <Field label="Ability Scores">{asiLine(c)}</Field>
                  <Field label="Size / Speed">{c.size}, {c.speed} ft.</Field>
                  <Field label="Adventuring Age">{c.age}</Field>
                  <Field label="Languages">{c.languages.join(", ")}</Field>
                  {c.lineages.length ? <Field label="Subcultures">{c.lineages.map((l) => l.name).join(", ")}</Field> : null}
                  {c.startingVirtue ? <Field label="Bonus">Starts with a cultural virtue</Field> : null}
                </dl>
                <p className="mt-2 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.1em]">
                  <a className="text-[var(--sys-link)] hover:underline" href={`/lotr/backgrounds?cul=${encodeURIComponent(c.name)}`}>Backgrounds →</a>
                  <a className="text-[var(--sys-link)] hover:underline" href={`/lotr/virtues?cat=${encodeURIComponent(c.name)}`}>Virtues →</a>
                </p>
              </li>
            ))}
          </ul>
        </InstantFilter>

        <section className="mt-10">
          <h2 className={sectionH}>Standards of Living</h2>
          <p className="mb-3 text-[13px] text-[var(--muted)]">A culture&rsquo;s standard of living sets each new hero&rsquo;s starting gear and coin. See <a href="/lotr/equipment?mode=living" className="text-[var(--sys-link)] underline">Equipment</a> for the full lists.</p>
          <div className="flex flex-wrap gap-2">
            {LOTR_STANDARDS.filter((s) => s.cultures.length).map((s) => (
              <div key={s.name} className={`${cardCls} min-w-[200px] flex-1`}>
                <p className={eyebrow}>{s.name}</p>
                <p className="mt-1 text-[12.5px] text-[var(--muted)]">{s.cultures.join(", ")} · {s.coin}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  const c = selected;
  const bgs = LOTR_BACKGROUNDS.filter((b) => b.culture === c.name);
  const virtues = LOTR_VIRTUES.filter((v) => v.category === c.name);
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <LotrHeader title={c.name} subtitle={`${c.size} · speed ${c.speed} ft. · ${c.standardOfLiving}`} />
      <BackLink href={BASE} label="All cultures" />
      <section className={cardCls}>
        <p className="text-[14px] leading-relaxed text-[var(--text)]">{c.flavor}</p>
        <dl className="mt-3 grid gap-x-6 gap-y-1 text-[12.5px] text-[var(--muted)] md:grid-cols-2">
          <Field label="Ability Scores">{asiLine(c)}</Field>
          <Field label="Size / Speed">{c.size}, {c.speed} ft.</Field>
          <Field label="Adventuring Age">{c.age}</Field>
          <Field label="Standard of Living">{c.standardOfLiving}</Field>
          <div className="md:col-span-2"><Field label="Languages">{c.languages.join(", ")}</Field></div>
          {c.startingVirtue ? <div className="md:col-span-2"><Field label="Cultural virtue">Heroes of this culture begin play with one of its cultural virtues.</Field></div> : null}
        </dl>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={sectionH}>Cultural Traits</h2>
        <div className="flex flex-col gap-2">
          {c.traits.map((t, i) => (
            <p key={i} className="text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{t.name}.</span> {t.description}</p>
          ))}
        </div>
      </section>

      {c.lineages.length ? (
        <section className="mt-4">
          <h2 className={sectionH}>Subcultures</h2>
          <div className="flex flex-col gap-3">
            {c.lineages.map((l) => (
              <div key={l.name} className={cardCls}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg text-[var(--sys-link)]">{l.name}</h3>
                  <span className={badge}>{asiText(l.asi)}</span>
                </div>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {l.traits.map((t, i) => (
                    <p key={i} className="text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{t.name}.</span> {t.description}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={`${cardCls} mt-4`}>
        <h2 className={sectionH}>Names</h2>
        <dl className="grid gap-y-1.5 text-[12.5px] leading-relaxed text-[var(--muted)]">
          <Field label="Female">{c.names.female}</Field>
          <Field label="Male">{c.names.male}</Field>
          <Field label="Family">{c.names.family}</Field>
        </dl>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={sectionH}>Backgrounds &amp; Virtues</h2>
        <p className="text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Backgrounds:</span> {bgs.map((b) => b.name).join(", ") || "—"} · <a className="text-[var(--sys-link)] underline" href={`/lotr/backgrounds?cul=${encodeURIComponent(c.name)}`}>view</a></p>
        <p className="mt-1 text-[12.5px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Cultural virtues:</span> {virtues.map((v) => v.name).join(", ") || "—"} · <a className="text-[var(--sys-link)] underline" href={`/lotr/virtues?cat=${encodeURIComponent(c.name)}`}>view</a></p>
      </section>
    </div>
  );
}
