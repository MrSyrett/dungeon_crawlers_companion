import { JLU_BESTIARY } from "@/lib/data/jlu-bestiary";
import { JluHeader, TabRow, cardCls, nameCls, badge, catBadge, one, withParams, type RawQuery } from "@/components/JluRef";

export const dynamic = "force-dynamic";
const BASE = "/jlu/bestiary";

const ATTR_ORDER: [keyof (typeof JLU_BESTIARY)[number]["attributes"], string][] = [
  ["potency", "POT"], ["accuracy", "ACC"], ["agility", "AGI"], ["resistance", "RES"], ["spirit", "SPI"], ["mind", "MND"],
];
const sign = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

type JluEntry = (typeof JLU_BESTIARY)[number];

function StatBlock({ x }: { x: JluEntry }) {
  return (
    <div className={cardCls}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className={nameCls}>{x.name}</h3>
        <span className="flex items-center gap-1.5">
          <span className={catBadge}>Tier {x.tier}</span>
          <span className={badge}>{x.role}</span>
        </span>
      </div>
      {x.realName || x.origin ? (
        <p className="mt-0.5 text-[11px] italic text-[var(--muted)]">{[x.realName, x.origin].filter(Boolean).join(" · ")}</p>
      ) : null}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {ATTR_ORDER.map(([k, lbl]) => (
          <span key={lbl} className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px]">
            <span className="text-[var(--muted)]">{lbl}</span> <span className="font-semibold text-[var(--sys-link)]">{sign(x.attributes[k])}</span>
          </span>
        ))}
      </div>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
        {x.resolve != null ? <span><span className="font-semibold text-[var(--jlu)]">Resolve</span> {x.resolve}</span> : null}
        <span><span className="font-semibold text-[var(--jlu)]">Defense</span> {x.defense}</span>
        {x.damageReduction ? <span><span className="font-semibold text-[var(--jlu)]">DR</span> {x.damageReduction}</span> : null}
      </p>
      {x.attacks?.length ? (
        <div className="mt-1.5 text-[12.5px]">
          {x.attacks.map((a) => (
            <div key={a.name}><span className="font-semibold text-[var(--sys-link)]">{a.name}</span> {sign(a.bonus)} · {a.damage}{a.type ? ` (${a.type})` : ""}{a.range ? ` · ${a.range}` : ""}</div>
          ))}
        </div>
      ) : null}
      {x.powers?.length ? <p className="mt-1.5 text-[12px]"><span className="font-semibold text-[var(--jlu)]">Powers:</span> {x.powers.join(", ")}</p> : null}
      {x.knowledge?.length ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--jlu)]">Knowledge:</span> {x.knowledge.join(", ")}</p> : null}
      {x.traits?.length ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--jlu)]">Traits:</span> {x.traits.join(", ")}</p> : null}
      {x.equipment?.length ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--jlu)]">Equipment:</span> {x.equipment.join(", ")}</p> : null}
      {(x.abilities || []).concat(x.archetypeSkills || []).map((a) => (
        <p key={a.name} className="mt-1.5 text-[12px] leading-relaxed"><span className="font-semibold text-[var(--sys-link)]">{a.name}:</span> <span className="text-[var(--text)]">{a.text}</span></p>
      ))}
      {x.limitations?.length ? x.limitations.map((l) => (
        <p key={l.name} className="mt-1 text-[12px] leading-relaxed"><span className="font-semibold text-[var(--jlu)]">{l.name}:</span> <span className="text-[var(--muted)]">{l.text}</span></p>
      )) : null}
      {x.description ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{x.description}</p> : null}
    </div>
  );
}

export default async function JluBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const raw = await searchParams;
  const pick = one(raw.m);
  // An unknown ?m= falls through to the full list rather than an empty page.
  const selected = pick ? JLU_BESTIARY.find((x) => x.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <JluHeader title="Bestiary" subtitle="Justice League Unlimited · minions, threats & villains" />
        <TabRow active="/jlu/bestiary" />
        <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:underline">← All entries</a>
        <StatBlock x={selected} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <JluHeader title="Bestiary" subtitle="Justice League Unlimited · minions, threats & villains" />
      <TabRow active="/jlu/bestiary" />
      <p className="mb-4 max-w-[70ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Minions fall to any damage; Tier C threats have 4 Condition boxes; Villains have 7 and gain a
        bonus off-turn Action after each Hero&rsquo;s turn.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {JLU_BESTIARY.map((c) => (
          <div key={c.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={nameCls}>
                <a href={withParams(BASE, {}, { m: c.name })} className={`${nameCls} hover:underline`}>{c.name}</a>
              </h3>
              <span className="flex items-center gap-1.5">
                <span className={catBadge}>Tier {c.tier}</span>
                <span className={badge}>{c.role}</span>
              </span>
            </div>
            {c.realName || c.origin ? (
              <p className="mt-0.5 text-[11px] italic text-[var(--muted)]">{[c.realName, c.origin].filter(Boolean).join(" · ")}</p>
            ) : null}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ATTR_ORDER.map(([k, lbl]) => (
                <span key={lbl} className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px]">
                  <span className="text-[var(--muted)]">{lbl}</span> <span className="font-semibold text-[var(--sys-link)]">{sign(c.attributes[k])}</span>
                </span>
              ))}
            </div>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
              {c.resolve != null ? <span><span className="font-semibold text-[var(--jlu)]">Resolve</span> {c.resolve}</span> : null}
              <span><span className="font-semibold text-[var(--jlu)]">Defense</span> {c.defense}</span>
              {c.damageReduction ? <span><span className="font-semibold text-[var(--jlu)]">DR</span> {c.damageReduction}</span> : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
