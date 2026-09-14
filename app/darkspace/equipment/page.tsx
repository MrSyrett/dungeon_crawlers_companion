import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_GEAR, DS_ARMOR, DS_MELEE_WEAPONS, DS_RANGED_WEAPONS, DS_EXPLOSIVES, DS_WEAPON_PROPS, DS_ADVANCED_TECH, DS_ADVANCED_TECH_NOTE } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, DataTable, one, type Query, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/equipment";

type Cat = "gear" | "armor" | "melee" | "ranged" | "explosive" | "tech";
const KINDS: { key: Cat; label: string }[] = [
  { key: "gear", label: "Gear" },
  { key: "armor", label: "Armor" },
  { key: "melee", label: "Melee" },
  { key: "ranged", label: "Ranged" },
  { key: "explosive", label: "Explosives" },
  { key: "tech", label: "Adv. Tech" },
];
const CAT_LABEL: Record<Cat, string> = { gear: "Gear", armor: "Armor", melee: "Melee Weapon", ranged: "Ranged Weapon", explosive: "Explosive", tech: "Advanced Tech" };
const CAT_RANK: Record<Cat, number> = { gear: 0, armor: 1, melee: 2, ranged: 3, explosive: 4, tech: 5 };

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

type Row = {
  name: string; category: Cat; cost: number; slot?: string; ec?: boolean;
  ac?: string; range?: string; dmg?: string; props?: string; group?: string; desc?: string; homebrew: boolean;
};

function bookRows(): Row[] {
  const rows: Row[] = [];
  DS_GEAR.forEach((g) => rows.push({ name: g.name, category: "gear", cost: g.cost, slot: g.slot, ec: g.ec, desc: g.desc, homebrew: false }));
  DS_ARMOR.forEach((a) => rows.push({ name: a.name, category: "armor", cost: a.cost, slot: String(a.slots), ac: a.ac, props: a.props, homebrew: false }));
  DS_MELEE_WEAPONS.forEach((w) => rows.push({ name: w.name, category: "melee", cost: w.cost, range: w.range, dmg: w.dmg, props: w.props, homebrew: false }));
  DS_RANGED_WEAPONS.forEach((w) => rows.push({ name: w.name, category: "ranged", cost: w.cost, range: w.range, dmg: w.dmg, props: w.props, group: w.group, homebrew: false }));
  DS_EXPLOSIVES.forEach((w) => rows.push({ name: w.name, category: "explosive", cost: w.cost, range: w.range, dmg: w.dmg, props: w.props, homebrew: false }));
  DS_ADVANCED_TECH.forEach((t) => rows.push({ name: t.name, category: "tech", cost: 0, desc: t.text, homebrew: false }));
  return rows;
}

function hbToRow(data: Record<string, unknown>, name: string): Row {
  const cat = (["gear", "armor", "melee", "ranged", "explosive"] as Cat[]).includes(s(data.category) as Cat) ? (s(data.category) as Cat) : "gear";
  const cost = parseInt(s(data.cost), 10);
  return {
    name, category: cat, cost: Number.isFinite(cost) ? cost : 0,
    slot: s(data.slot) || undefined, ec: data.ec === true || undefined,
    ac: s(data.ac) || undefined, range: s(data.range) || undefined, dmg: s(data.dmg) || undefined,
    props: s(data.props) || undefined, group: s(data.group) || undefined, desc: s(data.desc) || undefined,
    homebrew: true,
  };
}

function Badge({ label, value }: { label: string; value: string }) {
  return <span className={badge}>{label} <span className="text-[var(--text)]">{value}</span></span>;
}

export default async function DarkSpaceEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-equipment" }),
    ownHomebrew(user.id, "ds-equipment"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToRow(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...bookRows()].sort((a, b) => CAT_RANK[a.category] - CAT_RANK[b.category] || a.name.localeCompare(b.name, "en"));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? (one(raw.kind) as Cat) : "";
  const current: Query = { q, kind };
  const results = ALL.filter((r) => (!kind || r.category === kind) &&
    (!needle || [r.name, r.desc, r.props, r.group, r.dmg, r.ac].map((x) => x ?? "").join(" ").toLowerCase().includes(needle)));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Equipment" subtitle={`${bookRows().length} items${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        DarkSpace uses credits (cr). Citizens start with 1d4 items from the Citizen Gear table; Rookies start with 2d6×10 credits. EC = needs an Energy Cell; Am = needs an ammo magazine.
      </p>
      <div className="mb-6"><HomebrewEditor kind="ds-equipment" campaigns={campaigns} initial={hbOwn} /></div>
      <SearchForm base={BASE} q={q} placeholder="Search name, damage, or property…" hidden={{ kind }} />
      <ChipRow label="Type" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <CountLine count={results.length} noun="item" base={BASE} filtered={Boolean(needle || kind)} />
      {kind === "tech" ? <p className="mb-4 text-[12px] italic leading-relaxed text-[var(--muted)]">{DS_ADVANCED_TECH_NOTE}</p> : null}
      {results.length === 0 ? <EmptyState noun="item" base={BASE} /> : null}

      {results.length ? (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((r, i) => (
            <li key={`${r.homebrew ? "hb" : "bk"}-${r.category}-${r.name}-${i}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{r.name}</h2>
                {r.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {CAT_LABEL[r.category]}{r.group ? ` · ${r.group}` : ""}{r.cost ? ` · ${r.cost}cr` : ""}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {r.dmg ? <Badge label="Damage" value={r.dmg} /> : null}
                {r.range ? <Badge label="Range" value={r.range} /> : null}
                {r.ac ? <Badge label="AC" value={r.ac} /> : null}
                {r.slot ? <Badge label="Slots" value={r.slot} /> : null}
                {r.ec ? <Badge label="Power" value="EC" /> : null}
              </div>
              {r.props ? <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">{r.props}</p> : null}
              {r.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{r.desc}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}

      <section className={`${cardCls} mt-6`}>
        <h2 className={`${nameCls} mb-2`}>Weapon Properties</h2>
        <DataTable head={["Code", "Meaning"]} rows={Object.keys(DS_WEAPON_PROPS).map((k) => [k, DS_WEAPON_PROPS[k]])} />
      </section>
    </div>
  );
}
