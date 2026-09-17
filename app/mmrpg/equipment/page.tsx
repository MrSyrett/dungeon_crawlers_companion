import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MMRPG_EQUIPMENT } from "@/lib/data/mmrpg-equipment";
import type { MmrpgEquipment } from "@/lib/data/mmrpg-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import MmrpgHeadquarters from "@/components/MmrpgHeadquarters";
import { MmrpgHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, hbBadge, one, withParams, type Query, type RawQuery } from "@/components/MmrpgRef";

export const dynamic = "force-dynamic";
const BASE = "/mmrpg/equipment";
const TABS = [
  { key: "gear", label: "Equipment" },
  { key: "iconic", label: "Iconic Items" },
  { key: "hq", label: "Headquarters" },
];
const GEAR_TIERS = ["Common", "Narrative", "Vehicle"];
const GEAR_TYPES = ["Weapon", "Item", "Armor", "Vehicle"];
const ICONIC_TYPES = ["Weapon", "Item", "Armor"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
type EquipRow = MmrpgEquipment & { homebrew?: boolean };
const tierOf = (e: EquipRow) => e.tier || "Common";
const typeOf = (e: EquipRow) => e.type || e.category || "Weapon";
const matches = (e: EquipRow, needle: string) =>
  !needle || [e.name, e.owner ?? "", tierOf(e), typeOf(e), e.weaponClass ?? "", e.range ?? "", e.notes ?? "", e.special ?? "", e.speed ?? "", e.powers ?? "", e.weapons ?? "", e.grantsPowers ?? "", e.grantsOrigin ?? ""].join(" ").toLowerCase().includes(needle);

function EquipCard({ e }: { e: EquipRow }) {
  const isVehicle = typeOf(e) === "Vehicle";
  const hasDetails = Boolean(
    e.notes || e.grantsPowers || e.restrictions?.length || (isVehicle && e.powers) || (isVehicle && e.weapons) || e.special,
  );
  return (
    <article className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
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
      {isVehicle ? (
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
      {hasDetails ? (
        <details className="group mt-2">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--mmrpg)] hover:text-[#f4737a] [&::-webkit-details-marker]:hidden">
            <span className="inline-block transition-transform group-open:rotate-90">▸</span>
            <span className="group-open:hidden">Details</span>
            <span className="hidden group-open:inline">Hide details</span>
          </summary>
          <div className="mt-1.5">
            {e.notes ? <p className="text-[12px] leading-relaxed text-[var(--muted)]">{e.notes}</p> : null}
            {e.grantsPowers ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Grants:</span> {e.grantsPowers}</p> : null}
            {e.restrictions?.length ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Restrictions:</span> {e.restrictions.join(", ")}</p> : null}
            {isVehicle && e.powers ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Powers:</span> {e.powers}</p> : null}
            {isVehicle && e.weapons ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">Weapons:</span> {e.weapons}</p> : null}
            {e.special ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[var(--mmrpg)]">{isVehicle ? "Notes" : "Special"}:</span> {e.special}</p> : null}
          </div>
        </details>
      ) : null}
    </article>
  );
}

function TabBar({ active }: { active: string }) {
  return (
    <div className="mb-5 flex flex-wrap gap-1 border-b border-[var(--border)]">
      {TABS.map((t) => (
        <Link
          key={t.key}
          href={`${BASE}?tab=${t.key}`}
          className={`-mb-px rounded-t border-x border-t px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${
            active === t.key
              ? "border-[var(--border)] bg-[var(--panel)] text-[#f4737a]"
              : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}

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

  const raw = await searchParams;
  const tab = TABS.some((t) => t.key === one(raw.tab)) ? one(raw.tab) : "gear";
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();

  const hbIconicRows: EquipRow[] = hbIconic.map((h) => ({ ...(h.data as Record<string, unknown>), name: h.name, homebrew: true } as EquipRow));
  const bookRows = MMRPG_EQUIPMENT as EquipRow[];
  const gearAll = bookRows.filter((e) => tierOf(e) !== "Iconic");
  const iconicAll = [...hbIconicRows, ...bookRows.filter((e) => tierOf(e) === "Iconic")];
  const hbCount = hbIconicRows.length + hbHq.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <MmrpgHeader title="Equipment" subtitle={`${MMRPG_EQUIPMENT.length} items${hbCount ? ` + ${hbCount} homebrew` : ""}`} />
      <TabBar active={tab} />

      {tab === "gear" ? (() => {
        const tier = GEAR_TIERS.includes(one(raw.tier)) ? one(raw.tier) : "";
        const type = GEAR_TYPES.includes(one(raw.type)) ? one(raw.type) : "";
        const current: Query = { q, tier, type, tab };
        const results = gearAll.filter((e) => (!tier || tierOf(e) === tier) && (!type || typeOf(e) === type) && matches(e, needle));
        const groups = GEAR_TIERS.filter((t) => results.some((e) => tierOf(e) === t));
        return (
          <>
            <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Everyday gear — <b>Common</b> weapons, items and armor, <b>Narrative</b> story items, and <b>Vehicles</b>. Weapons add a bonus to your damage multiplier (use the greater of the weapon bonus and any power bonus — they don&rsquo;t stack); a range of <b>Reach</b> is a close weapon, a number is a ranged weapon in spaces. A <b>vehicle</b> has its own Health, Damage Reduction, speed, size and passenger capacity.</p>
            <SearchForm base={BASE} q={q} placeholder="Search equipment…" hidden={{ tier, type, tab }} />
            <ChipRow label="Tier" base={BASE} current={current} param="tier" options={GEAR_TIERS.map((t) => ({ key: t, label: t }))} active={tier} />
            <ChipRow label="Type" base={BASE} current={current} param="type" options={GEAR_TYPES.map((t) => ({ key: t, label: t + "s" }))} active={type} />
            <CountLine count={results.length} noun="item" base={withParams(BASE, {}, { tab })} filtered={Boolean(needle || tier || type)} />
            {results.length === 0 ? <EmptyState noun="item" base={withParams(BASE, {}, { tab })} /> : null}
            {groups.map((t) => (
              <section key={t} className={`${cardCls} mb-4`}>
                <SectionH>{t}</SectionH>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {results.filter((e) => tierOf(e) === t).map((e) => <EquipCard key={`${e.homebrew ? "hb" : "bk"}-${e.name}`} e={e} />)}
                </div>
              </section>
            ))}
          </>
        );
      })() : null}

      {tab === "iconic" ? (() => {
        const type = ICONIC_TYPES.includes(one(raw.type)) ? one(raw.type) : "";
        const current: Query = { q, type, tab };
        const results = iconicAll.filter((e) => (!type || typeOf(e) === type) && matches(e, needle));
        const groups = ICONIC_TYPES.filter((t) => results.some((e) => typeOf(e) === t));
        return (
          <>
            <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">An <b>Iconic Item</b> is a signature weapon, suit of armor or gadget tied to a hero — like Captain America&rsquo;s Shield or the Iron Man Armor. It grants an origin and a list of powers, costs a number of power picks equal to its <b>Power Value</b>, and usually carries restrictions. Build your own below, then browse the catalog.</p>
            <div className="mb-5">
              <HomebrewEditor kind="mmrpg-iconic" campaigns={campaigns} initial={hbIconicOwn} />
            </div>
            <SearchForm base={BASE} q={q} placeholder="Search iconic items…" hidden={{ type, tab }} />
            <ChipRow label="Type" base={BASE} current={current} param="type" options={ICONIC_TYPES.map((t) => ({ key: t, label: t + "s" }))} active={type} />
            <CountLine count={results.length} noun="iconic item" base={withParams(BASE, {}, { tab })} filtered={Boolean(needle || type)} />
            {results.length === 0 ? <EmptyState noun="iconic item" base={withParams(BASE, {}, { tab })} /> : null}
            {groups.map((t) => (
              <section key={t} className={`${cardCls} mb-4`}>
                <SectionH>{t}s</SectionH>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {results.filter((e) => typeOf(e) === t).map((e) => <EquipCard key={`${e.homebrew ? "hb" : "bk"}-${e.name}`} e={e} />)}
                </div>
              </section>
            ))}
          </>
        );
      })() : null}

      {tab === "hq" ? <MmrpgHeadquarters campaigns={campaigns} own={hbHqOwn} visible={hbHq} /> : null}
    </div>
  );
}
