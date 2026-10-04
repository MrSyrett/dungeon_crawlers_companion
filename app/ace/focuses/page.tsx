import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_FOCUSES } from "@/lib/data/ace-focuses";
import type { AceFocus, AceStat, AceSettingKey } from "@/lib/data/ace-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  cardCls, bookBadge, hbBadge, type Query, type RawQuery,
} from "@/components/AceRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/ace/focuses";

type Row = AceFocus & { homebrew?: boolean };

const STATS: { key: AceStat; label: string; blurb: string }[] = [
  { key: "Smarts", label: "Smarts", blurb: "Clever, perceptive, knowledgeable — crack a cypher, remember a fact, spot a trap." },
  { key: "Moves", label: "Moves", blurb: "Quick, accurate, agile — win a race, shoot a pistol, ride a horse. Moves × 3 is your Defence." },
  { key: "Style", label: "Style", blurb: "Cool, stylish, charismatic — trick a guard, seduce a villain, sing a song." },
  { key: "Brawn", label: "Brawn", blurb: "Strong and tough — hit things, lift things, take a punch. Brawn is your Health." },
  { key: "Power", label: "Power", blurb: "Magic, psionics, the Force — only if your Role says so. Every use costs a Karma point." },
];
const STAT_KEYS = STATS.map((s) => s.key) as string[];

function hbToFocus(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const stat = (STAT_KEYS.includes(s("stat")) ? s("stat") : "Smarts") as AceStat;
  return { name, stat, setting: (s("setting") || "core") as AceSettingKey, note: s("note") || undefined, homebrew: true };
}

export default async function AceFocusesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ace-focus" }),
    ownHomebrew(user.id, "ace-focus"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToFocus(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...ACE_FOCUSES.map((f) => ({ ...f }))];

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const stat = STATS.some((s) => s.key === one(raw.stat)) ? one(raw.stat) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, stat };
  const filtered = Boolean(needle || book || stat);

  // Every focus is rendered; the chips filter on the client (InstantFilter).
  // `show` applies the URL's filters for the initial paint, through the same
  // facet match the client uses. Each stat section carries data-section, so it
  // hides itself once all of its focuses are hidden.
  const list = ALL;
  const facets = (f: Row) => ({ book: f.setting, stat: f.stat });
  const show = (f: Row) => facetMatch(facets(f), current) && (!needle || f.name.toLowerCase().includes(needle) || (f.note ?? "").toLowerCase().includes(needle));
  const shown = list.filter(show).length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Stats & Focuses" subtitle={`${ACE_FOCUSES.length} focuses${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} across five stats`} />

      <div className="mb-6">
        <HomebrewEditor kind="ace-focus" campaigns={campaigns} initial={hbOwn} />
      </div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search focuses…" hidden={{ book, stat }} />
      <ChipRow label="Stat" base={BASE} current={current} param="stat" options={STATS.map((s) => ({ key: s.key, label: s.label }))} active={stat} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <CountLine count={shown} noun="focus" base={BASE} filtered={filtered} />
      <EmptyState noun="focus" base={BASE} hidden={shown > 0} />
        <div className="flex flex-col gap-4">
          {STATS.map((s) => (
            <section key={s.key} className={cardCls} data-section hidden={!list.some((f) => f.stat === s.key && show(f))}>
              <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#8ad4ff]">{s.label}</h2>
              <p className="mt-1 text-[12px] text-[var(--muted)]">{s.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {list.filter((f) => f.stat === s.key).map((f) => (
                  <li
                    key={`${f.homebrew ? "hb" : "bk"}-${f.setting}-${f.name}`}
                    className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5 text-[13px] text-[var(--text)]"
                    title={f.note ?? ""}
                    hidden={!show(f)}
                    data-f={facetAttr(facets(f))}
                  >
                    {f.name}
                    {f.note ? <span className="ml-2 text-[11px] text-[var(--muted)]">{f.note}</span> : null}
                    {f.homebrew ? <span className={`ml-2 ${hbBadge}`}>HB</span> : f.setting !== "core" ? <span className={`ml-2 ${bookBadge}`}>{settingName(f.setting)}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </InstantFilter>
    </div>
  );
}
