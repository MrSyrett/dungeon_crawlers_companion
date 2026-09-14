import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_GEAR, type DsGear } from "@/lib/data/darkspace-ref-data";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  DarkSpaceHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  one, type Query, type RawQuery,
} from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/gear";

type Row = DsGear & { homebrew?: boolean };

const CATS = [
  { key: "weapon", label: "Weapons" },
  { key: "armor", label: "Armor & Deflectors" },
  { key: "ammo", label: "Ammo" },
  { key: "basic", label: "Adventuring Gear" },
];

function hbToGear(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const cat = s("category");
  const row: Row = { name, category: cat || "basic", cost: s("cost") || "—", desc: s("desc"), homebrew: true };
  if (s("qty")) row.qty = s("qty");
  return row;
}

export default async function Page({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-gear" }),
    ownHomebrew(user.id, "ds-gear"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToGear(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...DS_GEAR.map((g) => ({ ...g }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const cat = CATS.some((c) => c.key === one(raw.cat)) ? one(raw.cat) : "";
  const current: Query = { q, cat };
  const results = ALL.filter((g) =>
    (!cat || g.category === cat) &&
    (!needle || [g.name, g.desc, g.cost].join(" ").toLowerCase().includes(needle)),
  );
  const filtered = Boolean(needle || cat);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Gear" subtitle={`DarkSpace · Equipment${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="ds-gear" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search gear…" hidden={{ cat }} />
      <ChipRow label="Category" base={BASE} current={current} param="cat" options={CATS} active={cat} />
      <CountLine count={results.length} noun="item" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="item" base={BASE} />
      ) : (
        CATS.map((c) => {
          const items = results.filter((g) => g.category === c.key);
          if (!items.length) return null;
          return (
            <section key={c.key} className="mb-6">
              <h2 className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#24c3d6]">{c.label}</h2>
              <div className="space-y-2">
                {items.map((g) => (
                  <div key={(g.homebrew ? "hb-" : "bk-") + g.name} className={cardCls}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={nameCls}>{g.name}</span>
                      {g.qty ? <span className={badge}>×{g.qty}</span> : null}
                      {g.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                      <span className="ml-auto text-[12px] font-semibold text-[var(--muted)]">{g.cost}</span>
                    </div>
                    {g.desc ? <p className="mt-1 text-[13px] text-[var(--muted)]">{g.desc}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
