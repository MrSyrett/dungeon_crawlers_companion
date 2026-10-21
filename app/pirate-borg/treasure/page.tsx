import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PB_LOOT_THE_BODY, PB_BURIED_TREASURE, PB_TREASURE_MAPS, PB_CARGO, PB_ISLANDS } from "@/lib/data/pb-data";
import { PbHeader, SectionNav, RuleNote, TableCard, N, cardCls, sectionH, dBadge, type RawQuery } from "@/components/PbRef";

export const dynamic = "force-dynamic";

export default async function PbTreasurePage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  await searchParams;
  const TM = PB_TREASURE_MAPS;
  const mapOrder = ["type", "material", "geography", "itStarts", "invisibleInk", "complication", "icons", "clueContainer", "direction", "markers"];
  const mapTables = [...mapOrder.filter((k) => TM.tables[k]), ...Object.keys(TM.tables).filter((k) => !mapOrder.includes(k))].map((k) => [k, TM.tables[k]] as const);
  const isl = [PB_ISLANDS.tables.hideTreasure, PB_ISLANDS.tables.fortune].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Treasure" subtitle="loot the body, dig up the chest, follow the map" />
      <SectionNav items={[
        { id: "loot", label: "Loot the Body" }, { id: "buried", label: "Buried Treasure" }, { id: "maps", label: "Treasure Maps" },
        { id: "riddles", label: "Riddles" }, { id: "cargo", label: "Cargo" }, { id: "islands", label: "Island Hoards" },
      ]} />

      <section id="loot" className="scroll-mt-20">
        <h2 className={sectionH}>Loot the body</h2>
        <TableCard t={PB_LOOT_THE_BODY} cols={2}>
          {PB_LOOT_THE_BODY.addRollAsSilver ? <p className="mt-2 text-[12.5px] text-[var(--muted)]">Whatever the result, the body also carries silver equal to the number rolled.</p> : null}
        </TableCard>
      </section>

      <section id="buried" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Buried treasure <N className="text-[20px] text-[var(--muted)]">{PB_BURIED_TREASURE.die}</N></h2>
        <TableCard t={PB_BURIED_TREASURE} cols={2} />
      </section>

      <section id="maps" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Treasure maps</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{TM.note} <span className={dBadge}>pg. {TM.page}–{TM.page + 1}</span></p>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mapTables.map(([k, t]) => <TableCard key={k} t={t} id={`map-${k}`} cols={1} />)}
        </div>
      </section>

      <section id="riddles" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Riddles <N className="text-[20px] text-[var(--muted)]">{TM.riddles.die}</N></h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">Fill each [icon], [marker] and [direction] from the <a href="#map-icons" className="text-[var(--sys-link)] hover:underline">Icons</a>, <a href="#map-markers" className="text-[var(--sys-link)] hover:underline">Markers</a> and <a href="#map-direction" className="text-[var(--sys-link)] hover:underline">Direction</a> tables. The answer under each riddle is for the GM.</p>
        <TableCard t={{ ...TM.riddles, note: undefined }} cols={2} />
      </section>

      <section id="cargo" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Cargo</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">{PB_CARGO.note}</p>
        <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TableCard t={PB_CARGO.mundane} cols={1} />
          <TableCard t={PB_CARGO.special} cols={1} />
          <div className="flex flex-col gap-4">
            <TableCard t={PB_CARGO.plotTwist} cols={1} />
            <RuleNote title="Selling it" className=""><p>{PB_CARGO.marketRates.text}</p><p className="mt-1.5"><a href="/pirate-borg/alchemy#ash-market" className="text-[var(--sys-link)] hover:underline">ASH market</a> · <a href="/pirate-borg/naval#cargo" className="text-[var(--sys-link)] hover:underline">cargo on the ship</a></p></RuleNote>
          </div>
        </div>
      </section>

      <section id="islands" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Island hoards</h2>
        <p className="mb-3 max-w-[80ch] text-[13px] leading-relaxed text-[var(--muted)]">Two tables from the uncharted island generator; the rest are on <a href="/pirate-borg/tables#group-uncharted-islands" className="text-[var(--sys-link)] hover:underline">GM Tables</a>.</p>
        <div className="grid items-start gap-4 md:grid-cols-2">{isl.map((t) => <TableCard key={t.id} t={t} cols={1} />)}</div>
      </section>

      <div className={`${cardCls} mt-10 text-[12.5px] text-[var(--muted)]`}>Relics and Things of Importance referenced above are on <a href="/pirate-borg/magic" className="text-[var(--sys-link)] hover:underline">Relics &amp; Rituals</a> and <a href="/pirate-borg/backgrounds" className="text-[var(--sys-link)] hover:underline">Backgrounds</a>; potions on <a href="/pirate-borg/alchemy#potions" className="text-[var(--sys-link)] hover:underline">ASH &amp; Alchemy</a>.</div>
    </div>
  );
}
