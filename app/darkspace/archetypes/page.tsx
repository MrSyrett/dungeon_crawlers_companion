import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_ARCHETYPES } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import { effectLabel, type EffectLike } from "@/lib/effects";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, SearchForm, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, DataTable, one, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/archetypes";

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
type EffRow = { name: string; text: string; effects: EffectLike[]; choose?: boolean };
type ArchRow = {
  name: string; stat: string; hitDie: number; weapons: string; armor: string; blurb: string;
  features: EffRow[]; talents: { r: string; text: string; effects: EffectLike[]; choose?: boolean }[];
  bonuses: EffectLike[]; triad: string[]; homebrew: boolean;
};

const effList = (v: unknown): EffectLike[] => (Array.isArray(v) ? (v as EffectLike[]) : []);
// Weapon/armor proficiency display: "All …", a joined list, or a legacy string.
function profText(all: unknown, list: unknown, allLabel: string): string {
  if (all === true) return allLabel;
  if (Array.isArray(list)) return list.map((x) => s(x)).filter(Boolean).join(", ");
  return s(list);
}

function hbToArch(data: Record<string, unknown>, name: string): ArchRow {
  const feats = Array.isArray(data.features) ? (data.features as Record<string, unknown>[]) : [];
  const tals = Array.isArray(data.talents) ? (data.talents as Record<string, unknown>[]) : [];
  const hd = parseInt(s(data.hitDie), 10);
  const triadIn = (data.triad ?? {}) as Record<string, unknown>;
  return {
    name,
    stat: s(data.stat) || "STR",
    hitDie: Number.isFinite(hd) ? hd : 6,
    weapons: profText(data.weaponsAll, data.weapons, "All weapons"),
    armor: profText(data.armorAll, data.armor, "All armor & shields"),
    blurb: s(data.blurb),
    features: feats.map((f) => ({ name: s(f.name), text: s(f.text), effects: effList(f.effects), choose: f.choose === true })),
    talents: tals.map((t) => ({ r: s(t.r), text: s(t.text), effects: effList(t.effects), choose: t.choose === true })),
    bonuses: effList(data.bonuses),
    triad: ["Body", "Mind", "Soul"].filter((p) => triadIn[p]),
    homebrew: true,
  };
}

function effSuffix(effects: EffectLike[], choose?: boolean): string {
  if (!effects.length) return "";
  const labels = effects.map(effectLabel).join(choose ? " / " : ", ");
  return ` (${choose ? "choose one: " : ""}${labels})`;
}

export default async function DarkSpaceArchetypesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-archetype" }),
    ownHomebrew(user.id, "ds-archetype"),
    userCampaigns(user.id),
  ]);
  const hbRows: ArchRow[] = hbVisible.map((h) => hbToArch(h.data as Record<string, unknown>, h.name));
  const bookRows: ArchRow[] = DS_ARCHETYPES.map((a) => ({
    name: a.name, stat: a.stat, hitDie: a.hitDie, weapons: a.weapons, armor: a.armor, blurb: a.blurb,
    features: a.features.map((f) => ({ name: f.name, text: f.text, effects: [] as EffectLike[] })),
    talents: a.talents.map((t) => ({ r: t.r, text: t.text, effects: [] as EffectLike[] })),
    bonuses: [] as EffectLike[], triad: [] as string[], homebrew: false,
  }));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const rows = [...hbRows, ...bookRows].filter((a) => !needle ||
    [a.name, a.blurb, a.weapons, a.armor, ...a.features.map((f) => f.name + " " + f.text), ...a.talents.map((t) => t.text)].join(" ").toLowerCase().includes(needle));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Archetypes" subtitle={`${DS_ARCHETYPES.length} archetypes${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        Archetypes replace classes. Each sets your prime stat, hit die, and weapon/armor training, grants features, and has its own 2d6 talent table (rolled at 1st level and every odd level).
      </p>
      <div className="mb-6"><HomebrewEditor kind="ds-archetype" campaigns={campaigns} initial={hbOwn} /></div>
      <SearchForm base={BASE} q={q} placeholder="Search archetypes…" />
      <CountLine count={rows.length} noun="archetype" base={BASE} filtered={Boolean(needle)} />
      {rows.length === 0 ? <EmptyState noun="archetype" base={BASE} /> : null}

      <div className="flex flex-col gap-4">
        {rows.map((a, i) => (
          <section key={`${a.homebrew ? "hb" : "bk"}-${a.name}-${i}`} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className={nameCls}>{a.name}</h2>
              {a.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
              <span className={badge}>{a.stat} · d{a.hitDie}</span>
            </div>
            {a.blurb ? <p className="mt-2 text-[13px] italic leading-relaxed text-[var(--muted)]">{a.blurb}</p> : null}
            {(a.weapons || a.armor) ? <p className="mt-2 text-[12px] text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Weapons:</span> {a.weapons || "—"} &nbsp;·&nbsp; <span className="font-semibold text-[#8fd6ea]">Armor:</span> {a.armor || "—"}</p> : null}
            {a.bonuses.length ? <p className="mt-2 text-[12px] text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Bonuses:</span> {a.bonuses.map(effectLabel).join(" · ")}</p> : null}
            {a.triad.length ? <p className="mt-1 text-[12px] text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">Grants Triad:</span> {a.triad.join(", ")}</p> : null}
            {a.features.length ? (
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {a.features.map((f, j) => (
                  <p key={j} className="text-[13px] leading-relaxed text-[var(--text)]"><span className="font-semibold">{f.name}.</span> {f.text}<span className="text-[#8fd6ea]">{effSuffix(f.effects, f.choose)}</span></p>
                ))}
              </div>
            ) : null}
            {a.talents.length ? (
              <div className="mt-4">
                <h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">{a.name} Talents (2d6)</h3>
                <DataTable head={["2d6", "Talent"]} rows={a.talents.map((t) => [t.r, t.text + effSuffix(t.effects, t.choose)])} />
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
