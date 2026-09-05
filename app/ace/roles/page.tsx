import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_ROLES } from "@/lib/data/ace-roles";
import type { AceRole, AceSettingKey, AceStat } from "@/lib/data/ace-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  nameCls, cardCls, bookBadge, hbBadge, type Query, type RawQuery,
} from "@/components/AceRef";

export const dynamic = "force-dynamic";
const BASE = "/ace/roles";

type Row = AceRole & { homebrew?: boolean };

// A homebrew record's data blob → an AceRole-shaped display row.
function hbToRole(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const statMods = (data.statMods && typeof data.statMods === "object")
    ? (data.statMods as Partial<Record<AceStat, number>>) : undefined;
  return {
    name,
    category: s("category") || "Homebrew",
    setting: (s("setting") || "core") as AceSettingKey,
    ability: s("ability"),
    power: data.power === true,
    grantsFocus: Array.isArray(data.grantsFocus) ? (data.grantsFocus as string[]) : undefined,
    statMods,
    healthBonus: typeof data.healthBonus === "number" ? data.healthBonus : undefined,
    page: 0,
    homebrew: true,
  };
}

function matches(r: Row, q: string, book: string, cat: string): boolean {
  if (book && r.setting !== book) return false;
  if (cat && r.category !== cat) return false;
  if (!q) return true;
  return r.name.toLowerCase().includes(q) || r.ability.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
}

export default async function AceRolesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ace-role" }),
    ownHomebrew(user.id, "ace-role"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => hbToRole(h.data as Record<string, unknown>, h.name));
  const bookRows: Row[] = ACE_ROLES.map((r) => ({ ...r }));
  const ALL: Row[] = [...hbRows, ...bookRows];
  const CATEGORIES = [...new Set(ALL.map((r) => r.category))].map((c) => ({ key: c, label: c }));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const cat = CATEGORIES.some((c) => c.key === one(raw.cat)) ? one(raw.cat) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, cat };
  const results = ALL.filter((r) => matches(r, needle, book, cat)).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const filtered = Boolean(needle || book || cat);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Roles" subtitle={`${ACE_ROLES.length} roles${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · one special ability each`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        Your Role is what makes you <em>you</em> — a cowboy, a robot, a talking dog — and it gives you one
        special ability. Want two Roles? You can, but you only get one of the abilities; the second is
        descriptive. Roles marked <span className="text-[#8ad4ff]">✦ Power</span> come with a Power Stat.
      </p>

      <div className="mb-6">
        <HomebrewEditor kind="ace-role" campaigns={campaigns} initial={hbOwn} />
      </div>

      <SearchForm base={BASE} q={q} placeholder="Search roles or abilities…" hidden={{ book, cat }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Group" base={BASE} current={current} param="cat" options={CATEGORIES} active={cat} />
      <CountLine count={results.length} noun="role" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="role" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((r) => (
            <li key={`${r.homebrew ? "hb" : "bk"}-${r.setting}-${r.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{r.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{r.category}</span>
                {r.power ? <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8ad4ff]">✦ Power</span> : null}
                {r.homebrew ? <span className={hbBadge}>Homebrew</span> : <span className={bookBadge}>{settingName(r.setting)} · p.{r.page}</span>}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{r.ability}</p>
              {(r.grantsFocus || r.statMods || r.healthBonus) ? (
                <p className="mt-2 text-[12px] text-[var(--muted)]">
                  {r.grantsFocus ? <span>Free Focus: {r.grantsFocus.join(", ")}. </span> : null}
                  {r.statMods ? <span>{Object.entries(r.statMods).map(([k, v]) => `${k} ${v > 0 ? "+" : ""}${v}`).join(", ")}. </span> : null}
                  {r.healthBonus ? <span>+{r.healthBonus} Health.</span> : null}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
