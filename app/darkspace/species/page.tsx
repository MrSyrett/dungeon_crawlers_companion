import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_SPECIES, DS_TECH_SPECIES, DS_HUMAN_NOTE } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, one, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/species";

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
type Trait = { name: string; text: string };
type SpeciesRow = { n: number | null; name: string; text: string; traits?: Trait[]; languages?: string; homebrew: boolean };
function hbTraits(data: Record<string, unknown>): Trait[] {
  const raw = Array.isArray(data.traits) ? data.traits : [];
  return raw.map((t) => ({ name: s((t as Record<string, unknown>).name), text: s((t as Record<string, unknown>).text) })).filter((t) => t.name || t.text);
}

export default async function DarkSpaceSpeciesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-species" }),
    ownHomebrew(user.id, "ds-species"),
    userCampaigns(user.id),
  ]);
  const hbRows: SpeciesRow[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    return { n: null, name: h.name, text: s(d.text), traits: hbTraits(d), languages: s(d.languages), homebrew: true };
  });
  const bookRows: SpeciesRow[] = DS_SPECIES.map((sp) => ({ ...sp, homebrew: false }));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const species = [...hbRows, ...bookRows].filter((sp) => !needle || (sp.name + " " + sp.text).toLowerCase().includes(needle));
  const tech = DS_TECH_SPECIES.filter((t) => !needle || (t.name + " " + t.text).toLowerCase().includes(needle));
  const total = species.length + tech.length;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Species" subtitle={`${DS_SPECIES.length} species traits${hbRows.length ? ` + ${hbRows.length} homebrew` : ""} · ${DS_TECH_SPECIES.length} tech species`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        Roll a d20 or choose a Species Trait. Humans (or human analogues) get the <span className="font-semibold text-[var(--text)]">Ambitious</span> trait instead: {DS_HUMAN_NOTE} You can also use any Shadowdark ancestry.
      </p>
      <div className="mb-6"><HomebrewEditor kind="ds-species" campaigns={campaigns} initial={hbOwn} /></div>
      <SearchForm base={BASE} q={q} placeholder="Search species…" />
      <CountLine count={total} noun="species" base={BASE} filtered={Boolean(needle)} />
      {total === 0 ? <EmptyState noun="species" base={BASE} /> : null}

      {species.length ? (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {species.map((sp, i) => (
            <li key={`${sp.homebrew ? "hb" : "bk"}-${sp.name}-${i}`} className={cardCls}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className={nameCls}>{sp.name}</h2>
                {sp.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{sp.text}</p>
              {sp.traits && sp.traits.length ? (
                <ul className="mt-2 space-y-1">
                  {sp.traits.map((t, j) => (
                    <li key={j} className="text-[13px] leading-relaxed text-[var(--text)]">
                      {t.name ? <span className="font-semibold text-[#8fd6ea]">{t.name}: </span> : null}{t.text}
                    </li>
                  ))}
                </ul>
              ) : null}
              {sp.languages ? <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold">Languages:</span> {sp.languages}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}

      {tech.length ? (
        <section className="mt-6">
          <h2 className="mb-3 text-base font-bold uppercase tracking-[0.12em] text-[#8fd6ea]">Tech Species</h2>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
            {tech.map((t) => (
              <li key={t.name} className={cardCls}>
                <h3 className={nameCls}>{t.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{t.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
