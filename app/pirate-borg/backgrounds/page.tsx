import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  PB_BACKGROUNDS, PB_FLAWS, PB_TRADEMARKS, PB_IDIOSYNCRASIES, PB_INCIDENTS, PB_THINGS, PB_NAMES,
  PB_CONTAINERS, PB_CHEAP_GEAR, PB_FANCY_GEAR, PB_PETS, PB_INSTRUMENTS, PB_STARTING_WEAPONS, PB_CLOTHING, PB_HATS, PB_RULES,
} from "@/lib/data/pb-data";
import type { PbBackground } from "@/lib/data/pb-types";
import { PbHeader, SectionNav, DieTable, MiniTable, SearchForm, CountLine, EmptyState, N, cardCls, eyebrow, sectionH, th, td, tdNum, tableWrap, one, rollText, armorDie, silver, rollCls, type RawQuery } from "@/components/PbRef";
import InstantFilter from "@/components/InstantFilter";

export const dynamic = "force-dynamic";
const BASE = "/pirate-borg/backgrounds";

const silverText = (b: PbBackground) => `${b.silver} × ${b.silverMultiplier}s`;

export default async function PbBackgroundsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim().toLowerCase();
  const show = (b: PbBackground) => !q || `${b.name} ${b.item}`.toLowerCase().includes(q);
  const shown = PB_BACKGROUNDS.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PbHeader title="Backgrounds" subtitle="who you were before the sea took you · roll or choose" />
      <SectionNav items={[
        { id: "steps", label: "Creation Steps" }, { id: "background", label: "Background & Silver" }, { id: "flaws", label: "Flaws & Trademarks" },
        { id: "quirks", label: "Idiosyncrasies & Incidents" }, { id: "things", label: "Thing of Importance" }, { id: "names", label: "Pirate Names" },
        { id: "gear", label: "Starting Gear" },
      ]} />

      <section id="steps" className="scroll-mt-20">
        <ol className={`${cardCls} flex list-decimal flex-col gap-1 pl-9 text-[13px] leading-relaxed text-[var(--muted)] marker:text-[var(--pb-ink)]`}>
          {PB_RULES.creation.steps.map((s) => <li key={s.id}>{s.text}</li>)}
        </ol>
      </section>

      <section id="background" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Background &amp; silver <N className="text-[20px] text-[var(--muted)]">d100</N></h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Your past life, your starting silver and the one thing you kept from it. Silver is the listed roll × 10.</p>
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search backgrounds or items…" hidden={{}} />
          <CountLine count={shown} noun="background" base={BASE} filtered={!!q} />
          <EmptyState noun="background" base={BASE} hidden={shown > 0} />
          <div className={tableWrap}>
            <table className="w-full min-w-[520px] border-collapse">
              <thead><tr>{["d100", "Background", "Silver", "You also have"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
              <tbody>
                {PB_BACKGROUNDS.map((b) => (
                  <tr key={b.id} hidden={!show(b)} data-f="{}">
                    <td className={`${tdNum} w-14 text-[var(--pb-ink)]`}>{rollText(b.roll)}</td>
                    <td className={`${td} font-semibold text-[var(--text)]`}>{b.name}</td>
                    <td className={`${tdNum} whitespace-nowrap`}>{silverText(b)}</td>
                    <td className={td}>{b.table === "instruments" ? "an instrument (d10 table below)" : b.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InstantFilter>
      </section>

      <section id="flaws" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Flaws &amp; trademarks</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}><DieTable title="Distinctive Flaw" die="d20" rows={PB_FLAWS} cols={2} /></div>
          <div className={cardCls}><DieTable title="Physical Trademark" die="d20" rows={PB_TRADEMARKS} /></div>
        </div>
      </section>

      <section id="quirks" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Idiosyncrasies &amp; unfortunate incidents</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}><DieTable title="Idiosyncrasies" die="d20" rows={PB_IDIOSYNCRASIES} /></div>
          <div className={cardCls}><DieTable title="Unfortunate Incidents & Conditions" die="d20" rows={PB_INCIDENTS} /></div>
        </div>
      </section>

      <section id="things" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Thing of importance <N className="text-[20px] text-[var(--muted)]">d100</N></h2>
        <div className={cardCls}><DieTable rows={PB_THINGS.map((t) => ({ roll: t.roll, text: t.text }))} cols={3} /></div>
      </section>

      <section id="names" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Pirate names <N className="text-[20px] text-[var(--muted)]">d66 × 4</N></h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Roll d66 (one d6 for tens, one for units) on each column: a first name, a surname and a nickname — roll the nickname column twice if you like.</p>
        <div className={tableWrap}>
          <table className="w-full min-w-[520px] border-collapse">
            <thead><tr>{["d66", "Male", "Female", "Surname", "Nickname"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>
              {PB_NAMES.map((n) => (
                <tr key={n.roll}>
                  <td className={`${tdNum} w-14 text-[var(--pb-ink)]`}>{n.roll}</td>
                  <td className={`${td} text-[var(--text)]`}>{n.male}</td>
                  <td className={`${td} text-[var(--text)]`}>{n.female}</td>
                  <td className={td}>{n.surname}</td>
                  <td className={td}>{n.nickname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="gear" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Starting gear</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">Everyone rolls a container, cheap gear and fancy gear. Your class sets the die for weapon, clothing and hat — roll it on the tables here (a d6 weapon die only reaches entries 1–6).</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className={cardCls}><DieTable title="Container" die="d6" rows={PB_CONTAINERS.map((c) => ({ roll: c.roll, text: c.text }))} /></div>
          <div className={cardCls}>
            <DieTable title="Cheap Gear" die="d12" rows={PB_CHEAP_GEAR} />
            <MiniTable title="Pet" die="d10" rows={PB_PETS} />
          </div>
          <div className={cardCls}>
            <DieTable title="Fancy Gear" die="d12" rows={PB_FANCY_GEAR} />
            <MiniTable title="Instrument" die="d10" rows={PB_INSTRUMENTS} />
          </div>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className={cardCls}><DieTable title={PB_STARTING_WEAPONS.name} die={PB_STARTING_WEAPONS.die} note={PB_STARTING_WEAPONS.note} rows={PB_STARTING_WEAPONS.rows ?? []} /></div>
          <div className={cardCls}>
            <p className={eyebrow}>Clothing <N className="ml-1 text-[var(--pb-ink)]">d10</N></p>
            <ol className="mt-1.5 flex flex-col gap-1 text-[13px] text-[var(--muted)]">
              {PB_CLOTHING.map((c) => <li key={c.id} className="flex gap-2"><span className={rollCls}>{rollText(c.roll)}</span><span><b className="text-[var(--text)]">{c.name}</b> · tier <N>{c.tier}</N>{c.armorDie ? <> <N>{armorDie(c.armorDie)}</N></> : null}{c.cost != null ? <> · <N>{silver(c.cost)}</N></> : null}</span></li>)}
            </ol>
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>Hat <N className="ml-1 text-[var(--pb-ink)]">d12</N></p>
            <ol className="mt-1.5 flex flex-col gap-1 text-[13px] text-[var(--muted)]">
              {PB_HATS.map((h) => <li key={h.id} className="flex gap-2"><span className={rollCls}>{rollText(h.roll)}</span><span><b className="text-[var(--text)]">{h.name}</b>{h.cost != null ? <> · <N>{silver(h.cost)}</N></> : null}{h.special ? ` · ${h.special}` : ""}</span></li>)}
            </ol>
          </div>
        </div>
        <p className="mt-3 text-[12.5px] text-[var(--muted)]">Full weapon, armor and price lists: <a href="/pirate-borg/gear" className="text-[var(--sys-link)] underline">Gear</a>.</p>
      </section>
    </div>
  );
}
