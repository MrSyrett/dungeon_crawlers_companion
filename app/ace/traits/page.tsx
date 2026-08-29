import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_TRAITS } from "@/lib/data/ace-traits";
import type { AceTrait } from "@/lib/data/ace-types";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  cardCls, bookBadge, type Query, type RawQuery,
} from "@/components/AceRef";

export const dynamic = "force-dynamic";
const BASE = "/ace/traits";

function matches(t: AceTrait, q: string, book: string): boolean {
  if (book && t.setting !== book) return false;
  if (!q) return true;
  return t.name.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q);
}

export default async function AceTraitsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book };
  const results = ACE_TRAITS.filter((t) => matches(t, needle, book)).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const filtered = Boolean(needle || book);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Traits" subtitle={`${ACE_TRAITS.length} traits · one complication each`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        While your Role gives you an ability, your Trait introduces a complication. It&rsquo;s always an
        adjective, your Role is always a noun — a <em>Squeamish Scientist</em>, a <em>Paranoid Robot</em>.
        Every time you take a significant action that reflects your Trait, the Director may award a Karma
        point (up to 10). No two Heroes in a group should have the same Trait.
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search traits…" hidden={{ book }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS.filter((b) => ACE_TRAITS.some((t) => t.setting === b.key))} active={book} />
      <CountLine count={results.length} noun="trait" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="trait" base={BASE} />
      ) : (
        <ul className="grid grid-cols-2 items-start gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((t) => (
            <li key={`${t.setting}-${t.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h2 className="text-[15px] font-bold uppercase tracking-[0.1em] text-[#8ad4ff]">{t.name}</h2>
                {t.setting !== "core" ? <span className={bookBadge}>{settingName(t.setting)}</span> : null}
              </div>
              {t.description ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{t.description}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
