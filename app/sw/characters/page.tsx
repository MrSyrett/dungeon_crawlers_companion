import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_CHARACTERS } from "@/lib/data/sw-characters";
import { SW_ATTRIBUTES, type SwCharacter, type SwAttribute, type SwBook } from "@/lib/data/sw-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, code, one, BookTag, BOOK_NAME, type Query, type RawQuery } from "@/components/SwRef";

export const dynamic = "force-dynamic";
const BASE = "/sw/characters";
const SW_BOOKS: SwBook[] = ["core", "sourcebook", "companion"];

type Row = SwCharacter & { homebrew?: boolean };

// A homebrew record's data blob → a SwCharacter-shaped display row.
function hbToCharacter(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const attrsIn = data.attributes && typeof data.attributes === "object" ? (data.attributes as Record<string, unknown>) : {};
  const attributes: Partial<Record<SwAttribute, number>> = {};
  for (const a of SW_ATTRIBUTES) if (typeof attrsIn[a] === "number") attributes[a] = attrsIn[a] as number;
  const skills = (Array.isArray(data.skills) ? data.skills : []).filter((x): x is string => typeof x === "string");
  const equipment = (Array.isArray(data.equipment) ? data.equipment : []).filter((x): x is string => typeof x === "string");
  return {
    name,
    group: s("group") || "Homebrew",
    description: s("description") || undefined,
    attributes,
    skills,
    equipment,
    move: s("move") || undefined,
    notes: s("notes") || undefined,
    book: (SW_BOOKS.includes(s("book") as SwBook) ? s("book") : "companion") as SwBook,
    page: 0,
    homebrew: true,
  };
}

export default async function SwCharactersPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "sw-character" }),
    ownHomebrew(user.id, "sw-character"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToCharacter(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...SW_CHARACTERS.map((c) => ({ ...c }))];
  const GROUPS = [...new Set(ALL.map((c) => c.group))].map((g) => ({ key: g, label: g }));

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const group = GROUPS.some((g) => g.key === one(raw.group)) ? one(raw.group) : "";
  const current: Query = { q, group };
  const results = ALL.filter((c) => (!group || c.group === group) && (!needle || [c.name, c.group, c.description ?? "", c.skills.join(" "), c.equipment.join(" "), c.notes ?? ""].join(" ").toLowerCase().includes(needle)));
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <SwHeader title="Bestiary" subtitle={`${SW_CHARACTERS.length} stat blocks${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · Imperials, aliens, Droids, creatures, heroes & villains`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Stock Imperials, civilians, Droids and creatures from the rulebook and its adventures, plus the Sourcebook&rsquo;s alien species (the typical member — add 6D to make a player character), creatures, stormtrooper variants and the heroes and villains of the films. Anything without a listed skill uses its attribute; a &ldquo;standard&rdquo; block is the GM&rsquo;s baseline for anyone the players meet.</p>
      <div className="mb-6"><HomebrewEditor kind="sw-character" campaigns={campaigns} initial={hbOwn} /></div>
      <SearchForm base={BASE} q={q} placeholder="Search characters…" hidden={{ group }} />
      <ChipRow label="Group" base={BASE} current={current} param="group" options={GROUPS} active={group} />
      <CountLine count={results.length} noun="character" base={BASE} filtered={Boolean(needle || group)} />
      {results.length === 0 ? <EmptyState noun="character" base={BASE} /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((c) => (
            <article key={`${c.homebrew ? "hb" : "bk"}-${c.name}-${c.book}-${c.page}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className={nameCls}>{c.name}{c.homebrew ? null : <BookTag book={c.book} />}</h2>{c.homebrew ? <span className={hbBadge}>Homebrew · {c.group}</span> : <span className={badge}>{c.group} · p.{c.page}</span>}</div>
              {c.description ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{c.description}</p> : null}
              <div className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-6">{SW_ATTRIBUTES.map((a) => <div key={a} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1.5 text-center"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a.slice(0, 4)}</div><div className="font-mono text-[13px] text-[#f0c020]">{c.attributes[a] == null ? "—" : code(c.attributes[a])}</div></div>)}</div>
              {c.skills.length ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Skills.</span> {c.skills.join(", ")}</p> : null}
              {c.equipment.length ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Equipment.</span> {c.equipment.join(", ")}</p> : null}
              {c.move ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Move.</span> {c.move}</p> : null}
              {c.notes ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{c.notes}</p> : null}
              {c.superseded ? <details className="mt-2"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">{BOOK_NAME[c.superseded.book]} version (p.{c.superseded.page})</summary><p className="mt-1 text-[11px] text-[var(--muted)]">{SW_ATTRIBUTES.map((a) => c.superseded?.attributes[a] == null ? null : `${a.slice(0, 3)} ${code(c.superseded.attributes[a])}`).filter(Boolean).join(" · ")}</p>{c.superseded.skills.length ? <p className="mt-1 text-[11px] text-[var(--muted)]">{c.superseded.skills.join(", ")}</p> : null}</details> : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
