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
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Pushing</h2>
        <p className="max-w-[72ch] text-[13px] leading-relaxed text-[var(--text)]">
          Once per test, after a failure, you may <b className="text-[var(--sys-link)]">push</b> the roll — re-roll every die that
          is not a 6. The cost is always one Condition: physical if the skill used Physique or Precision, mental if it used
          Logic or Empathy (the GM may let you choose). The Condition applies after the roll, so a push can take you to Broken.
          You can also push a successful roll for extra successes. Passive rolls cannot be pushed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em]">Fear & Horror</h2>
        <p className="mb-4 max-w-[72ch] text-[13px] leading-relaxed text-[var(--text)]">
          Confronting a vaesen or a horror forces a <b className="text-[var(--sys-link)]">Fear test</b>: roll Logic or Empathy,
          +1 die per other player character present in the scene (max +3). You need successes equal to the source's Fear value.
          Succeed and you keep your nerve; fail and you may push (take a mental Condition) — otherwise you become
          <b> Terrified</b>, suffering mental Conditions equal to the Fear value (minus any successes you rolled), and must pick
          a reaction. You re-test each round (no further Conditions); it ends when the scene ends.
        </p>
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { level: "Scary", value: 1, examples: "A vaesen; a bloody corpse." },
            { level: "Terrible", value: 2, examples: "A werewolf; dead children." },
            { level: "Unbearable", value: 3, examples: "A mass grave; bound and subjected to violence." },
          ].map((f) => (
            <div key={f.level} className={cardCls}>
              <div className="flex items-baseline gap-x-3"><h3 className={nameCls}>{f.level}</h3><span className={badge}>Fear {f.value}</span></div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{f.examples}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            { name: "Flee", desc: "Use all your actions to escape by the nearest, fastest way — no time to grab things, talk, or help anyone." },
            { name: "Freeze", desc: "Your body refuses to move; you cannot talk or act. Hidden, it takes a Vigilance test to spot you." },
            { name: "Faint", desc: "You go limp and black out. In a concealed spot it takes a Vigilance test to find you." },
            { name: "Frenzy", desc: "Attack the nearest hostile with whatever you hold until it is vanquished; no actions but movement toward it — with no enemy near, you smash things in rage." },
          ].map((r) => (
            <div key={r.name} className={cardCls}>
              <h3 className={nameCls}>{r.name}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]">{r.desc}</p>
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
