import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NIMBLE_ITEMS } from "@/lib/data/nimble-items";
import { NIMBLE_TABLES } from "@/lib/data/nimble-tables";
import type { NimbleItem } from "@/lib/data/nimble-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { NimbleHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, hbBadge, one, type Query, type RawQuery } from "@/components/NimbleRef";

export const dynamic = "force-dynamic";
const BASE = "/nimble/equipment";

type ItemRow = NimbleItem & { homebrew?: boolean };

// A homebrew record's data blob → a NimbleItem-shaped display row.
function hbToItem(data: Record<string, unknown>, name: string): ItemRow {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return {
    name,
    category: s("category") || "Adventuring Gear",
    armor: s("armor") || undefined,
    damage: s("damage") || undefined,
    properties: s("properties") || undefined,
    cost: s("cost") || undefined,
    rarity: s("rarity") || undefined,
    description: s("description") || undefined,
    page: 0,
    homebrew: true,
  };
}

export default async function NimbleEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "nimble-item" }),
    ownHomebrew(user.id, "nimble-item"),
    userCampaigns(user.id),
  ]);
  const hbRows: ItemRow[] = hbVisible.map((h) => hbToItem(h.data as Record<string, unknown>, h.name));
  const ALL: ItemRow[] = [...hbRows, ...NIMBLE_ITEMS.map((i) => ({ ...i }))];
  const CATS = [...new Set(ALL.map((i) => i.category))].map((c) => ({ key: c, label: c }));

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const cat = CATS.some((c) => c.key === one(raw.cat)) ? one(raw.cat) : "";
  const current: Query = { q, cat };
  const results = ALL.filter((i) => (!cat || i.category === cat) && (!needle || [i.name, i.description ?? "", i.properties ?? "", i.damage ?? ""].join(" ").toLowerCase().includes(needle)));
  const groups = CATS.filter((c) => results.some((i) => i.category === c.key));
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <NimbleHeader title="Equipment" subtitle={`${NIMBLE_ITEMS.length} items${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · armor, weapons, gear & magic`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Heroes can use any equipment; without proficiency a weapon can&rsquo;t crit and Defending in armor costs an extra action. Armor replaces your DEX-based value; shields add to it.</p>
      <div className="mb-6"><HomebrewEditor kind="nimble-item" campaigns={campaigns} initial={hbOwn} /></div>
      <details className="mb-5 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.15em] text-[#9fe3bd]">Weapon properties</summary><ul className="mt-2 grid gap-1 md:grid-cols-2">{NIMBLE_TABLES.weaponProperties.map((p) => <li key={p.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{p.name}.</span> {p.text}</li>)}</ul></details>
      <SearchForm base={BASE} q={q} placeholder="Search equipment…" hidden={{ cat }} />
      <ChipRow label="Type" base={BASE} current={current} param="cat" options={CATS} active={cat} />
      <CountLine count={results.length} noun="item" base={BASE} filtered={Boolean(needle || cat)} />
      {results.length === 0 ? <EmptyState noun="item" base={BASE} /> : groups.map((g) => (
        <section key={g.key} className={`${cardCls} mb-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">{g.label}</h2>
          <div className="mt-2 overflow-x-auto"><table className="w-full text-[12px]">
            <thead><tr className="text-left text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]"><th className="py-1 pr-3">Item</th><th className="py-1 pr-3">{/Weapon/.test(g.key) ? "Damage" : /Cloth|Leather|Mail|Plate|Shield/.test(g.key) ? "Armor" : "Rarity"}</th><th className="py-1 pr-3">Properties / description</th><th className="py-1">Cost</th></tr></thead>
            <tbody>{results.filter((i) => i.category === g.key).map((i) => <tr key={`${i.homebrew ? "hb" : "bk"}-${i.name}`} className="border-t border-[var(--border)] align-top"><td className="py-1.5 pr-3 font-semibold text-[var(--text)]">{i.name}{i.homebrew ? <span className={`${hbBadge} ml-2`}>Homebrew</span> : null}</td><td className="py-1.5 pr-3 font-mono text-[#9fe3bd]">{i.damage ?? i.armor ?? i.rarity ?? ""}</td><td className="py-1.5 pr-3 text-[var(--muted)]">{[i.properties, i.description].filter(Boolean).join(" — ")}</td><td className="py-1.5 whitespace-nowrap text-[var(--muted)]">{i.cost ?? ""}</td></tr>)}</tbody>
          </table></div>
        </section>
      ))}
    </div>
  );
}
