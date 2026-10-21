import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_ASH, PB_ALCHEMY, PB_ALCHEMY_TABLE, PB_MODULE_SKELETON_POINT } from "@/lib/data/pb-data";
import { PbHeader, SectionNav, RuleNote, Bullets, TableCard, GenTable, N, cardCls, eyebrow, sectionH, th, td, tdNum, dBadge, rollText, silver, type RawQuery } from "@/components/PbRef";

export const dynamic = "force-dynamic";

export default async function PbAlchemyPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await searchParams;
  const A = PB_ALCHEMY, shop = PB_MODULE_SKELETON_POINT.shop;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="ASH & Alchemy" subtitle="the dust of the dead & potions of dubious provenance" />
      <SectionNav items={[
        { id: "ash", label: "ASH" }, { id: "ash-market", label: "ASH Market" }, { id: "ash-effects", label: "Consuming ASH" },
        { id: "alchemy", label: "Alchemy" }, { id: "potions", label: "Potion Generator" }, { id: "prices", label: "Potion Prices" },
      ]} />

      <section id="ash" className="scroll-mt-20">
        <h2 className={sectionH}>ASH</h2>
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div className={cardCls}>
            <p className="text-[13.5px] leading-relaxed text-[var(--muted)]">{PB_ASH.text}</p>
            <p className="mt-2 text-[13px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">One dose:</span> {PB_ASH.dose.text}. <span className="font-semibold text-[var(--text)]">Standard rate:</span> <N className="text-[var(--text)]">{PB_ASH.dose.standardRate}s</N> a dose.</p>
            <p className="mt-2"><span className={dBadge}>pg. {PB_ASH.page}</span></p>
          </div>
          <RuleNote title="Where ASH turns up" className=""><Bullets items={PB_ASH.notes} /></RuleNote>
        </div>
      </section>

      <section id="ash-market" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>The ASH market</h2>
        <div className="grid items-start gap-4 md:grid-cols-2">
          <TableCard t={PB_ASH.market} cols={1} />
          <div className={cardCls}>
            <p className={eyebrow}>Price per dose</p>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{PB_ASH.marketNote} Each roll changes the <em>last</em> rate, so a run of good rolls keeps climbing. From the standard rate:</p>
            <table className="mt-2 w-full border-collapse">
              <thead><tr><th className={th}>2d6</th><th className={th}>Market</th><th className={th}>From 50s</th></tr></thead>
              <tbody>{(PB_ASH.market.rows ?? []).map((r, i) => {
                const m = r.multiplier as number | null | undefined;
                return <tr key={i}><td className={`${tdNum} text-[var(--pb-ink)]`}>{rollText(r.roll)}</td><td className={td}>{r.name}</td><td className={tdNum}>{m == null ? "name your price" : m === 0 ? "worthless" : `${Math.round(PB_ASH.dose.standardRate * m)}s`}</td></tr>;
              })}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="ash-effects" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Consuming ASH</h2>
        <TableCard t={PB_ASH.effects} cols={2} />
      </section>

      <section id="alchemy" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Alchemy</h2>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className={cardCls}>
            <p className={eyebrow}>Three ways to brew</p>
            <dl className="mt-1 flex flex-col gap-1 text-[13px] leading-relaxed text-[var(--muted)]">
              {A.methods.map((m) => <div key={m.id}><dt className="inline font-semibold text-[var(--text)]">{m.name}.</dt> <dd className="inline">{m.text}</dd></div>)}
            </dl>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Using the result</p>
            <Bullets className="mt-1" items={[
              ...A.notes,
              <>Resist with <b className="text-[var(--text)]">{A.resistAbility}</b> against the potion&apos;s DR; craft one with <b className="text-[var(--text)]">{A.craftAbility}</b> against the same DR.</>,
              <>From a reliable source a potion costs <N className="text-[var(--text)]">{A.cost}</N> silver.</>,
            ]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Delivery &amp; DR bands <N className="ml-1 text-[var(--pb-ink)]">d20</N></p>
            <div className="mt-1 grid grid-cols-2 gap-3">
              <table className="w-full border-collapse"><tbody>{A.deliveryBands.map((b) => <tr key={b.name}><td className={`${tdNum} text-[var(--pb-ink)]`}>{rollText(b.roll)}</td><td className={td}>{b.name}</td></tr>)}</tbody></table>
              <table className="w-full border-collapse"><tbody>{A.drBands.map((b) => <tr key={b.dr}><td className={`${tdNum} text-[var(--pb-ink)]`}>{rollText(b.roll)}</td><td className={tdNum}>DR{b.dr}</td></tr>)}</tbody></table>
            </div>
          </div>
        </div>
      </section>

      <section id="potions" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>{PB_ALCHEMY_TABLE.name} <N className="text-[20px] text-[var(--muted)]">{PB_ALCHEMY_TABLE.die}</N></h2>
        <div className={cardCls}>
          <GenTable t={PB_ALCHEMY_TABLE} bare />
          <p className="mt-2"><span className={dBadge}>pg. {A.page}–{A.page + 1}</span></p>
        </div>
      </section>

      <section id="prices" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Potion prices</h2>
        <div className={`${cardCls} max-w-2xl`}>
          <p className={eyebrow}>{shop.name} — The Curse of Skeleton Point</p>
          <p className="mt-1 text-[12.5px] italic leading-relaxed text-[var(--muted)]">An example price list from Tela&apos;s cabin in Death&apos;s Head Swamp, in the Core Rules module. {shop.note}</p>
          <table className="mt-2 w-full border-collapse">
            <tbody>{shop.potions.map((p) => <tr key={p.name}><td className={td}>{p.name}</td><td className={`${tdNum} whitespace-nowrap`}>{p.costText ?? silver(p.cost)}</td></tr>)}</tbody>
          </table>
          <p className="mt-2"><span className={dBadge}>pg. {shop.page}</span></p>
        </div>
      </section>
    </div>
  );
}
