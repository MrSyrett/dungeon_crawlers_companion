import { VAE_CONDITIONS, VAE_PHYSICAL_CRITS, VAE_MENTAL_CRITS } from "@/lib/data/vae-data";
import { VaesenHeader, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

const th = "p-2 text-left text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]";
const td = "p-2 text-[13px] text-[var(--text)] align-top";

function d66(n: number): string { return String(n); }

function CritTable({ rows, fatalKey }: { rows: Array<{ roll: number; injury: string; effect: string; timeLimit: string } & Record<string, string | number>>; fatalKey: "fatal" | "chronic" }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full border-collapse text-[13px]">
        <thead><tr className="bg-[var(--panel-2)]"><th className={th}>D66</th><th className={th}>Injury</th><th className={th}>{fatalKey === "fatal" ? "Fatal" : "Chronic"}</th><th className={th}>Time</th><th className={th}>Effect</th></tr></thead>
        <tbody>
          {rows.map((r) => {
            const danger = String(r[fatalKey]) !== "No";
            return (
              <tr key={r.roll} className="border-t border-[var(--border)]">
                <td className={td + " font-mono font-bold text-[var(--sys-link)]"}>{d66(r.roll)}</td>
                <td className={td + " font-semibold"}>{r.injury}</td>
                <td className={td + (danger ? " text-[var(--vae)]" : " text-[var(--muted)]")}>{String(r[fatalKey])}</td>
                <td className={td + " text-[var(--muted)]"}>{r.timeLimit}</td>
                <td className={td}>{r.effect}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function VaesenInjuriesPage() {
  const phys = VAE_CONDITIONS.filter((c) => c.type === "Physical");
  const ment = VAE_CONDITIONS.filter((c) => c.type === "Mental");
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="Conditions & Injuries" subtitle="Vaesen · the health model — three physical, three mental" />
      <p className="mb-6 max-w-[70ch] text-[13px] leading-relaxed text-[var(--text)]">
        Vaesen has no hit points. Harm marks <b className="text-[var(--sys-link)]">Conditions</b> — three physical
        (affecting Physique/Precision rolls) and three mental (affecting Logic/Empathy). Each is −1 die and they
        stack. Take a fourth of a type and you are <b>Broken</b>: you fail every roll and immediately roll a
        critical injury. Fatal/chronic injuries must be treated before their time limit or you die or go mad;
        the mildest leave a lasting Affliction, and the rarest grant an Insight.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Conditions</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[...phys, ...ment].map((c) => (
            <div key={c.name} className={cardCls}>
              <div className="flex items-baseline gap-x-3"><h3 className={nameCls}>{c.name}</h3><span className={badge}>{c.type}</span></div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Physical Critical Injuries</h2>
        <CritTable rows={VAE_PHYSICAL_CRITS as never} fatalKey="fatal" />
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Mental Critical Injuries</h2>
        <CritTable rows={VAE_MENTAL_CRITS as never} fatalKey="chronic" />
      </section>
    </div>
  );
}
