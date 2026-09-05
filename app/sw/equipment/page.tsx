import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_WEAPONS } from "@/lib/data/sw-weapons";
import { SW_GEAR } from "@/lib/data/sw-gear";
import type { SwWeapon, SwGear, SwBook } from "@/lib/data/sw-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, hbBadge, code, one, BookTag, type Query, type RawQuery } from "@/components/SwRef";

export const dynamic = "force-dynamic";
const BASE = "/sw/equipment";
const SW_BOOKS: SwBook[] = ["core", "sourcebook", "companion"];
const asBook = (v: string): SwBook => (SW_BOOKS.includes(v as SwBook) ? (v as SwBook) : "companion");

type WeaponRow = SwWeapon & { homebrew?: boolean };
type GearRow = SwGear & { homebrew?: boolean };

function hbToWeapon(data: Record<string, unknown>, name: string): WeaponRow {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return {
    name,
    kind: s("kind") || "Blaster",
    damage: typeof data.damage === "number" ? data.damage : null,
    damageText: s("damageText") || undefined,
    range: s("range") || undefined,
    skill: s("skill") || undefined,
    notes: s("notes") || undefined,
    cost: s("cost") || undefined,
    availability: s("availability") || undefined,
    book: asBook(s("book")),
    page: 0,
    homebrew: true,
  };
}

function hbToGear(data: Record<string, unknown>, name: string): GearRow {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  return {
    name,
    category: s("category") || "Misc",
    description: s("description"),
    cost: s("cost") || undefined,
    stats: s("stats") || undefined,
    book: asBook(s("book")),
    page: 0,
    homebrew: true,
  };
}

export default async function SwEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbWeaponsVisible, hbWeaponsOwn, hbGearVisible, hbGearOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "sw-weapon" }),
    ownHomebrew(user.id, "sw-weapon"),
    visibleHomebrew(user.id, { type: "sw-gear" }),
    ownHomebrew(user.id, "sw-gear"),
    userCampaigns(user.id),
  ]);
  const hbWeapons: WeaponRow[] = hbWeaponsVisible.map((h) => hbToWeapon(h.data as Record<string, unknown>, h.name));
  const hbGear: GearRow[] = hbGearVisible.map((h) => hbToGear(h.data as Record<string, unknown>, h.name));
  const ALL_WEAPONS: WeaponRow[] = [...hbWeapons, ...SW_WEAPONS.map((w) => ({ ...w }))];
  const ALL_GEAR: GearRow[] = [...hbGear, ...SW_GEAR.map((g) => ({ ...g }))];
  const hbCount = hbWeapons.length + hbGear.length;

  const WEAPON_KINDS = [...new Set(ALL_WEAPONS.map((w) => w.kind))];
  const GEAR_CATS = [...new Set(ALL_GEAR.map((g) => g.category))];
  const CATS = [...WEAPON_KINDS.map((k) => ({ key: "w:" + k, label: k + " weapons" })), ...GEAR_CATS.map((c) => ({ key: "g:" + c, label: c }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const cat = CATS.some((c) => c.key === one(raw.cat)) ? one(raw.cat) : "";
  const current: Query = { q, cat };
  const weapons = ALL_WEAPONS.filter((w) => (!cat || cat === "w:" + w.kind) && (!needle || [w.name, w.kind, w.notes ?? "", w.skill ?? "", w.damageText ?? ""].join(" ").toLowerCase().includes(needle)));
  const gear = ALL_GEAR.filter((g) => (!cat || cat === "g:" + g.category) && (!needle || [g.name, g.category, g.description, g.stats ?? ""].join(" ").toLowerCase().includes(needle)));
  const count = weapons.length + gear.length;
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <SwHeader title="Weapons & Equipment" subtitle={`${SW_WEAPONS.length} weapons · ${SW_GEAR.length} items of gear${hbCount ? ` + ${hbCount} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Ranges are short/medium/long in meters (Easy / Moderate / Difficult to hit; point-blank under 3 m is Very Easy). Damage is rolled against the target&rsquo;s Strength plus armor. Melee weapons add to the wielder&rsquo;s Strength. <span className="text-[var(--sw)]">RC</span> marks Rules Companion entries.</p>
      <div className="mb-6 flex flex-col gap-6">
        <HomebrewEditor kind="sw-weapon" campaigns={campaigns} initial={hbWeaponsOwn} />
        <HomebrewEditor kind="sw-gear" campaigns={campaigns} initial={hbGearOwn} />
      </div>
      <SearchForm base={BASE} q={q} placeholder="Search weapons & gear…" hidden={{ cat }} />
      <ChipRow label="Type" base={BASE} current={current} param="cat" options={CATS} active={cat} />
      <CountLine count={count} noun="item" base={BASE} filtered={Boolean(needle || cat)} />
      {count === 0 ? <EmptyState noun="item" base={BASE} /> : null}
      {WEAPON_KINDS.filter((k) => weapons.some((w) => w.kind === k)).map((k) => (
        <section key={k} className={`${cardCls} mb-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0c020]">{k} weapons</h2>
          <div className="mt-2 overflow-x-auto"><table className="w-full text-[12px]">
            <thead><tr className="text-left text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]"><th className="py-1 pr-3">Weapon</th><th className="py-1 pr-3">Damage</th><th className="py-1 pr-3">Range</th><th className="py-1 pr-3">Skill</th><th className="py-1 pr-3">Notes</th><th className="py-1">Cost</th></tr></thead>
            <tbody>{weapons.filter((w) => w.kind === k).map((w) => <tr key={`${w.homebrew ? "hb" : "bk"}-${w.name}-${w.book}`} className="border-t border-[var(--border)] align-top"><td className="py-1.5 pr-3 font-semibold text-[var(--text)]">{w.name}{w.homebrew ? <span className={`${hbBadge} ml-2`}>Homebrew</span> : <BookTag book={w.book} />}</td><td className="py-1.5 pr-3 whitespace-nowrap font-mono text-[#f0c020]">{w.damageText ?? code(w.damage)}</td><td className="py-1.5 pr-3 whitespace-nowrap font-mono text-[var(--muted)]">{w.range ?? ""}</td><td className="py-1.5 pr-3 text-[var(--muted)]">{w.skill ?? ""}</td><td className="py-1.5 pr-3 text-[var(--muted)]">{[w.notes, w.availability].filter(Boolean).join(" · ")}</td><td className="py-1.5 whitespace-nowrap text-[var(--muted)]">{w.cost ?? ""}</td></tr>)}</tbody>
          </table></div>
        </section>
      ))}
      {GEAR_CATS.filter((c) => gear.some((g) => g.category === c)).map((c) => (
        <section key={c} className={`${cardCls} mb-4`}>
          <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0c020]">{c}</h2>
          <div className="mt-2 overflow-x-auto"><table className="w-full text-[12px]">
            <thead><tr className="text-left text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]"><th className="py-1 pr-3">Item</th><th className="py-1 pr-3">Stats</th><th className="py-1 pr-3">Description</th><th className="py-1">Cost</th></tr></thead>
            <tbody>{gear.filter((g) => g.category === c).map((g) => <tr key={`${g.homebrew ? "hb" : "bk"}-${g.name}-${g.book}`} className="border-t border-[var(--border)] align-top"><td className="py-1.5 pr-3 font-semibold text-[var(--text)]">{g.name}{g.homebrew ? <span className={`${hbBadge} ml-2`}>Homebrew</span> : <BookTag book={g.book} />}</td><td className="py-1.5 pr-3 font-mono text-[#f0c020]">{g.stats ?? ""}</td><td className="py-1.5 pr-3 text-[var(--muted)]">{g.description}</td><td className="py-1.5 whitespace-nowrap text-[var(--muted)]">{g.cost ?? ""}</td></tr>)}</tbody>
          </table></div>
        </section>
      ))}
    </div>
  );
}
