import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_FOCUSES } from "@/lib/data/ace-focuses";
import type { AceFocus, AceStat } from "@/lib/data/ace-types";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  cardCls, bookBadge, type Query, type RawQuery,
} from "@/components/AceRef";

export const dynamic = "force-dynamic";
const BASE = "/ace/focuses";

const STATS: { key: AceStat; label: string; blurb: string }[] = [
  { key: "Smarts", label: "Smarts", blurb: "Clever, perceptive, knowledgeable — crack a cypher, remember a fact, spot a trap." },
  { key: "Moves", label: "Moves", blurb: "Quick, accurate, agile — win a race, shoot a pistol, ride a horse. Moves × 3 is your Defence." },
  { key: "Style", label: "Style", blurb: "Cool, stylish, charismatic — trick a guard, seduce a villain, sing a song." },
  { key: "Brawn", label: "Brawn", blurb: "Strong and tough — hit things, lift things, take a punch. Brawn is your Health." },
  { key: "Power", label: "Power", blurb: "Magic, psionics, the Force — only if your Role says so. Every use costs a Karma point." },
];

function matches(f: AceFocus, q: string, book: string, stat: string): boolean {
  if (book && f.setting !== book) return false;
  if (stat && f.stat !== stat) return false;
  if (!q) return true;
  return f.name.toLowerCase().includes(q) || (f.note ?? "").toLowerCase().includes(q);
}

export default async function AceFocusesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const stat = STATS.some((s) => s.key === one(raw.stat)) ? one(raw.stat) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, stat };
  const results = ACE_FOCUSES.filter((f) => matches(f, needle, book, stat));
  const filtered = Boolean(needle || book || stat);
  const groups = STATS.filter((s) => results.some((f) => f.stat === s.key));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Stats & Focuses" subtitle={`${ACE_FOCUSES.length} focuses across five stats`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        Roll a number of six-sided dice equal to your Stat. For each Stat you have one Focus — an area of
        expertise — and when it applies you roll <strong className="text-[var(--text)]">two extra dice</strong>.
        Sixes explode. Want a Focus that isn&rsquo;t listed? Ask the Director; they might say yes.
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search focuses…" hidden={{ book, stat }} />
      <ChipRow label="Stat" base={BASE} current={current} param="stat" options={STATS.map((s) => ({ key: s.key, label: s.label }))} active={stat} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <CountLine count={results.length} noun="focus" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="focus" base={BASE} />
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map((s) => (
            <section key={s.key} className={cardCls}>
              <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#8ad4ff]">{s.label}</h2>
              <p className="mt-1 text-[12px] text-[var(--muted)]">{s.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {results.filter((f) => f.stat === s.key).map((f) => (
                  <li
                    key={`${f.setting}-${f.name}`}
                    className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-1.5 text-[13px] text-[var(--text)]"
                    title={f.note ?? ""}
                  >
                    {f.name}
                    {f.note ? <span className="ml-2 text-[11px] text-[var(--muted)]">{f.note}</span> : null}
                    {f.setting !== "core" ? <span className={`ml-2 ${bookBadge}`}>{settingName(f.setting)}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
