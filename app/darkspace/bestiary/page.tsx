import { DS_MONSTERS } from "@/lib/data/darkspace-ref-data";
import { RefShell, cardCls, nameCls, badge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

const AL: Record<string, string> = { L: "Lawful", N: "Neutral", C: "Chaotic" };

export default function Page() {
  const sorted = [...DS_MONSTERS].sort((a, b) => (Number(a.lv) - Number(b.lv)) || a.name.localeCompare(b.name));
  return (
    <RefShell title="Bestiary" subtitle="DarkSpace · Frontier Hostiles" active="/darkspace/bestiary" count={`${DS_MONSTERS.length} creatures`}>
      <div className="space-y-3">
        {sorted.map((m) => (
          <div key={m.name} className={cardCls}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={nameCls}>{m.name}</span>
              <span className={badge}>LV {m.lv}</span>
              <span className={badge}>AC {m.ac}</span>
              <span className={badge}>HP {m.hp}</span>
              <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">{AL[m.al] || m.al}</span>
            </div>
            <p className="mt-2 text-[13px] text-[var(--text)]"><span className="font-semibold text-[var(--muted)]">Atk:</span> {m.atk} · <span className="font-semibold text-[var(--muted)]">Mv:</span> {m.mv}</p>
            <p className="text-[12px] text-[var(--muted)]">STR {m.s} · DEX {m.d} · CON {m.c} · INT {m.i} · WIS {m.w} · CHA {m.ch}</p>
            {m.notes ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{m.notes}</p> : null}
          </div>
        ))}
      </div>
    </RefShell>
  );
}
