import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_ROLES } from "@/lib/data/ace-roles";
import type { AceRole } from "@/lib/data/ace-types";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  nameCls, cardCls, bookBadge, type Query, type RawQuery,
} from "@/components/AceRef";

export const dynamic = "force-dynamic";
const BASE = "/ace/roles";

const CATEGORIES = [...new Set(ACE_ROLES.map((r) => r.category))].map((c) => ({ key: c, label: c }));

function matches(r: AceRole, q: string, book: string, cat: string): boolean {
  if (book && r.setting !== book) return false;
  if (cat && r.category !== cat) return false;
  if (!q) return true;
  return r.name.toLowerCase().includes(q) || r.ability.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
}

export default async function AceRolesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const cat = CATEGORIES.some((c) => c.key === one(raw.cat)) ? one(raw.cat) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, cat };
  const results = ACE_ROLES.filter((r) => matches(r, needle, book, cat));
  const filtered = Boolean(needle || book || cat);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Roles" subtitle={`${ACE_ROLES.length} roles · one special ability each`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        Your Role is what makes you <em>you</em> — a cowboy, a robot, a talking dog — and it gives you one
        special ability. Want two Roles? You can, but you only get one of the abilities; the second is
        descriptive. Roles marked <span className="text-[#8ad4ff]">✦ Power</span> come with a Power Stat.
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search roles or abilities…" hidden={{ book, cat }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Group" base={BASE} current={current} param="cat" options={CATEGORIES} active={cat} />
      <CountLine count={results.length} noun="role" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="role" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((r) => (
            <li key={`${r.setting}-${r.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{r.name}</h2>
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{r.category}</span>
                {r.power ? <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8ad4ff]">✦ Power</span> : null}
                <span className={bookBadge}>{settingName(r.setting)} · p.{r.page}</span>
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
