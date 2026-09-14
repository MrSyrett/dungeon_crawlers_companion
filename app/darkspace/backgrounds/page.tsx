import { DS_BACKGROUNDS } from "@/lib/data/darkspace-rules-data";
import { RefShell, cardCls, nameCls } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <RefShell title="Backgrounds" subtitle="DarkSpace · Where You Came From" active="/darkspace/backgrounds" count={`${DS_BACKGROUNDS.length} backgrounds`}>
      <div className="grid gap-2 sm:grid-cols-2">
        {DS_BACKGROUNDS.map((b, i) => (
          <div key={b} className={cardCls}>
            <span className="mr-2 text-[11px] font-bold text-[var(--muted)]">{i + 1}.</span>
            <span className={nameCls}>{b}</span>
          </div>
        ))}
      </div>
    </RefShell>
  );
}
