import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_SPECIES } from "@/lib/data/dnd-species";
import { DndHeader, cardCls, badge, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/species";
const sourceLabel: Record<string, string> = { srd: "SRD", phb: "PHB" };
const sizeText = (s: string | string[]) => Array.isArray(s) ? s.join(" or ") : s;

export default async function DndSpeciesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.sp);
  const selected = DND_SPECIES.find((s) => s.name === pick) ?? null;

  if (!selected) {
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <DndHeader title="Species" subtitle={`${DND_SPECIES.length} species`} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {DND_SPECIES.map((s) => (
            <li key={s.name} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <a href={`${BASE}?sp=${encodeURIComponent(s.name)}`} className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f] hover:underline">{s.name}</a>
                <span className={badge}>{sourceLabel[s.source] ?? s.source}</span>
              </div>
              <p className="mt-1 text-[12px] italic text-[var(--muted)]">{s.flavor}</p>
              <p className="mt-2 text-[12px] text-[var(--muted)]">
                <span className="font-semibold text-[var(--text)]">Size:</span> {sizeText(s.size)} · <span className="font-semibold text-[var(--text)]">Speed:</span> {s.speed} ft.{s.darkvision ? <> · <span className="font-semibold text-[var(--text)]">Darkvision:</span> {s.darkvision} ft.</> : null}
              </p>
              {s.lineages?.length ? <p className="mt-1 text-[11px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Lineages:</span> {s.lineages.map((l) => l.name).join(", ")}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const s = selected;
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <DndHeader title={s.name} subtitle={`${sizeText(s.size)} · ${s.creatureType} · Speed ${s.speed} ft.`} />
      <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--dnd)] hover:underline">← All species</a>
      <section className={cardCls}>
        <p className="text-[13px] leading-relaxed text-[var(--text)]">{s.flavor}</p>
        <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Size:</span> {sizeText(s.size)} · <span className="font-semibold text-[var(--text)]">Speed:</span> {s.speed} ft.{s.darkvision ? <> · <span className="font-semibold text-[var(--text)]">Darkvision:</span> {s.darkvision} ft.</> : null}</p>
      </section>
      <section className={`${cardCls} mt-4`}>
        <h3 className="mb-2 text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">Traits</h3>
        <div className="flex flex-col gap-2">
          {s.traits.map((t, i) => (
            <p key={i} className="text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{t.name}.</span> {t.description}</p>
          ))}
        </div>
      </section>
      {s.lineages?.length ? (
        <section className="mt-4">
          <h3 className="mb-2 text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">Lineages</h3>
          <div className="flex flex-col gap-3">
            {s.lineages.map((l) => (
              <div key={l.name} className={cardCls}>
                <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-[var(--text)]">{l.name}</h4>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {l.traits.map((t, i) => (
                    <p key={i} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{t.name}.</span> {t.description}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
