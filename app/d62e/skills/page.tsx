import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { D62E_SKILLS } from "@/lib/data/d62e-skills";
import { D62E_ATTRIBUTE_INFO } from "@/lib/data/d62e-attributes";
import type { D62eSkill } from "@/lib/data/d62e-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import {
  D62eHeader, SearchForm, ChipRow, CountLine, EmptyState, SectionH, cardCls, badge, hbBadge,
  genreBadge, genreName, one, GENRES, matchesGenre, type Query, type RawQuery,
} from "@/components/D62eRef";

export const dynamic = "force-dynamic";
const BASE = "/d62e/skills";

type Row = D62eSkill & { homebrew?: boolean };

function hbToSkill(data: Record<string, unknown>, name: string): Row {
  const s = (k: string) => (typeof data[k] === "string" ? (data[k] as string) : "");
  const specs = (Array.isArray(data.specializations) ? data.specializations : []).filter((x): x is string => typeof x === "string");
  return {
    name,
    attribute: s("attribute") || "Agility",
    genre: (s("genre") || "core") as Row["genre"],
    description: s("description"),
    specializations: specs.length ? specs : undefined,
    time: s("time") || undefined,
    page: 0,
    homebrew: true,
  };
}

export default async function D62eSkillsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "d62e-skill" }),
    ownHomebrew(user.id, "d62e-skill"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToSkill(h.data as Record<string, unknown>, h.name));
  const ALL: Row[] = [...hbRows, ...D62E_SKILLS.map((s) => ({ ...s }))];

  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const genre = GENRES.some((g) => g.key === one(raw.genre)) ? one(raw.genre) : "";
  const current: Query = { q, genre };
  const results = ALL.filter((s) =>
    matchesGenre(s.genre, genre) &&
    (!needle || [s.name, s.attribute, s.description, (s.specializations ?? []).join(" ")].join(" ").toLowerCase().includes(needle)),
  );
  const filtered = Boolean(needle || genre);

  // Attribute order: the info list first (core + genre attributes), then any
  // attribute a skill references that isn't in the info list.
  const infoOrder = D62E_ATTRIBUTE_INFO.map((a) => a.name);
  const extra = [...new Set(results.map((s) => s.attribute))].filter((a) => !infoOrder.includes(a));
  const order = [...infoOrder, ...extra];
  const groups = order.filter((a) => results.some((s) => s.attribute === a));
  const attrInfo = (name: string) => D62E_ATTRIBUTE_INFO.find((a) => a.name === name);
  const introAttrs = D62E_ATTRIBUTE_INFO.filter((a) => matchesGenre(a.genre, genre));

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <D62eHeader title="Skills" subtitle={`${D62E_SKILLS.length} skills under the attributes${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Every skill sits under a governing attribute and starts at that attribute&rsquo;s die code; the dice you add go on top. Roll a skill (or the bare attribute) against a Difficulty Number. The four core attributes appear in every game; the rest are optional or genre attributes, each bringing its own skills.</p>

      <section className={`${cardCls} mb-6`}>
        <SectionH>Attributes</SectionH>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {introAttrs.map((a) => (
            <li key={a.name} className="text-[12px] leading-relaxed text-[var(--muted)]">
              <span className="font-bold uppercase tracking-[0.08em] text-[var(--text)]">{a.name}</span>
              {a.core ? <span className={`${badge} ml-2`}>core</span> : <span className={`${badge} ml-2`}>optional</span>}
              {a.genre !== "core" ? <span className={`${genreBadge} ml-1`}>{genreName(a.genre)}</span> : null}
              <span className="ml-2">{a.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-6"><HomebrewEditor kind="d62e-skill" campaigns={campaigns} initial={hbOwn} /></div>

      <SearchForm base={BASE} q={q} placeholder="Search skills…" hidden={{ genre }} />
      <ChipRow label="Genre" base={BASE} current={current} param="genre" options={GENRES} active={genre} />
      <CountLine count={results.length} noun="skill" base={BASE} filtered={filtered} />

      {results.length === 0 ? <EmptyState noun="skill" base={BASE} /> : null}
      {groups.map((a) => {
        const info = attrInfo(a);
        return (
          <section key={a} className={`${cardCls} mb-4`}>
            <SectionH>{a}</SectionH>
            {info ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]">{info.description}</p> : null}
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {results.filter((s) => s.attribute === a).map((s) => (
                <li key={`${s.homebrew ? "hb" : "bk"}-${s.name}`} className="text-[12px] leading-relaxed text-[var(--muted)]">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-bold uppercase tracking-[0.08em] text-[var(--text)]">{s.name}</span>
                    {s.homebrew ? <span className={hbBadge}>Homebrew</span> : s.genre !== "core" ? <span className={genreBadge}>{genreName(s.genre)}</span> : null}
                    {s.time ? <span className="text-[10px] uppercase tracking-[0.1em]">{s.time}</span> : null}
                  </div>
                  {s.description}
                  {s.specializations?.length ? <p className="mt-1 text-[11px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Specializations:</span> {s.specializations.join(", ")}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
