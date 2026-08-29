import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ACE_EXTRAS } from "@/lib/data/ace-extras";
import type { AceExtra } from "@/lib/data/ace-types";
import {
  AceHeader, SearchForm, ChipRow, CountLine, EmptyState, BOOKS, settingName, one,
  nameCls, cardCls, bookBadge, type Query, type RawQuery,
} from "@/components/AceRef";

export const dynamic = "force-dynamic";
const BASE = "/ace/extras";

const TYPES = [...new Set(ACE_EXTRAS.map((e) => e.type))].sort().map((t) => ({ key: t, label: t }));

function matches(e: AceExtra, q: string, book: string, type: string): boolean {
  if (book && e.setting !== book) return false;
  if (type && e.type !== type) return false;
  if (!q) return true;
  const hay = [e.name, e.type, e.description ?? "", ...e.notes, ...e.attacks.map((a) => a.name)].join(" ").toLowerCase();
  return hay.includes(q);
}

function Stat({ label, value, focus }: { label: string; value: number | null | undefined; focus?: { name: string; dice?: number }[] }) {
  return (
    <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1.5">
      <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">{label}</div>
      <div className="font-mono text-lg font-bold text-[var(--text)]">{value == null ? "—" : value}</div>
      {focus && focus.length ? (
        <div className="text-[10px] leading-tight text-[#8ad4ff]">{focus.map((f) => f.name + (f.dice ? ` ${f.dice}` : "")).join(", ")}</div>
      ) : null}
    </div>
  );
}

export default async function AceExtrasPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const book = BOOKS.some((b) => b.key === one(raw.book)) ? one(raw.book) : "";
  const type = TYPES.some((t) => t.key === one(raw.type)) ? one(raw.type) : "";
  const needle = q.toLowerCase();
  const current: Query = { q, book, type };
  const results = ACE_EXTRAS.filter((e) => matches(e, needle, book, type));
  const filtered = Boolean(needle || book || type);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <AceHeader title="Extras" subtitle={`${ACE_EXTRAS.length} mooks, monsters & villains`} />
      <p className="mb-5 text-sm leading-relaxed text-[var(--muted)]">
        Everyone the Director plays is an Extra. A Mook has 1 Health and goes down to a single punch; a
        Tyrannosaur has Brawn 10 and twenty. Attack lines read <em>Name dice (damage)</em> — the Extra rolls
        that many d6 against a Hero&rsquo;s Defence.
      </p>
      <SearchForm base={BASE} q={q} placeholder="Search extras…" hidden={{ book, type }} />
      <ChipRow label="Book" base={BASE} current={current} param="book" options={BOOKS} active={book} />
      <ChipRow label="Type" base={BASE} current={current} param="type" options={TYPES} active={type} />
      <CountLine count={results.length} noun="extra" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="extra" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((e) => {
            const fo = (stat: string) => e.focuses.filter((f) => f.stat === stat);
            return (
              <li key={`${e.setting}-${e.name}-${e.page}`} className={cardCls}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className={nameCls}>{e.name}</h2>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{e.type}</span>
                  <span className={bookBadge}>{settingName(e.setting)} · p.{e.page}</span>
                </div>
                {e.description ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{e.description}</p> : null}
                <div className={`mt-3 grid gap-1.5 ${e.power != null ? "grid-cols-5" : "grid-cols-4"}`}>
                  <Stat label="Smarts" value={e.smarts} focus={fo("Smarts")} />
                  <Stat label="Moves" value={e.moves} focus={fo("Moves")} />
                  <Stat label="Style" value={e.style} focus={fo("Style")} />
                  <Stat label="Brawn" value={e.brawn} focus={fo("Brawn")} />
                  {e.power != null ? <Stat label="Power" value={e.power} focus={fo("Power")} /> : null}
                </div>
                <div className="mt-2 flex gap-4 text-[12px] text-[var(--text)]">
                  <span>Health <b className="font-mono">{e.health ?? "—"}</b></span>
                  <span>Defence <b className="font-mono">{e.defence ?? "—"}</b></span>
                </div>
                {e.attacks.length ? (
                  <ul className="mt-2 flex flex-col gap-0.5">
                    {e.attacks.map((a, i) => (
                      <li key={i} className="text-[13px] text-[var(--text)]">
                        <span className="font-semibold">{a.name}</span>
                        {a.dice != null ? <span className="font-mono"> {a.dice}</span> : null}
                        {a.damage != null ? <span className="text-[var(--muted)]"> ({a.damage} damage{a.note ? `, ${a.note}` : ""})</span> : a.note ? <span className="text-[var(--muted)]"> ({a.note})</span> : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {e.notes.length ? (
                  <ul className="mt-2 flex flex-col gap-1">
                    {e.notes.map((n, i) => (
                      <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-[var(--muted)]">
                        <span className="mt-[2px] shrink-0 text-[var(--ace)]">▸</span><span>{n}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
