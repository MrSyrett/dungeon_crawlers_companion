import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_POWERS } from "@/lib/data/d62e-powers";
import type { D62ePower } from "@/lib/data/d62e-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, nameCls, badge, hbBadge,
  genreBadge, genreName, one, GENRES, matchesGenre, type Query, type RawQuery,
} from "@/components/D62eRef";

export const dynamic = "force-dynamic";
const BASE = "/d62e/powers";

const KINDS = [
  { key: "magic", label: "Magic" },
  { key: "psionic", label: "Psionic" },
  { key: "superpower", label: "Superpower" },
];
const KIND_HEADING: Record<string, string> = { magic: "Magic", psionic: "Psionics", superpower: "Superpowers" };

type Row = D62ePower & { homebrew?: boolean };

function hbToPower(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const opts = (Array.isArray(data.options) ? data.options : []).filter((x): x is string => typeof x === "string");
  return {
    name,
    kind: s("kind") || "magic",
    genre: (s("genre") || "fantasy") as Row["genre"],
    skill: s("skill") || null,
    difficulty: s("difficulty") || null,
    cost: s("cost") || null,
    description: s("description"),
    options: opts.length ? opts : undefined,
    page: 0,
    homebrew: true,
  };
}

export default async function D62ePowersPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "d62e-power" }),
    ownHomebrew(user.id, "d62e-power"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToPower(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...D62E_POWERS.map((p) => ({ ...p }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const genre = GENRES.some((g) => g.key === one(raw.genre)) ? one(raw.genre) : "";
  const kind = KINDS.some((k) => k.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, genre, kind };
  const results = ALL.filter((p) =>
    (!kind || p.kind === kind) &&
    matchesGenre(p.genre, genre) &&
    (!needle || [p.name, p.kind, p.skill ?? "", p.description].join(" ").toLowerCase().includes(needle)),
  );
  const groups = KINDS.map((k) => k.key).filter((k) => results.some((p) => p.kind === k));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <D62eHeader title="Powers" subtitle={`${D62E_POWERS.length} magic, psionic & super powers${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">The genre modules add three families of extraordinary abilities. Magic and psionics are rolled against a Difficulty Number using their governing skill; superpowers are bought in ranks. Each power lists its skill, difficulty, and any parameters (casting time, power cost, duration, range).</p>

      <div className="mb-6"><HomebrewEditor kind="d62e-power" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search powers…" hidden={{ genre, kind }} />
      <ChipRow label="Kind" base={BASE} current={current} param="kind" options={KINDS} active={kind} />
      <ChipRow label="Genre" base={BASE} current={current} param="genre" options={GENRES} active={genre} />
      <CountLine count={results.length} noun="power" base={BASE} filtered={Boolean(needle || genre || kind)} />

      {results.length === 0 ? <EmptyState noun="power" base={BASE} /> : null}
      {groups.map((k) => (
        <section key={k} className={`${cardCls} mb-4`}>
          <SectionH>{KIND_HEADING[k]}</SectionH>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {results.filter((p) => p.kind === k).map((p) => (
              <article key={`${p.homebrew ? "hb" : "bk"}-${p.name}`} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={nameCls}>{p.name}</h3>
                  {p.homebrew ? <span className={hbBadge}>Homebrew</span> : p.genre !== "core" ? <span className={genreBadge}>{genreName(p.genre)}</span> : null}
                </div>
                {(p.skill || p.difficulty || p.cost) ? (
                  <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                    {p.skill ? <span><span className="font-semibold text-[var(--text)]">Skill:</span> {p.skill}</span> : null}
                    {p.difficulty ? <span><span className="font-semibold text-[var(--text)]">Difficulty:</span> {p.difficulty}</span> : null}
                    {p.cost ? <span className={badge}>{p.cost}</span> : null}
                  </p>
                ) : null}
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{p.description}</p>
                {p.options?.length ? <p className="mt-2 text-[11px] text-[var(--muted)]">{p.options.join(" · ")}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
