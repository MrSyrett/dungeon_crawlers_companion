import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_CHARACTERS } from "@/lib/data/sw-characters";
import { SW_ATTRIBUTES, type SwCharacter, type SwAttribute, type SwBook } from "@/lib/data/sw-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, code, one, withParams, BookTag, BOOK_NAME, type Query, type RawQuery } from "@/components/SwRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

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

// The card's full content, lifted out of the list unchanged so `?m=<name>` can
// render one stat block on its own.
function StatBlock({ x }: { x: Row }) {
  return (
    <div className={cardCls}>
      <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className={nameCls}>{x.name}{x.homebrew ? null : <BookTag book={x.book} />}</h2>{x.homebrew ? <span className={hbBadge}>Homebrew · {x.group}</span> : <span className={badge}>{x.group} · p.{x.page}</span>}</div>
      {x.description ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{x.description}</p> : null}
      <div className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-6">{SW_ATTRIBUTES.map((a) => <div key={a} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1.5 text-center"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a.slice(0, 4)}</div><div className="font-mono text-[13px] text-[var(--sys-link)]">{x.attributes[a] == null ? "—" : code(x.attributes[a])}</div></div>)}</div>
      {x.skills.length ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Skills.</span> {x.skills.join(", ")}</p> : null}
      {x.equipment.length ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Equipment.</span> {x.equipment.join(", ")}</p> : null}
      {x.move ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Move.</span> {x.move}</p> : null}
      {x.notes ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{x.notes}</p> : null}
      {x.superseded ? <details className="mt-2"><summary className="cursor-pointer text-[10px] uppercase tracking-[0.12em] text-[var(--sw)]">{BOOK_NAME[x.superseded.book]} version (p.{x.superseded.page})</summary><p className="mt-1 text-[11px] text-[var(--muted)]">{SW_ATTRIBUTES.map((a) => x.superseded?.attributes[a] == null ? null : `${a.slice(0, 3)} ${code(x.superseded.attributes[a])}`).filter(Boolean).join(" · ")}</p>{x.superseded.skills.length ? <p className="mt-1 text-[11px] text-[var(--muted)]">{x.superseded.skills.join(", ")}</p> : null}</details> : null}
    </div>
  );
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
  const pick = one(raw.m);
  const current: Query = { q, group };

  // An unknown ?m= falls through to the list rather than rendering nothing.
  const selected = pick ? ALL.find((x) => x.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <SwHeader title="Bestiary" subtitle={`${SW_CHARACTERS.length} stat blocks${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · Imperials, aliens, Droids, creatures, heroes & villains`} />
        <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:underline">← All characters</a>
        <StatBlock x={selected} />
      </div>
    );
  }

  // Every stat block is rendered; the Group chip and the search filter on the
  // client (InstantFilter). `show` applies the URL's filters for the initial
  // paint, through the same facet match the client uses.
  const results = ALL;
  const facets = (c: Row) => ({ group: c.group });
  const show = (c: Row) => facetMatch(facets(c), current) && (!needle || [c.name, c.group, c.description ?? "", c.skills.join(" "), c.equipment.join(" "), c.notes ?? ""].join(" ").toLowerCase().includes(needle));
  const shown = results.filter(show).length;
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <SwHeader title="Bestiary" subtitle={`${SW_CHARACTERS.length} stat blocks${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · Imperials, aliens, Droids, creatures, heroes & villains`} />
      <div className="mb-6"><HomebrewEditor kind="sw-character" campaigns={campaigns} initial={hbOwn} /></div>
      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search characters…" hidden={{ group }} />
      <ChipRow label="Group" base={BASE} current={current} param="group" options={GROUPS} active={group} />
      <CountLine count={shown} noun="character" base={BASE} filtered={Boolean(needle || group)} />
      <EmptyState noun="character" base={BASE} hidden={shown > 0} />
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((c) => (
          <article key={`${c.homebrew ? "hb" : "bk"}-${c.name}-${c.book}-${c.page}`} className={cardCls} hidden={!show(c)} data-f={facetAttr(facets(c))} data-s={[c.skills.join(" "), c.equipment.join(" "), c.notes ?? ""].join(" ")}>
            <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className={nameCls}><a href={withParams(BASE, {}, { m: c.name })} className={`${nameCls} hover:underline`}>{c.name}</a>{c.homebrew ? null : <BookTag book={c.book} />}</h2>{c.homebrew ? <span className={hbBadge}>Homebrew · {c.group}</span> : <span className={badge}>{c.group} · p.{c.page}</span>}</div>
            {c.description ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{c.description}</p> : null}
            <div className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-6">{SW_ATTRIBUTES.map((a) => <div key={a} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1.5 text-center"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a.slice(0, 4)}</div><div className="font-mono text-[13px] text-[var(--sys-link)]">{c.attributes[a] == null ? "—" : code(c.attributes[a])}</div></div>)}</div>
          </article>
        ))}
      </div>
      </InstantFilter>
    </div>
  );
}
