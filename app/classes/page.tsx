import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SD_CLASSES, type SdClass } from "@/lib/data/classes";
import { GEAR } from "@/lib/data/gear";
import { SPELLS } from "@/lib/data/spells";
import { visibleHomebrew, ownHomebrew, userCampaigns, TALENT_TARGETS } from "@/lib/homebrew";
import HomebrewManager from "@/components/HomebrewManager";

export const dynamic = "force-dynamic";

type Query = { q?: string; cast?: string };
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

const TALENT_LABEL = new Map(TALENT_TARGETS);
function effectLabel(e: Record<string, unknown>): string {
  const amt = Number(e.amount) || 0;
  const target = String(e.target ?? "");
  const label = TALENT_LABEL.get(target) ?? target;
  if (target === "perDay") return `${amt}/day`;
  if (target === "weaponDie") {
    const w = String(e.weapon ?? "");
    return `d${amt} weapon damage${w ? ` (${w})` : ""}`;
  }
  if (target === "spellKnown") {
    const sp = String(e.spell ?? "");
    return sp ? `Learn ${sp}` : "Learn a spell";
  }
  if (target === "advSpell") {
    const sp = String(e.spell ?? "");
    return sp ? `Advantage casting ${sp}` : "Advantage on a spell";
  }
  if (target === "playerTalent") return "Player Choice";
  if (target === "featureCharges") { const f = String(e.feature ?? ""); return `+${amt} charge${amt === 1 ? "" : "s"}${f ? ` to ${f}` : ""}`; }
  return `${amt >= 0 ? "+" : ""}${amt} ${label}`;
}
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
  const s = sp.toString();
  return s ? `/classes?${s}` : "/classes";
}

function matches(c: Row, needle: string, cast: string): boolean {
  if (cast === "caster" && !c.caster) return false;
  if (cast === "martial" && c.caster) return false;
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
    const sep = row.choose ? " or " : ", ";
    const effStr = effects.map(effectLabel).join(sep);
    const text = String(row.text ?? "");
    const prefix = row.choose && effects.length > 1 ? "choose one: " : "";
    talent.push([text, prefix + effStr].filter(Boolean).join(" — ") || "—");
    talentRolls.push(rollLabel(i, split));
  });

  const features = (Array.isArray(d.features) ? (d.features as unknown[]) : [])
    .map((f) => {
      if (typeof f === "string") return f;
      const fo = (f ?? {}) as Record<string, unknown>;
      const text = String(fo.text ?? "");
      const effs = Array.isArray(fo.effects) ? (fo.effects as Record<string, unknown>[]) : [];
      const parts = effs.map(effectLabel);
      const legacyUses = Number(fo.uses) || 0; // pre-effects saves
      if (!effs.length && legacyUses > 0) parts.push(`${legacyUses}/day`);
      if (!parts.length) return text;
      const sep = fo.choose ? " or " : ", ";
      const prefix = fo.choose && parts.length > 1 ? "choose one: " : "";
      return `${text} (${prefix}${parts.join(sep)})`;
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
  const current: Query = { q, cast };

  const results = ALL.filter((c) => matches(c, needle, cast));
  const filtered = Boolean(needle || cast);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="font-display text-3xl font-black tracking-wide">Classes</h1>
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.35em]">
            {SD_CLASSES.length} Shadowdark classes{hbRows.length ? ` + ${hbRows.length} homebrew` : ""}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--text)] sm:px-3 sm:py-1.5 sm:text-[11px]"
        >
          &larr; Home
        </Link>
      </header>

      <HomebrewManager
        type="class"
        campaigns={campaigns}
        initial={hbOwn}
        weaponOptions={WEAPON_OPTIONS}
        armorOptions={ARMOR_OPTIONS}
        spellListOptions={SPELL_LIST_OPTIONS}
      />

      <form method="get" action="/classes" className="mb-4 flex gap-2">
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

      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Type
        </span>
        <Link href={withParams(current, { cast: "" })} className={`${chipBase} ${cast ? chipOff : chipOn}`}>
          All
        </Link>
        <Link
          href={withParams(current, { cast: "caster" })}
          className={`${chipBase} ${cast === "caster" ? chipOn : chipOff}`}
        >
          Casters
        </Link>
        <Link
          href={withParams(current, { cast: "martial" })}
          className={`${chipBase} ${cast === "martial" ? chipOn : chipOff}`}
        >
          Martial
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
        <span>
          {results.length} {results.length === 1 ? "class" : "classes"}
        </span>
        {filtered ? (
          <Link href="/classes" className="text-[var(--gold)] hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-base font-bold uppercase tracking-[0.15em]">Nothing found</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            No class matches those filters.{" "}
            <Link href="/classes" className="text-[var(--gold)] underline">
              Clear them
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {results.map((c, idx) => (
            <li
              key={`${c.homebrew ? "hb" : "bk"}-${c.name}-${idx}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
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
      )}
    </div>
  );
}
