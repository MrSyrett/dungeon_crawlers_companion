import { DS_TRAITS } from "@/lib/data/darkspace-rules-data";
import { RefShell, cardCls, nameCls } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <RefShell title="Traits" subtitle="DarkSpace · Decoupled from Species" active="/darkspace/traits" count={`${DS_TRAITS.length} traits`}>
      <p className="mb-5 text-[13px] leading-relaxed text-[var(--muted)]">
        In DarkSpace your Species is free-text flavor — you write in whatever you like. Your mechanical edge comes from a single Trait you choose separately.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {DS_TRAITS.map((t) => (
          <div key={t.name} className={cardCls}>
            <div className={nameCls}>{t.name}</div>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--text)]">{t.effect}</p>
          </div>
        ))}
      </div>
    </RefShell>
  );
}
