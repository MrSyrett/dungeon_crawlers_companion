import { GB_BESTIARY } from "@/lib/data/gb-bestiary";
import { GB_GHOST_ABILITIES } from "@/lib/data/gb-ghost-abilities";
import { GB_GHOST_WEAKNESSES } from "@/lib/data/gb-ghost-weaknesses";
import { GB_GHOST_TOUGHNESS } from "@/lib/data/gb-ghost-toughness";
import { GbHeader, TabRow, cardCls, nameCls, badge, catBadge, SectionH, one, withParams, type RawQuery } from "@/components/GbRef";

export const dynamic = "force-dynamic";
const BASE = "/gb/bestiary";

const TRAIT_KEYS: [("brains" | "muscles" | "moves" | "cool"), string][] = [
  ["brains", "BRN"], ["muscles", "MUS"], ["moves", "MOV"], ["cool", "COOL"],
];

type GbCreature = (typeof GB_BESTIARY)[number];

function StatBlock({ x }: { x: GbCreature }) {
  return (
    <div className={cardCls}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className={nameCls}>{x.name}</h3>
        <span className="flex flex-wrap items-center gap-1.5">
          {x.power ? <span className={catBadge}>Power {x.power}</span> : null}
          {x.ectopresence != null ? <span className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--sys-sub)]">Ecto {x.ectopresence}</span> : null}
        </span>
      </div>
      <div className="mt-0.5 flex flex-wrap gap-1.5 text-[11px] text-[var(--muted)]">
        <span className={badge}>{x.role}</span>
        {x.entityType ? <span>{x.entityType}</span> : null}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {TRAIT_KEYS.filter(([k]) => x[k]).map(([k, lbl]) => (
          <span key={lbl} className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px]">
            <span className="text-[var(--muted)]">{lbl}</span> <span className="font-semibold text-[var(--sys-link)]">{x[k]}</span>
          </span>
        ))}
      </div>
      {x.talents?.length ? (
        <p className="mt-2 text-[12px] leading-relaxed">
          <span className="font-semibold text-[var(--gb)]">Talents:</span>{" "}
          {x.talents.map((t) => `${t.name} ${t.value}`).join(" · ")}
        </p>
      ) : null}
      {x.powers?.length ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Abilities:</span> {x.powers.join(", ")}</p> : null}
      {x.weaknesses ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Weakness:</span> {x.weaknesses}</p> : null}
      <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Goal:</span> {x.goal}</p>
      {x.tags ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Tags:</span> {x.tags}</p> : null}
      {x.description ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{x.description}</p> : null}
    </div>
  );
}

export default async function GbBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const raw = await searchParams;
  const pick = one(raw.m);
  // An unknown ?m= falls through to the full list rather than an empty page.
  const selected = pick ? GB_BESTIARY.find((x) => x.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <GbHeader title="Ghosts & Extras" subtitle="Classic 1986 rules · the spooks, monsters and weirdos you'll bust" />
        <TabRow active="/gb/bestiary" />
        <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:underline">← All creatures</a>
        <StatBlock x={selected} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <GbHeader title="Ghosts & Extras" subtitle="Classic 1986 rules · the spooks, monsters and weirdos you'll bust" />
      <TabRow active="/gb/bestiary" />

      <SectionH>The Roster</SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GB_BESTIARY.map((c) => (
          <div key={c.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={nameCls}>
                <a href={withParams(BASE, {}, { m: c.name })} className={`${nameCls} hover:underline`}>{c.name}</a>
              </h3>
              <span className="flex flex-wrap items-center gap-1.5">
                {c.power ? <span className={catBadge}>Power {c.power}</span> : null}
                {c.ectopresence != null ? <span className="rounded bg-[var(--panel-2)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--sys-sub)]">Ecto {c.ectopresence}</span> : null}
              </span>
            </div>
            <div className="mt-0.5 flex flex-wrap gap-1.5 text-[11px] text-[var(--muted)]">
              <span className={badge}>{c.role}</span>
              {c.entityType ? <span>{c.entityType}</span> : null}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TRAIT_KEYS.filter(([k]) => c[k]).map(([k, lbl]) => (
                <span key={lbl} className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px]">
                  <span className="text-[var(--muted)]">{lbl}</span> <span className="font-semibold text-[var(--sys-link)]">{c[k]}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionH>Building a Ghost <span className="text-[11px] font-normal text-[var(--muted)]">— quick tiers for Power, Abilities &amp; Ectopresence</span></SectionH>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.08em] text-[var(--sys-link)]">
              <th className="border-b border-[var(--border)] px-2 py-1.5">Toughness</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Power</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Special Abilities</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Ectopresence</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Notes</th>
            </tr>
          </thead>
          <tbody>
            {GB_GHOST_TOUGHNESS.map((t) => (
              <tr key={t.toughness}>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-semibold text-[var(--text)]">{t.toughness}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.power}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.abilities}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.ectopresence}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.brainsCool}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionH>Ghostly Special Abilities <span className="text-[11px] font-normal text-[var(--muted)]">— Table I (roll 1–6) · Table II (stronger)</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {GB_GHOST_ABILITIES.map((a) => (
          <div key={a.name} className={cardCls}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--sys-link)]">{a.name}</h3>
              <span className={badge}>{a.category}</span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{a.description}</p>
          </div>
        ))}
      </div>

      <SectionH>Really Bad News <span className="text-[11px] font-normal text-[var(--muted)]">— defeating demons, eldritch horrors &amp; other proton-proof entities</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GB_GHOST_WEAKNESSES.map((w) => (
          <div key={w.name} className={cardCls}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--gb)]">{w.name}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{w.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
