import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_MONSTERS } from "@/lib/data/darkspace-monsters";
import type { DsMonster } from "@/lib/data/darkspace-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, hbBadge, one, motivLabel, type Query, type RawQuery } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";
const BASE = "/darkspace/bestiary";

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));
type Row = DsMonster & { homebrew: boolean };

const TIERS = [
  { key: "0-3", label: "Lv 0–3" },
  { key: "4-7", label: "Lv 4–7" },
  { key: "8-11", label: "Lv 8–11" },
  { key: "12+", label: "Lv 12+" },
];
function inTier(lv: number, tier: string): boolean {
  if (tier === "0-3") return lv <= 3;
  if (tier === "4-7") return lv >= 4 && lv <= 7;
  if (tier === "8-11") return lv >= 8 && lv <= 11;
  if (tier === "12+") return lv >= 12;
  return true;
}

function hbToMonster(data: Record<string, unknown>, name: string): Row {
  const r: Row = {
    name, ac: s(data.ac) || "10", hp: s(data.hp) || "1", atk: s(data.atk), mv: s(data.mv) || "near", lv: s(data.lv) || "1",
    homebrew: true,
  };
  if (s(data.mo)) r.mo = s(data.mo);
  for (const k of ["s", "d", "c", "i", "w", "ch", "acc", "ctl", "net"] as const) if (s(data[k])) r[k] = s(data[k]);
  if (data.shipScale === true) r.shipScale = true;
  if (s(data.desc)) r.desc = s(data.desc);
  if (s(data.notes)) r.notes = s(data.notes);
  return r;
}

function Stat({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return <span className={badge}>{label} <span className="text-[var(--text)]">{value}</span></span>;
}

export default async function DarkSpaceBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-monster" }),
    ownHomebrew(user.id, "ds-monster"),
    userCampaigns(user.id),
  ]);
  const hbRows: Row[] = hbVisible.map((h) => hbToMonster(h.data as Record<string, unknown>, h.name));
  const bookRows: Row[] = DS_MONSTERS.map((m) => ({ ...m, homebrew: false }));

  const raw = await searchParams;
  const q = one(raw.q).trim();
  const needle = q.toLowerCase();
  const tier = TIERS.some((t) => t.key === one(raw.tier)) ? one(raw.tier) : "";
  const current: Query = { q, tier };
  const rows = [...hbRows, ...bookRows]
    .filter((m) => !tier || inTier(parseInt(m.lv, 10) || 0, tier))
    .filter((m) => !needle || [m.name, m.desc, m.notes, m.atk].map((x) => x ?? "").join(" ").toLowerCase().includes(needle))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DarkSpaceHeader title="Bestiary" subtitle={`${DS_MONSTERS.length} denizens${hbRows.length ? ` + ${hbRows.length} homebrew` : ""}`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
        DarkSpace denizens — creatures, NPCs, digital entities, and legendary threats. Digital denizens use ACC/CTL/NET (Interface stats). Any Shadowdark monster also converts easily with a sci-fi reskin.
      </p>
      <div className="mb-6"><HomebrewEditor kind="ds-monster" campaigns={campaigns} initial={hbOwn} /></div>
      <SearchForm base={BASE} q={q} placeholder="Search denizens, attacks, abilities…" hidden={{ tier }} />
      <ChipRow label="Level" base={BASE} current={current} param="tier" options={TIERS} active={tier} />
      <CountLine count={rows.length} noun="denizen" base={BASE} filtered={Boolean(needle || tier)} />
      {rows.length === 0 ? <EmptyState noun="denizen" base={BASE} /> : null}

      {rows.length ? (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {rows.map((m, idx) => {
            const digital = m.acc != null;
            return (
              <li key={`${m.homebrew ? "hb" : "bk"}-${m.name}-${idx}`} className={cardCls}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className={nameCls}>{m.name}</h2>
                  {m.homebrew ? <span className={hbBadge}>Homebrew</span> : null}
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    LV {m.lv}{m.mo ? ` · ${motivLabel(m.mo)}` : ""}{m.shipScale ? " · Ship Scale" : ""}
                  </span>
                </div>
                {m.desc ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{m.desc}</p> : null}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Stat label="AC" value={m.ac} />
                  <Stat label="HP" value={m.hp} />
                  <Stat label="MV" value={m.mv} />
                </div>
                {m.atk ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">ATK:</span> {m.atk}</p> : null}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {digital ? (
                    <>
                      <Stat label="ACC" value={m.acc} /><Stat label="CTL" value={m.ctl} /><Stat label="NET" value={m.net} />
                    </>
                  ) : (
                    <>
                      <Stat label="STR" value={m.s} /><Stat label="DEX" value={m.d} /><Stat label="CON" value={m.c} />
                      <Stat label="INT" value={m.i} /><Stat label="WIS" value={m.w} /><Stat label="CHA" value={m.ch} />
                    </>
                  )}
                </div>
                {m.notes ? <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">{m.notes}</p> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
