import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_GEAR } from "@/lib/data/ace-gear";
import { ACE_TABLES } from "@/lib/data/ace-tables";
import type { AceGear, AceGearTier, AceSettingKey } from "@/lib/data/ace-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  nameCls, cardCls, bookBadge, hbBadge, type Query, type RawQuery,
} from "@/components/AceRef";

export const dynamic = "force-dynamic";
const BASE = "/ace/gear";

type Row = AceGear & { homebrew?: boolean };

const GEAR_TIERS: AceGearTier[] = ["Free", "Normal", "Hard", "Herculean", "Impossible"];
const TIERS = GEAR_TIERS.map((t) => ({ key: t, label: t }));

function hbToGear(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const n = (k: string) => (typeof data[k] === "number" ? (data[k] as number) : undefined);
  const tier = (GEAR_TIERS.includes(s("tier") as AceGearTier) ? s("tier") : "Normal") as AceGearTier;
  return {
    name, setting: (s("setting") || "core") as AceSettingKey, tier,
    tn: n("tn") ?? null, category: s("category") || "Gadget",
    description: s("description"), damage: n("damage"), defence: n("defence"),
    page: 0, homebrew: true,
  };
}

function matches(g: Row, q: string, book: string, tier: string, cat: string): boolean {
  if (book && g.setting !== book) return false;
  if (tier && g.tier !== tier) return false;
  if (cat && g.category !== cat) return false;
  if (!q) return true;
  return g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.category.toLowerCase().includes(q);
}

export default async function AceGearPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ace-gear" }),
    ownHomebrew(user.id, "ace-gear"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToGear(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...ACE_GEAR.map((g) => ({ ...g }))];
  const CATEGORIES = [...new Set(ALL.map((g) => g.category))].sort().map((c) => ({ key: c, label: c }));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const tier = TIERS.some((t) => t.key === one(raw.tier)) ? one(raw.tier) : "";
  const cat = CATEGORIES.some((c) => c.key === one(raw.cat)) ? one(raw.cat) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, tier, cat };
  const results = ALL.filter((g) => matches(g, needle, book, tier, cat));
  const filtered = Boolean(needle || book || tier || cat);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Gear" subtitle={`${ACE_GEAR.length} items${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · money isn't tracked`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        You have all the regular stuff your Role would suggest. To buy something special, spend a Karma
        point and roll Style (the Wealth Focus shines here) against the item&rsquo;s value.
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
              <th className="px-3 py-2">Amount</th><th className="px-3 py-2">Target</th><th className="px-3 py-2">Examples</th>
            </tr>
          </thead>
          <tbody>
            {ACE_TABLES.purchase.map((p) => (
              <tr key={p.amount} className="border-t border-[var(--border)]">
                <td className="px-3 py-1.5 text-[var(--text)]">{p.amount}</td>
                <td className="px-3 py-1.5 font-mono text-[#8ad4ff]">{p.tn ?? "—"}</td>
                <td className="px-3 py-1.5 text-[var(--muted)]">{p.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-6">
        <HomebrewEditor kind="ace-gear" campaigns={campaigns} initial={hbOwn} />
      </div>

      <SearchForm base={BASE} q={q} placeholder="Search gear…" hidden={{ book, tier, cat }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Cost" base={BASE} current={current} param="tier" options={TIERS} active={tier} />
      <ChipRow label="Type" base={BASE} current={current} param="cat" options={CATEGORIES} active={cat} />
      <CountLine count={results.length} noun="item" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="item" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((g) => (
            <li key={`${g.homebrew ? "hb" : "bk"}-${g.setting}-${g.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{g.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {g.category} · {g.tier}{g.tn ? ` (TN ${g.tn})` : ""}
                  {g.damage ? ` · ${g.damage} damage` : ""}{g.defence ? ` · +${g.defence} Defence` : ""}
                </span>
                {g.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={bookBadge}>{settingName(g.setting)} · p.{g.page}</span>}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{g.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
