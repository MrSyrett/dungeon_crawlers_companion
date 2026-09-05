import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_CREATURES } from "@/lib/data/d62e-creatures";
import type { D62eCreature } from "@/lib/data/d62e-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge,
  genreBadge, genreName, code, one, GENRES, matchesGenre, type Query, type RawQuery,
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
  const genre = GENRES.some((g) => g.key === one(raw.genre)) ? one(raw.genre) : "";
  const current: Query = { q, genre };
  const results = ALL.filter((c) =>
    matchesGenre(c.genre, genre) &&
    (!needle || [c.name, c.kind ?? "", c.description ?? "", (c.skills ?? []).join(" "), (c.powers ?? []).join(" ")].join(" ").toLowerCase().includes(needle)),
  ).sort((a, b) => a.name.localeCompare(b.name, "en"));
  const filtered = Boolean(needle || genre);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <D62eHeader title="Bestiary" subtitle={`${D62E_CREATURES.length} creatures & NPCs${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Stat blocks list attribute die codes and any trained skills; roll them like a character&rsquo;s. Defenses (Dodge, Parry) and other notes sit under Special. Assign weapons and gear to suit your setting.</p>

      <div className="mb-6"><HomebrewEditor kind="d62e-creature" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search creatures…" hidden={{ genre }} />
      <ChipRow label="Genre" base={BASE} current={current} param="genre" options={GENRES} active={genre} />
      <CountLine count={results.length} noun="creature" base={BASE} filtered={filtered} />

      {results.length === 0 ? (
        <EmptyState noun="creature" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((c) => (
            <li key={`${c.homebrew ? "hb" : "bk"}-${c.name}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{c.name}</h2>
                {c.kind ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{c.kind}</span> : null}
                {c.homebrew ? <span className={hbBadge}>Homebrew</span> : c.genre !== "core" ? <span className={genreBadge}>{genreName(c.genre)}</span> : null}
                {c.move ? <span className={badge}>Move {c.move}</span> : null}
              </div>

              {Object.keys(c.attributes).length ? (
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
                  {Object.entries(c.attributes).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{k}</dt>
                      <dd className="font-mono text-[13px] text-[#ef9455]">{code(v)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {c.skills?.length ? <p className="mt-3 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Skills:</span> {c.skills.join(", ")}</p> : null}
              {c.special?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Special:</span> {c.special.join(", ")}</p> : null}
              {c.talents?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Talents:</span> {c.talents.join(", ")}</p> : null}
              {c.powers?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Powers:</span> {c.powers.join(", ")}</p> : null}
              {c.description ? <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{c.description}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
