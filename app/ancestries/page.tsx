import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SD_ANCESTRIES } from "@/lib/data/ancestries";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import { effectLabel } from "@/lib/effects";
import HomebrewManager from "@/components/HomebrewManager";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";

type RawQuery = { q?: string | string[]; opt?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

type Effect = { amount: number; target: string; weapon: string; spell: string; feature?: string };
type Trait = { text: string; effects: Effect[]; choose: boolean };
type Row = { name: string; traits: Trait[]; languages: string; homebrew: boolean; optional: boolean };
const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]";
const chipOn = "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]";
function optHref(q: string, opt: string): string {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (opt) sp.set("opt", opt);
  const s = sp.toString();
  return s ? `/ancestries?${s}` : "/ancestries";
}

// Split "Farsight: +1 to ranged…" into the trait name and its effect.
function splitTrait(trait: string): { title: string; body: string } {
  const i = trait.indexOf(":");
  if (i === -1) return { title: "", body: trait };
  return { title: trait.slice(0, i).trim(), body: trait.slice(i + 1).trim() };
}

// One trait record → {text, effects}.
function toTrait(t: Record<string, unknown>): Trait {
  const effects: Effect[] = Array.isArray(t.effects)
    ? (t.effects as Record<string, unknown>[]).map((e) => ({
        amount: Number(e.amount) || 0,
        target: String(e.target ?? ""),
        weapon: String(e.weapon ?? ""),
        spell: String(e.spell ?? ""),
      }))
    : [];
  return { text: String(t.text ?? ""), effects, choose: !!t.choose };
}

export default async function AncestriesPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ancestry" }),
    ownHomebrew(user.id, "ancestry"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => {
    const d = h.data as Record<string, unknown>;
    const traits: Trait[] = Array.isArray(d.traits)
      ? (d.traits as Record<string, unknown>[]).map(toTrait)
      : d.trait
        ? [{ text: String(d.trait), effects: [], choose: false }]
        : [];
    return {
      name: String(d.name ?? h.name),
      traits: traits.filter((t) => t.text),
      languages: String(d.languages ?? ""),
      homebrew: true,
      optional: false,
    };
  });
  const bookRows: Row[] = SD_ANCESTRIES.map((a) => ({
    name: a.name,
    traits: a.trait ? [{ text: a.trait, effects: [], choose: false }] : [],
    languages: a.languages,
    homebrew: false,
    optional: a.optional,
  }));
  const ALL: Row[] = [...hbRows, ...bookRows].sort((a, b) => a.name.localeCompare(b.name, "en"));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const opt = one(raw.opt) === "0" ? "0" : "";
  const current = { q, opt };
  // Every ancestry is rendered; the Optional toggle and the search filter on
  // the client (InstantFilter). `opt=0` hides the optional ones, so only the
  // non-optional rows carry the facet it tests. `show` applies the URL's
  // filters for the initial paint, through the same facet match the client uses.
  const facets = (a: Row) => ({ opt: a.optional ? undefined : "0" });
  const show = (a: Row) =>
    facetMatch(facets(a), current) &&
    (!needle ||
      a.name.toLowerCase().includes(needle) ||
      a.traits.some((t) => t.text.toLowerCase().includes(needle)));
  const shown = ALL.filter(show).length;
  const filtered = Boolean(needle || opt);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Ancestries" subtitle={<>{SD_ANCESTRIES.length} Shadowdark ancestries{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}</>} />

      <HomebrewManager type="ancestry" campaigns={campaigns} initial={hbOwn} />

      <InstantFilter>
      <form method="get" action="/ancestries" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name or trait…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
        />
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      {/* A switch: lit (pressed) while optional entries are shown, i.e. opt
          unset; clicking it then sets opt=0 (InstantFilter's data-toggle). */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <a href={optHref(q, opt === "0" ? "" : "0")} data-chip="opt:" data-toggle="0" aria-pressed={opt !== "0"} className={`${chipBase} ${opt === "0" ? chipOff : chipOn}`}>
          Optional
        </a>
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="ancestry" data-plural="ancestries" aria-live="polite">
          {shown} {shown === 1 ? "ancestry" : "ancestries"}
        </span>
        <Link href="/ancestries" data-clear hidden={!filtered} className="text-[var(--gold)] hover:underline">
          Clear
        </Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No ancestry matches that search.{" "}
          <Link href="/ancestries" data-clear className="text-[var(--gold)] underline">
            Clear it
          </Link>
          .
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 items-start">
        {ALL.map((a, idx) => (
          <li
            key={`${a.homebrew ? "hb" : "bk"}-${a.name}-${idx}`}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
            hidden={!show(a)}
            data-f={facetAttr(facets(a))}
            data-s={a.traits.map((t) => t.text).join(" ")}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-base font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                {a.name}
              </h2>
              {a.homebrew ? (
                <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                  Homebrew
                </span>
              ) : null}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              {a.traits.map((t, i) => {
                const { title, body } = splitTrait(t.text);
                const perDay = t.effects.find((e) => e.target === "perDay");
                const bonuses = t.effects.filter((e) => e.target !== "perDay");
                // Reference pages print the author's descriptive text only. The
                // mechanical effect list is shown solely as a fallback when a
                // trait has no descriptive text of its own (so it isn't blank).
                const showEffects = bonuses.length > 0 && !body.trim();
                return (
                  <div key={i}>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {title ? (
                        <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] font-semibold tracking-[0.1em] text-[var(--text)]">
                          {title}
                        </span>
                      ) : null}
                      {perDay ? (
                        <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--gold)]">
                          {perDay.amount}/day
                        </span>
                      ) : null}
                    </div>
                    {body.trim() ? (
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{body}</p>
                    ) : null}
                    {showEffects ? (
                      <ul className="mt-1 flex flex-col gap-1">
                        {t.choose ? (
                          <li className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text)]">
                            Choose one:
                          </li>
                        ) : null}
                        {bonuses.map((e, k) => (
                          <li key={k} className="flex gap-2 text-[12px] leading-relaxed text-[var(--muted)]">
                            <span className="shrink-0 text-[var(--gold)]">▸</span>
                            <span className="text-[var(--gold)]">{effectLabel(e)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {a.languages ? (
              <p className="mt-2 text-[12px] text-[var(--muted)]">
                <span className="font-semibold uppercase tracking-[0.1em] text-[var(--text)]">
                  Languages:
                </span>{" "}
                {a.languages}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      </InstantFilter>
    </div>
  );
}
