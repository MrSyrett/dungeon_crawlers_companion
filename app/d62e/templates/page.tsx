import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_TEMPLATES } from "@/lib/data/d62e-templates";
import { D62E_TABLES } from "@/lib/data/d62e-tables";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge,
  genreBadge, genreName, code, one, GENRES, matchesGenre, type Query, type RawQuery,
} from "@/components/D62eRef";

export const dynamic = "force-dynamic";
const BASE = "/d62e/templates";

export default async function D62eTemplatesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const genre = GENRES.some((g) => g.key === one(raw.genre)) ? one(raw.genre) : "";
  const current: Query = { q, genre };
  const results = D62E_TEMPLATES.filter((t) =>
    matchesGenre(t.genre, genre) &&
    (!needle || [t.name, t.archetype ?? "", t.description ?? "", (t.equipment ?? []).join(" ")].join(" ").toLowerCase().includes(needle)),
  );
  const c = D62E_TABLES.creation;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <D62eHeader title="Templates" subtitle={`${D62E_TEMPLATES.length} ready-to-play character templates`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">A template is a partially completed character — pick one, then add {c.skillDice} of skills to finish it. Attribute dice are pre-assigned ({c.attributeDice} total); each character starts with {c.heroPoints} Hero Point. Dodge is {c.dodge.toLowerCase()}, Parry is {c.parry.toLowerCase()}.</p>

      <SearchForm base={BASE} q={q} placeholder="Search templates…" hidden={{ genre }} />
      <ChipRow label="Genre" base={BASE} current={current} param="genre" options={GENRES} active={genre} />
      <CountLine count={results.length} noun="template" base={BASE} filtered={Boolean(needle || genre)} />

      {results.length === 0 ? (
        <EmptyState noun="template" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {results.map((t) => (
            <li key={t.name} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{t.name}</h2>
                {t.archetype ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{t.archetype}</span> : null}
                {t.genre !== "core" ? <span className={genreBadge}>{genreName(t.genre)}</span> : null}
                {t.heroPoints ? <span className={badge}>{t.heroPoints} Hero Pt{t.heroPoints === 1 ? "" : "s"}</span> : null}
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
                {Object.entries(t.attributes).map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{k}</dt>
                    <dd className="font-mono text-[13px] text-[#ef9455]">{code(v)}</dd>
                  </div>
                ))}
              </dl>

              {t.skills?.length ? (
                <p className="mt-3 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Skills:</span> {t.skills.map((s) => `${s.name}${s.pips != null ? " " + code(s.pips) : ""}`).join(", ")}</p>
              ) : null}
              {t.perks?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Perks:</span> {t.perks.join(", ")}</p> : null}
              {t.flaws?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Flaws:</span> {t.flaws.join(", ")}</p> : null}
              {t.talents?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Talents:</span> {t.talents.join(", ")}</p> : null}
              {t.equipment?.length ? <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Equipment:</span> {t.equipment.join(", ")}</p> : null}

              {t.description ? <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{t.description}</p> : null}
              {t.quote ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">&ldquo;{t.quote}&rdquo;</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
