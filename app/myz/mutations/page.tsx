import { MYZ_MUTATIONS } from "@/lib/data/myz-data";
import { MyzHeader, cardCls, nameCls, badge } from "@/components/MyzRef";

export const dynamic = "force-dynamic";

export default function MyzMutationsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MyzHeader title="Mutations" subtitle="Mutant: Year Zero · the powers that make you more than human" />
      <p className="mb-6 max-w-[68ch] text-[13px] leading-relaxed text-[var(--text)]">
        You begin play with <b className="text-[var(--sys-link)]">one mutation</b> (drawn at random);
        you may draw a second by lowering one attribute a step. A mutation never fails — but it burns
        <b className="text-[var(--sys-link)]"> Mutation Points</b> (MP), which you gain only by pushing
        your rolls. Spend too freely and the mutation may <b className="text-[var(--sys-link)]">misfire</b>,
        inflicting permanent trauma or spawning a new mutation. You hold at most 10 MP and ever learn at
        most four mutations.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {MYZ_MUTATIONS.map((m) => (
          <div key={m.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{m.name}</h3>
              <span className={badge}>D66 {m.roll}</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
