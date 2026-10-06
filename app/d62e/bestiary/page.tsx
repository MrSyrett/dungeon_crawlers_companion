import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_CREATURES } from "@/lib/data/d62e-creatures";
import type { D62eCreature } from "@/lib/data/d62e-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  genreBadge, genreName, code, one, withParams, GENRES, type Query, type RawQuery,
} from "@/components/D62eRef";

export const dynamic = "force-dynamic";
const BASE = "/d62e/bestiary";

type Row = D62eCreature & { homebrew?: boolean };

function hbToCreature(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const list = (k: string) => (Array.isArray(data[k]) ? (data[k] as unknown[]) : []).filter((x): x is string => typeof x === "string");
  const attrs: Record<string, number> = {};
  if (data.attributes && typeof data.attributes === "object") {
    for (const [k, v] of Object.entries(data.attributes as Record<string, unknown>)) if (typeof v === "number") attrs[k] = v;
  }
  const skills = list("skills");
  const talents = list("talents");
  const powers = list("powers");
  const special = list("special");
  return {
    name,
    genre: (s("genre") || "core") as Row["genre"],
    kind: s("kind") || undefined,
    attributes: attrs,
    skills: skills.length ? skills : undefined,
    talents: talents.length ? talents : undefined,
    powers: powers.length ? powers : undefined,
    special: special.length ? special : undefined,
    move: s("move") || undefined,
    description: s("description") || undefined,
    page: 0,
    homebrew: true,
  };
}

// The four core attributes (plus any genre attribute) as die codes. Shown both
// on the summary card and in the full stat block.
function AttrGrid({ c }: { c: Row }) {
  if (!Object.keys(c.attributes).length) return null;
  return (
    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
      {Object.entries(c.attributes).map(([k, v]) => (
        <div key={k}>
          <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{k}</dt>
          <dd className="font-mono text-[13px] text-[var(--sys-link)]">{code(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

// The whole creature, as the card used to render it. Reached via ?m=<name>.
function StatBlock({ c }: { c: Row }) {
  return (
    <div className={cardCls}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className={nameCls}>{c.name}</h2>
        {c.kind ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{c.kind}</span> : null}
        {c.homebrew ? <span className={hbBadge}>Homebrew</span> : c.genre !== "core" ? <span className={genreBadge}>{genreName(c.genre)}</span> : null}
        {c.move ? <span className={badge}>Move {c.move}</span> : null}
      </div>

      <AttrGrid c={c} />

      {c.skills?.length ? <p className="mt-3 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Skills:</span> {c.skills.join(", ")}</p> : null}
      {c.special?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Special:</span> {c.special.join(", ")}</p> : null}
      {c.talents?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Talents:</span> {c.talents.join(", ")}</p> : null}
      {c.powers?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Powers:</span> {c.powers.join(", ")}</p> : null}
      {c.description ? <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{c.description}</p> : null}
    </div>
  );
}

export default async function D62eBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "d62e-creature" }),
    ownHomebrew(user.id, "d62e-creature"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToCreature(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...D62E_CREATURES.map((c) => ({ ...c }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const pick = one(raw.m);
  const genre = GENRES.some((g) => g.key === one(raw.genre)) ? one(raw.genre) : "";
  const current: Query = { q, genre };

  // ?m=<name> is the detail view. An unknown name falls through to the list
  // rather than rendering an empty page.
  const selected = pick ? ALL.find((c) => c.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <D62eHeader title="Bestiary" subtitle={`${D62E_CREATURES.length} creatures & NPCs${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
        <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sys-link)] hover:underline">← All creatures</a>
        <StatBlock c={selected} />
      </div>
    );
  }

  // Every creature is rendered; the chips filter on the client (InstantFilter).
  // `show` applies the URL's filters for the initial paint, through the same
  // facet match the client uses. The genre chip's matchesGenre(row, genre) is
  // the array facet [c.genre]: "All" ("") matches everything, a genre key
  // matches only the rows of that genre.
  const list = ALL.slice().sort((a, b) => a.name.localeCompare(b.name, "en"));
  const facets = (c: Row) => ({ genre: [c.genre] });
  const show = (c: Row) =>
    facetMatch(facets(c), current) &&
    (!needle || [c.name, c.kind ?? "", c.description ?? "", (c.skills ?? []).join(" "), (c.powers ?? []).join(" ")].join(" ").toLowerCase().includes(needle));
  const shown = list.filter(show).length;
  const filtered = Boolean(needle || genre);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <D62eHeader title="Bestiary" subtitle={`${D62E_CREATURES.length} creatures & NPCs${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />

      <div className="mb-6"><HomebrewEditor kind="d62e-creature" campaigns={campaigns} initial={hbOwn} /></div>

      <InstantFilter>
      <SearchForm base={BASE} q={q} placeholder="Search creatures…" hidden={{ genre }} />
      <ChipRow label="Genre" base={BASE} current={current} param="genre" options={GENRES} active={genre} />
      <CountLine count={shown} noun="creature" base={BASE} filtered={filtered} />

      <EmptyState noun="creature" base={BASE} hidden={shown > 0} />
      <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {list.map((c) => (
          <li key={`${c.homebrew ? "hb" : "bk"}-${c.name}`} className={cardCls} hidden={!show(c)} data-f={facetAttr(facets(c))} data-s={[c.description ?? "", (c.skills ?? []).join(" "), (c.powers ?? []).join(" ")].join(" ")}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a href={withParams(BASE, {}, { m: c.name })} className={`${nameCls} hover:underline`}>{c.name}</a>
              {c.kind ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{c.kind}</span> : null}
              {c.homebrew ? <span className={hbBadge}>Homebrew</span> : c.genre !== "core" ? <span className={genreBadge}>{genreName(c.genre)}</span> : null}
              {c.move ? <span className={badge}>Move {c.move}</span> : null}
            </div>

            <AttrGrid c={c} />
          </li>
        ))}
      </ul>
      </InstantFilter>
    </div>
  );
}
