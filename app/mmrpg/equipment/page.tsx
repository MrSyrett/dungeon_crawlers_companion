import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_EQUIPMENT } from "@/lib/data/mmrpg-equipment";
import type { MmrpgEquipment } from "@/lib/data/mmrpg-types";
import { MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, one, type Query, type RawQuery } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/equipment";
const CATS = ["Weapon", "Gear", "Vehicle"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default async function MmrpgEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const ALL = MMRPG_EQUIPMENT as MmrpgEquipment[];
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const cat = CATS.includes(one(raw.cat)) ? one(raw.cat) : "";
  const current: Query = { q, cat };

  const results = ALL.filter((e) =>
    (!cat || e.category === cat) &&
    (!needle || [e.name, e.category, e.weaponClass ?? "", e.range ?? "", e.notes ?? ""].join(" ").toLowerCase().includes(needle)),
  );
  const groups = CATS.filter((c) => results.some((e) => e.category === c));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Equipment" subtitle={`${ALL.length} items`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Weapons add a bonus to your damage multiplier (use the greater of the weapon bonus and any power bonus — they don&rsquo;t stack). A range of <b>Reach</b> is a close weapon; a number is a ranged weapon in spaces. Gear and vehicles arrive with the expansions.</p>
      <SearchForm base={BASE} q={q} placeholder="Search equipment…" hidden={{ cat }} />
      <ChipRow label="Type" base={BASE} current={current} param="cat" options={CATS.map((c) => ({ key: c, label: c + "s" }))} active={cat} />
      <CountLine count={results.length} noun="item" base={BASE} filtered={Boolean(needle || cat)} />
      {results.length === 0 ? <EmptyState noun="item" base={BASE} /> : null}

      {groups.map((c) => (
        <section key={c} className={`${cardCls} mb-4`}>
          <SectionH>{c}s</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((e) => e.category === c).map((e) => (
              <article key={e.name} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{e.name}</h3>
                  {e.damageBonus ? <span className={badge}>Dmg {e.damageBonus}</span> : null}
                </div>
                <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                  {e.weaponClass ? <span><span className="font-semibold text-[var(--text)]">Class:</span> {cap(e.weaponClass)}</span> : null}
                  {e.ability ? <span><span className="font-semibold text-[var(--text)]">Attacks with:</span> {cap(e.ability)}</span> : null}
                  {e.range ? <span><span className="font-semibold text-[var(--text)]">Range:</span> {e.range}{/^\d+$/.test(e.range) ? " spaces" : ""}</span> : null}
                </p>
                {e.notes ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{e.notes}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
