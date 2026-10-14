import { ALIEN_CAREERS } from "@/lib/data/yze-alien-data";
import { YzeHeader, cardCls, nameCls, badge } from "@/components/YzeRef";

export const dynamic = "force-dynamic";

export default function YzeCareersPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <YzeHeader title="Careers" subtitle="ALIEN RPG · nine careers · pick one at character creation" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {ALIEN_CAREERS.map((c) => (
          <div key={c.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{c.name}</h3>
              <span className={badge}>Key {c.key}</span>
            </div>
            <p className="mt-2 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Key skills:</b> {c.skills.join(", ")}</p>
            <p className="mt-1 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Talents:</b> {c.talents.join(", ")}</p>
            <p className="mt-1 text-[12px] text-[var(--text)]"><b className="text-[var(--muted)]">Signature item:</b> {c.signature.join(" · ")}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]"><b className="text-[var(--muted)]">Gear:</b> {c.gear}</p>
            <div className="mt-2 border-t border-[var(--border)] pt-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Agendas</p>
              <ul className="mt-1 flex flex-col gap-1">
                {c.agendas.map((a, i) => (
                  <li key={i} className="text-[12px] leading-relaxed text-[var(--text)]">• {a}</li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]"><b>Names:</b> {c.names.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
