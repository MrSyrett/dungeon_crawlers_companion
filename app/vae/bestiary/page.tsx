import { VAE_BESTIARY } from "@/lib/data/vae-data";
import { VaesenHeader, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

export default function VaesenBestiaryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="The Vaesen" subtitle="Vaesen · the creatures of Nordic folklore and how to banish them" />
      <p className="mb-6 max-w-[70ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Vaesen have no attributes or skills — only Might, Body Control, Magic, Manipulation, and a Fear value
        (the successes a character needs on their Fear test; a pair like 2/1 means first sighting / after).
        They are rarely beaten in a fight: each is banished by a specific <b className="text-[var(--sys-link)]">ritual</b>,
        and each hides a <b>secret</b> that complicates it.
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {VAE_BESTIARY.map((v) => (
          <div key={v.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{v.name}</h3>
              <span className={badge}>Fear {String(v.stats.fear)}</span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-[var(--muted)]">
              Might {String(v.stats.might)} · Body {String(v.stats.bodyControl)} · Magic {String(v.stats.magic)} · Manip {String(v.stats.manipulation)}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]">{v.desc}</p>
            {v.powers?.length ? (
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]"><b className="text-[var(--muted)]">Powers:</b> {v.powers.join(" · ")}</p>
            ) : null}
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]"><b className="text-[var(--muted)]">Combat:</b> {v.combat}</p>
            <details className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
              <summary className="cursor-pointer text-[var(--sys-link)]">Ritual &amp; secret</summary>
              <p className="mt-1">{v.weakness}</p>
              <p className="mt-1"><b>Conditions:</b> {v.conditions}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
