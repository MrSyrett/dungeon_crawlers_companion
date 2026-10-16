import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_REWARDS, LOTR_REWARD_LEVELS, LOTR_REWARD_NOTES, LOTR_ENCHANTED_REWARDS, LOTR_CRAFTS, LOTR_CALLINGS } from "@/lib/data/lotr-data";
import type { LotrReward } from "@/lib/data/lotr-types";
import { LotrHeader, ChipRow, CountLine, Bullets, SectionNav, cardCls, nameCls, badge, eyebrow, sectionH, th, td, one, type RawQuery } from "@/components/LotrRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/lotr/rewards";
const ITEMS = ["Weapon", "Armour", "Shield"];

export default async function LotrRewardsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const items = ITEMS.filter((i) => LOTR_REWARDS.some((r) => r.item === i));
  const item = items.includes(one(raw.item)) ? one(raw.item) : "";
  const current = { item };
  const facets = (r: LotrReward) => ({ item: r.item });
  const show = (r: LotrReward) => facetMatch(facets(r), current);
  const shown = LOTR_REWARDS.filter(show).length;
  const ord = (n: number) => n + (n === 3 ? "rd" : "th");
  const craftCallings = LOTR_CALLINGS.filter((c) => c.craftOrVirtueLevels.length).map((c) => `${c.name} (${c.craftOrVirtueLevels.join(", ")})`);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <LotrHeader title="Rewards & Crafts" subtitle={`rewards at ${LOTR_REWARD_LEVELS.map(ord).join(", ")} level · enchanted rewards · crafts`} />
      <SectionNav items={[{ id: "rewards", label: "Rewards" }, { id: "enchanted", label: "Enchanted Rewards" }, { id: "crafts", label: "Crafts" }]} />

      <section id="rewards" className="scroll-mt-20">
        <h2 className={sectionH}>Rewards</h2>
        <div className={`${cardCls} mb-4`}>
          <Bullets items={LOTR_REWARD_NOTES} />
        </div>
        <InstantFilter>
          <ChipRow label="Item" base={BASE} current={current} param="item" options={items.map((i) => ({ key: i, label: i }))} active={item} />
          <CountLine count={shown} noun="reward" base={BASE} filtered={!!item} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {LOTR_REWARDS.map((r) => (
              <li key={r.name} className={cardCls} hidden={!show(r)} data-f={facetAttr(facets(r))}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className={nameCls}>{r.name}</h3>
                  <span className={badge}>{r.item}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{r.description}</p>
              </li>
            ))}
          </ul>
        </InstantFilter>
      </section>

      <section id="enchanted" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Enchanted Rewards</h2>
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">The qualities of Famous Weapons and Armour (see <a href="/lotr/adventuring#treasure" className="text-[var(--sys-link)] underline">Treasure</a>). Each is tied to a craftsmanship; some only work against the item&rsquo;s banes.</p>
        <div className={`${cardCls} overflow-x-auto`}>
          <table className="w-full min-w-[620px] border-collapse">
            <thead><tr><th className={th}>Quality</th><th className={th}>Craftsmanship</th><th className={th}>Item</th><th className={th}>Bane</th><th className={th}>Effect</th></tr></thead>
            <tbody>{LOTR_ENCHANTED_REWARDS.map((e) => (
              <tr key={e.name}>
                <td className={`${td} font-semibold text-[var(--text)]`}>{e.name}</td>
                <td className={td}>{e.craftsmanship.join(", ")}</td>
                <td className={td}>{e.item}</td>
                <td className={td}>{e.bane === true ? <span className="text-[var(--sys-link)]">Yes</span> : e.bane ? <span className="text-[var(--sys-link)]">{String(e.bane)}</span> : "—"}</td>
                <td className={td}>{e.description}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section id="crafts" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Crafts</h2>
        <div className={`${cardCls} mb-4`}>
          <p className={eyebrow}>Craft slots</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">Scholars gain craft slots from 1st level. Other callings may take a craft slot and a craft in place of a virtue at certain levels: {craftCallings.join(" · ")}. Spent slots return after a short or long rest unless the craft says otherwise.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {LOTR_CRAFTS.map((c) => (
            <div key={c.name} className={cardCls}>
              <h3 className={nameCls}>{c.name}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]">{c.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
