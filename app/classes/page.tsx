import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SD_CLASSES, type SdClass } from "@/lib/data/classes";
import { GEAR } from "@/lib/data/gear";
import { SPELLS } from "@/lib/data/spells";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import { effectLabel } from "@/lib/effects";
import HomebrewManager from "@/components/HomebrewManager";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";

type Query = { q?: string; cast?: string; opt?: string };
type RawQuery = { [K in keyof Query]?: string | string[] };
const one = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? "") : (v ?? ""));

type Row = SdClass & { homebrew: boolean; talentRolls: string[] };

// Options the class homebrew editor offers.
const WEAPON_OPTIONS = GEAR.filter((g) => g.category === "weapon").map((g) => g.name);
const ARMOR_OPTIONS = GEAR.filter((g) => g.category === "armor").map((g) => g.name);
const SPELL_LIST_OPTIONS = [
  ...[...new Set(SPELLS.map((s) => s.caster))].filter((c) => c !== "Both").sort(),
  "Homebrew",
];

function rollLabel(i: number, split: string): string {
  if (i === 0) return "2";
  if (i === 1) return split === "hi" ? "3–7" : "3–6";
  if (i === 2) return split === "hi" ? "8–9" : "7–9";
  if (i === 3) return "10–11";
  return "12";
}

// Book talent tables are a 12-entry array collapsed into 5 roll bands, matching
// the sheet: default bands 2 / 3-6 / 7-9 / 10-11 / 12 with row text pulled from
// these fixed slots. A class can override the bands (e.g. the Witch).
const DEFAULT_BANDS: [number, number][] = [[2, 2], [3, 6], [7, 9], [10, 11], [12, 12]];
const TALENT_TEXT_IDX = [0, 1, 6, 9, 11];
const bandLabel = (lo: number, hi: number): string => (lo === hi ? String(lo) : `${lo}–${hi}`);

type Titles = { Lawful: string[]; Neutral: string[]; Chaotic: string[] };
function parseTitles(raw: unknown): Titles | null {
  if (!raw || typeof raw !== "object") return null;
  const t = raw as Record<string, unknown>;
  const arr = (v: unknown) => (Array.isArray(v) ? (v as unknown[]).map(String) : []);
  const titles = { Lawful: arr(t.Lawful), Neutral: arr(t.Neutral), Chaotic: arr(t.Chaotic) };
  const any = [...titles.Lawful, ...titles.Neutral, ...titles.Chaotic].some((x) => x.trim());
  return any ? titles : null;
}

const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]";
const chipOn = "border-[var(--gold)] bg-[var(--panel-2)] text-[var(--gold)]";

function withParams(current: Query, patch: Query): string {
  const next = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (next.q) sp.set("q", next.q);
  if (next.cast) sp.set("cast", next.cast);
  if (next.opt) sp.set("opt", next.opt);
  const s = sp.toString();
  return s ? `/classes?${s}` : "/classes";
}

// The values the chips test, per row (lib/facets); the search is separate.
// `opt=0` hides the optional classes, so only the others carry that facet.
const facets = (c: Row) => ({ cast: c.caster ? "caster" : "martial", opt: c.optional ? undefined : "0" });

function matches(c: Row, needle: string): boolean {
  if (!needle) return true;
  return (
    c.name.toLowerCase().includes(needle) ||
    c.features.some((f) => f.toLowerCase().includes(needle)) ||
    c.talent.some((t) => t.toLowerCase().includes(needle))
  );
}

function homebrewRow(d: Record<string, unknown>, fallbackName: string): Row {
  const split = String(d.talentSplit) === "hi" ? "hi" : "lo";
  const talentData = Array.isArray(d.talent) ? (d.talent as Record<string, unknown>[]) : [];
  const talent: string[] = [];
  const talentRolls: string[] = [];
  talentData.forEach((row, i) => {
    const effects = Array.isArray(row.effects) ? (row.effects as Record<string, unknown>[]) : [];
    const text = String(row.text ?? "").trim();
    // Show the author's descriptive text. Only when a row has no text at all do
    // we fall back to summarising its effects, so the row isn't blank.
    let line = text;
    if (!line) {
      const sep = row.choose ? " or " : ", ";
      const prefix = row.choose && effects.length > 1 ? "choose one: " : "";
      line = prefix + effects.map(effectLabel).join(sep);
    }
    talent.push(line || "—");
    talentRolls.push(rollLabel(i, split));
  });

  const features = (Array.isArray(d.features) ? (d.features as unknown[]) : [])
    .map((f) => {
      const fo = (f ?? {}) as Record<string, unknown>;
      // Reference pages show the author's descriptive text only — mechanical
      // effects (charges, bonuses) live in the builder, not the printed blurb.
      // The one exception is a per-day allowance, surfaced as a compact "(N/day)".
      const text = String(fo.text ?? "");
      const effs = Array.isArray(fo.effects) ? (fo.effects as Record<string, unknown>[]) : [];
      const per = effs.find((e) => String(e.target) === "perDay");
      const uses = per ? Number(per.amount) || 0 : 0;
      return uses > 0 ? `${text} (${uses}/day)` : text;
    })
    .filter(Boolean);

  const weaponsAll = Boolean(d.weaponsAll);
  const armorAll = Boolean(d.armorAll);
  return {
    name: String(d.name ?? fallbackName),
    hd: String(d.hd ?? "1d6"),
    weapons: weaponsAll ? "All weapons" : Array.isArray(d.weapons) ? (d.weapons as string[]).join(", ") : "",
    armor: armorAll ? "All armor" : Array.isArray(d.armor) ? (d.armor as string[]).join(", ") : "",
    talent,
    talentBands: null,
    talentRolls,
    features,
    caster: Boolean(d.caster),
    optional: false,
    titles: parseTitles(d.titles),
    homebrew: true,
  };
}

export default async function ClassesPage({
  searchParams,
}: {
  searchParams: Promise<RawQuery>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "class" }),
    ownHomebrew(user.id, "class"),
    userCampaigns(user.id),
  ]);

  const hbRows: Row[] = hbVisible.map((h) => homebrewRow(h.data as Record<string, unknown>, h.name));
  const bookRows: Row[] = SD_CLASSES.map((c) => {
    const bands = c.talentBands ?? DEFAULT_BANDS;
    const talent = bands.map((_, i) => c.talent[TALENT_TEXT_IDX[i]] ?? "");
    const talentRolls = bands.map(([lo, hi]) => bandLabel(lo, hi));
    return { ...c, talent, talentRolls, homebrew: false };
  });
  const ALL: Row[] = [...hbRows, ...bookRows].sort((a, b) => a.name.localeCompare(b.name, "en"));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const cast = ["caster", "martial"].includes(one(raw.cast)) ? one(raw.cast) : "";
  const opt = one(raw.opt) === "0" ? "0" : "";
  const current: Query = { q, cast, opt };

  // Every class is rendered; the chips and the search filter on the client
  // (InstantFilter). `show` applies the URL's filters for the initial paint,
  // through the same facet match the client uses.
  const show = (c: Row) => facetMatch(facets(c), current) && matches(c, needle);
  const shown = ALL.filter(show).length;
  const filtered = Boolean(needle || cast || opt);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <PageHeader title="Classes" subtitle={<>{SD_CLASSES.length} Shadowdark classes{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}</>} />

      <HomebrewManager
        type="class"
        campaigns={campaigns}
        initial={hbOwn}
        weaponOptions={WEAPON_OPTIONS}
        armorOptions={ARMOR_OPTIONS}
        spellListOptions={SPELL_LIST_OPTIONS}
      />

      <InstantFilter>
      <form method="get" action="/classes" className="mb-4 flex gap-2" data-search>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, feature, or talent…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--gold)]"
        />
        {cast ? <input type="hidden" name="cast" value={cast} /> : null}
        <button className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)]">
          Search
        </button>
      </form>

      <div className="mb-6 flex flex-wrap items-center gap-1.5" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Type
        </span>
        <a href={withParams(current, { cast: "" })} data-chip="cast:" aria-pressed={!cast} className={`${chipBase} ${cast ? chipOff : chipOn}`}>
          All
        </a>
        <a
          href={withParams(current, { cast: "caster" })}
          data-chip="cast:caster"
          aria-pressed={cast === "caster"}
          className={`${chipBase} ${cast === "caster" ? chipOn : chipOff}`}
        >
          Casters
        </a>
        <a
          href={withParams(current, { cast: "martial" })}
          data-chip="cast:martial"
          aria-pressed={cast === "martial"}
          className={`${chipBase} ${cast === "martial" ? chipOn : chipOff}`}
        >
          Martial
        </a>
        <span className="mx-1 h-4 w-px bg-[var(--border)]" aria-hidden />
        {/* A switch: lit (pressed) while optional classes are shown, i.e. opt
            unset; clicking it then sets opt=0 (InstantFilter's data-toggle).
            Its own chip row, since the Type chips share this flex row;
            `contents` keeps it a flex item of the row above. */}
        <span className="contents" data-chiprow data-base={chipBase} data-on={chipOn} data-off={chipOff}>
          <a
            href={withParams(current, { opt: opt === "0" ? "" : "0" })}
            data-chip="opt:"
            data-toggle="0"
            aria-pressed={opt !== "0"}
            className={`${chipBase} ${opt === "0" ? chipOff : chipOn}`}
          >
            Optional
          </a>
        </span>
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span data-count data-noun="class" data-plural="classes" aria-live="polite">
          {shown} {shown === 1 ? "class" : "classes"}
        </span>
        <Link href="/classes" data-clear hidden={!filtered} className="text-[var(--gold)] hover:underline">
          Clear filters
        </Link>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6" data-empty hidden={shown > 0}>
        <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          No class matches those filters.{" "}
          <Link href="/classes" data-clear className="text-[var(--gold)] underline">
            Clear them
          </Link>
          .
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 items-start">
        {ALL.map((c, idx) => (
          <li
            key={`${c.homebrew ? "hb" : "bk"}-${c.name}-${idx}`}
            className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
            hidden={!show(c)}
            data-f={facetAttr(facets(c))}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                {c.name}
              </h2>
              <span className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] font-bold tracking-[0.12em] text-[var(--text)]">
                HP {c.hd}
              </span>
              {c.caster ? (
                <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                  Spellcaster
                </span>
              ) : null}
              {c.homebrew ? (
                <span className="rounded border border-[var(--gold)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
                  Homebrew
                </span>
              ) : null}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="text-[12px] text-[var(--muted)]">
                <span className="font-semibold uppercase tracking-[0.1em] text-[var(--text)]">
                  Weapons:
                </span>{" "}
                {c.weapons || "—"}
              </div>
              <div className="text-[12px] text-[var(--muted)]">
                <span className="font-semibold uppercase tracking-[0.1em] text-[var(--text)]">
                  Armor:
                </span>{" "}
                {c.armor || "—"}
              </div>
            </div>

            {c.features.length > 0 ? (
              <div className="mt-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
                  Features
                </div>
                <ul className="mt-1 flex flex-col gap-1">
                  {c.features.map((f, i) => (
                    <li key={i} className="text-[13px] leading-relaxed text-[var(--muted)]">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {c.talent.length > 0 ? (
              <details className="mt-3 border-t border-[var(--border)] pt-3">
                <summary className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--text)]">
                  Talent table ({c.talent.length})
                </summary>
                <ol className="mt-2 flex flex-col gap-1">
                  {c.talent.map((t, i) => (
                    <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-[var(--muted)]">
                      <span className="shrink-0 font-semibold text-[var(--gold)]">
                        {c.talentRolls.length ? c.talentRolls[i] : `${i + 1}.`}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </details>
            ) : null}

            {c.titles ? (
              <details className="mt-2">
                <summary className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--text)]">
                  Titles by alignment
                </summary>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {(["Lawful", "Neutral", "Chaotic"] as const).map((al) => (
                    <div key={al}>
                      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text)]">
                        {al}
                      </div>
                      <div className="text-[12px] text-[var(--muted)]">
                        {c.titles![al].filter((t) => t.trim()).join(", ") || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ) : null}
          </li>
        ))}
      </ul>
      </InstantFilter>
    </div>
  );
}
