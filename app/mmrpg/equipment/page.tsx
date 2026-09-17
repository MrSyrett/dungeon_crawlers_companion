import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_EQUIPMENT } from "@/lib/data/mmrpg-equipment";
import type { MmrpgEquipment } from "@/lib/data/mmrpg-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import MmrpgHeadquarters from "@/components/MmrpgHeadquarters";
import { MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, hbBadge, one, type Query, type RawQuery } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/equipment";
const TIERS = ["Common", "Narrative", "Iconic", "Vehicle"];
const TYPES = ["Weapon", "Item", "Armor", "Vehicle"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
type EquipRow = MmrpgEquipment & { homebrew?: boolean };
const tierOf = (e: EquipRow) => e.tier || "Common";
const typeOf = (e: EquipRow) => e.type || e.category || "Weapon";

export default async function MmrpgEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const [hbIconic, hbIconicOwn, hbHq, hbHqOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "mmrpg-iconic" }),
    ownHomebrew(user.id, "mmrpg-iconic"),
    visibleHomebrew(user.id, { type: "mmrpg-hq" }),
    ownHomebrew(user.id, "mmrpg-hq"),
    userCampaigns(user.id),
  ]);
  const ALL: EquipRow[] = [
    ...hbIconic.map((h) => ({ ...(h.data as Record<string, unknown>), name: h.name, homebrew: true } as EquipRow)),
    ...(MMRPG_EQUIPMENT as EquipRow[]),
  ];
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const tier = TIERS.includes(one(raw.tier)) ? one(raw.tier) : "";
  const type = TYPES.includes(one(raw.type)) ? one(raw.type) : "";
  const current: Query = { q, tier, type };

  const results = ALL.filter((e) =>
    (!tier || tierOf(e) === tier) &&
    (!type || typeOf(e) === type) &&
    (!needle || [e.name, e.owner ?? "", tierOf(e), typeOf(e), e.weaponClass ?? "", e.range ?? "", e.notes ?? "", e.special ?? "", e.speed ?? "", e.powers ?? "", e.weapons ?? ""].join(" ").toLowerCase().includes(needle)),
  );
  const tierGroups = TIERS.filter((t) => results.some((e) => tierOf(e) === t));
  const hbCount = ALL.filter((e) => e.homebrew).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Equipment" subtitle={`${MMRPG_EQUIPMENT.length} items${hbCount ? ` + ${hbCount} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Equipment comes in tiers — <b>Common</b> gear anyone can carry, <b>Narrative</b> story items, <b>Iconic</b> signature weapons and items tied to a hero, and <b>Vehicles</b> — split into Weapons, Items, Armor and Vehicles. Weapons add a bonus to your damage multiplier (use the greater of the weapon bonus and any power bonus — they don&rsquo;t stack); a range of <b>Reach</b> is a close weapon, a number is a ranged weapon in spaces. A <b>vehicle</b> has its own Health, Damage Reduction, speed, size and passenger capacity, plus any onboard powers and weapons.</p>
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">An <b>Iconic Item</b> is a signature weapon, suit of armor or gadget tied to a hero — like Captain America&rsquo;s Shield or the Iron Man Armor. It grants an origin and a list of powers, costs a number of power picks equal to its <b>Power Value</b>, and usually carries restrictions. Build your own below.</p>

      <div className="mb-6">
        <HomebrewEditor kind="mmrpg-iconic" campaigns={campaigns} initial={hbIconicOwn} />
      </div>

      <SearchForm base={BASE} q={q} placeholder="Search equipment…" hidden={{ tier, type }} />
      <ChipRow label="Tier" base={BASE} current={current} param="tier" options={TIERS.map((t) => ({ key: t, label: t }))} active={tier} />
      <ChipRow label="Type" base={BASE} current={current} param="type" options={TYPES.map((t) => ({ key: t, label: t + "s" }))} active={type} />
      <CountLine count={results.length} noun="item" base={BASE} filtered={Boolean(needle || tier || type)} />
      {results.length === 0 ? <EmptyState noun="item" base={BASE} /> : null}

      {tierGroups.map((t) => (
        <section key={t} className={`${cardCls} mb-4`}>
          <SectionH>{t}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((e) => tierOf(e) === t).map((e) => (
              <article key={`${e.homebrew ? "hb" : "bk"}-${e.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{e.name}</h3>
                  <span className="flex items-center gap-1.5">
                    {e.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{typeOf(e)}</span>
                    {typeof e.powerValue === "number" ? <span className={badge}>PV {e.powerValue}</span> : null}
                    {e.damageBonus && e.damageBonus !== "—" ? <span className={badge}>Dmg {e.damageBonus}</span> : null}
                  </span>
                </div>
                {e.owner && e.owner !== "—" ? <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--mmrpg)]">{e.owner}</p> : null}
                {e.grantsOrigin ? <p className="mt-1 text-[11px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Grants origin:</span> {e.grantsOrigin}</p> : null}
                {typeOf(e) === "Vehicle" ? (
                  <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                    {e.health ? <span><span className="font-semibold text-[var(--text)]">Health:</span> {e.health}</span> : null}
                    {e.damageReduction && e.damageReduction !== "—" ? <span><span className="font-semibold text-[var(--text)]">DR:</span> {e.damageReduction}</span> : null}
                    {e.speed ? <span><span className="font-semibold text-[var(--text)]">Speed:</span> {e.speed}</span> : null}
                    {e.size ? <span><span className="font-semibold text-[var(--text)]">Size:</span> {e.size}</span> : null}
                    {e.passengers ? <span><span className="font-semibold text-[var(--text)]">Passengers:</span> {e.passengers}</span> : null}
                  </p>
                ) : (
                  <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                    {e.weaponClass ? <span><span className="font-semibold text-[var(--text)]">Class:</span> {cap(e.weaponClass)}</span> : null}
                    {e.ability ? <span><span className="font-semibold text-[var(--text)]">Attacks with:</span> {cap(e.ability)}</span> : null}
                    {e.range ? <span><span className="font-semibold text-[var(--text)]">Range:</span> {e.range}{/^\d+$/.test(e.range) ? " spaces" : ""}</span> : null}
                    {e.grantsMovement?.length ? <span><span className="font-semibold text-[var(--text)]">Grants:</span> {e.grantsMovement.map((m) => `${m.mode} ×${m.mult} ${m.base ?? "run"}`).join(", ")}</span> : null}
                  </p>
                )}
                {e.notes ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{e.notes}</p> : null}
                {e.grantsPowers ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Grants:</span> {e.grantsPowers}</p> : null}
                {typeOf(e) === "Vehicle" && e.powers ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Powers:</span> {e.powers}</p> : null}
                {typeOf(e) === "Vehicle" && e.weapons ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Weapons:</span> {e.weapons}</p> : null}
                {e.special ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">{typeOf(e) === "Vehicle" ? "Notes" : "Special"}:</span> {e.special}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}

      <MmrpgHeadquarters campaigns={campaigns} own={hbHqOwn} visible={hbHq} />
    </div>
  );
}
