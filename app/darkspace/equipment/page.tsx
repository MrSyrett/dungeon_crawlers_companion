import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_GEAR, DS_ARMOR, DS_MELEE_WEAPONS, DS_RANGED_WEAPONS, DS_EXPLOSIVES, DS_WEAPON_PROPS, DS_ADVANCED_TECH, DS_ADVANCED_TECH_NOTE } from "@/lib/data/darkspace";
import { DarkSpaceHeader, DarkSpaceNav, SearchForm, ChipRow, CountLine, EmptyState, DataTable, cardCls, nameCls, one, type Query, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/equipment";
const KINDS = [
  { key: "gear", label: "Gear" },
  { key: "armor", label: "Armor" },
  { key: "melee", label: "Melee" },
  { key: "ranged", label: "Ranged" },
  { key: "explosives", label: "Explosives" },
  { key: "tech", label: "Advanced Tech" },
  { key: "props", label: "Properties" },
];

export default async function DarkSpaceEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  const show = (k: string) => !kind || kind === k;

  const gear = show("gear") ? DS_GEAR.filter((g) => !needle || (g.name + " " + g.desc).toLowerCase().includes(needle)) : [];
  const armor = show("armor") ? DS_ARMOR.filter((a) => !needle || (a.name + " " + a.props).toLowerCase().includes(needle)) : [];
  const melee = show("melee") ? DS_MELEE_WEAPONS.filter((w) => !needle || (w.name + " " + w.props).toLowerCase().includes(needle)) : [];
  const ranged = show("ranged") ? DS_RANGED_WEAPONS.filter((w) => !needle || (w.name + " " + w.props + " " + (w.group ?? "")).toLowerCase().includes(needle)) : [];
  const explosives = show("explosives") ? DS_EXPLOSIVES.filter((w) => !needle || (w.name + " " + w.props).toLowerCase().includes(needle)) : [];
  const tech = show("tech") ? DS_ADVANCED_TECH.filter((t) => !needle || (t.name + " " + t.text).toLowerCase().includes(needle)) : [];
  const propKeys = Object.keys(DS_WEAPON_PROPS);
  const props = show("props") ? propKeys.filter((k) => !needle || (k + " " + DS_WEAPON_PROPS[k]).toLowerCase().includes(needle)) : [];
  const total = gear.length + armor.length + melee.length + ranged.length + explosives.length + tech.length + props.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Equipment" subtitle="Gear · armor · weapons · explosives · advanced tech" />
      <DarkSpaceNav active="Equipment" />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        DarkSpace uses credits (cr). Citizens start with 1d4 items from the Citizen Gear table; Rookies start with 2d6×10 credits. EC = needs an Energy Cell; Am = needs an ammo magazine.
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search equipment…" hidden={{ kind }} />
      <ChipRow label="Show" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={total} noun="item" base={BASE} filtered={Boolean(needle || kind)} />
      {total === 0 ? <EmptyState noun="item" base={BASE} /> : null}

      <div className="flex flex-col gap-6">
        {gear.length ? (
          <section className={cardCls}>
            <h2 className={`${nameCls} mb-2`}>Gear</h2>
            <DataTable head={["Item", "Cost", "Slot", "EC", "Description"]} rows={gear.map((g) => [g.name, g.cost + "cr", g.slot, g.ec ? "EC" : "—", g.desc])} />
          </section>
        ) : null}
        {armor.length ? (
          <section className={cardCls}>
            <h2 className={`${nameCls} mb-2`}>Armor & Shields</h2>
            <DataTable head={["Armor", "Cost", "Slots", "AC", "Properties"]} rows={armor.map((a) => [a.name, a.cost + "cr", String(a.slots), a.ac, a.props])} />
          </section>
        ) : null}
        {melee.length ? (
          <section className={cardCls}>
            <h2 className={`${nameCls} mb-2`}>Melee Weapons</h2>
            <DataTable head={["Weapon", "Cost", "Range", "Damage", "Properties"]} rows={melee.map((w) => [w.name, w.cost + "cr", w.range, w.dmg, w.props])} />
          </section>
        ) : null}
        {ranged.length ? (
          <section className={cardCls}>
            <h2 className={`${nameCls} mb-2`}>Ranged Weapons</h2>
            <DataTable head={["Weapon", "Group", "Cost", "Range", "Damage", "Properties"]} rows={ranged.map((w) => [w.name, w.group ?? "", w.cost + "cr", w.range, w.dmg, w.props])} />
          </section>
        ) : null}
        {explosives.length ? (
          <section className={cardCls}>
            <h2 className={`${nameCls} mb-2`}>Explosives & Heavy</h2>
            <DataTable head={["Item", "Cost", "Range", "Damage", "Properties"]} rows={explosives.map((w) => [w.name, w.cost + "cr", w.range, w.dmg, w.props])} />
          </section>
        ) : null}
        {tech.length ? (
          <section className={cardCls}>
            <h2 className={`${nameCls} mb-2`}>Advanced Tech</h2>
            <ul className="flex flex-col gap-2">
              {tech.map((t) => (
                <li key={t.name} className="text-[13px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">{t.name}.</span> {t.text}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] italic text-[var(--muted)]">{DS_ADVANCED_TECH_NOTE}</p>
          </section>
        ) : null}
        {props.length ? (
          <section className={cardCls}>
            <h2 className={`${nameCls} mb-2`}>Weapon Properties</h2>
            <DataTable head={["Code", "Meaning"]} rows={props.map((k) => [k, DS_WEAPON_PROPS[k]])} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
