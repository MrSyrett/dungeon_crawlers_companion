import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { NIMBLE_MONSTERS } from "@/lib/data/nimble-monsters";
import { NIMBLE_FAMILIES } from "@/lib/data/nimble-families";
import { NimbleHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, one, type Query, type RawQuery } from "@/components/NimbleRef";

export const dynamic = "force-dynamic";
const BASE = "/nimble/bestiary";
const FAMILIES = NIMBLE_FAMILIES.map((f) => ({ key: f.name, label: f.name }));
const levelNum = (l: string) => { const m = /^(\d+)(?:\/(\d+))?/.exec(l); return m ? (m[2] ? Number(m[1]) / Number(m[2]) : Number(m[1])) : 99; };

export default async function NimbleBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const fam = FAMILIES.some((f) => f.key === one(raw.fam)) ? one(raw.fam) : "";
  const kind = ["regular", "legendary", "minion"].includes(one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, fam, kind };
  const results = NIMBLE_MONSTERS.filter((m) => (!fam || m.family === fam) && (!kind || (kind === "legendary" ? m.legendary : kind === "minion" ? m.minion : !m.legendary)) && (!needle || [m.name, m.family, m.description ?? "", ...m.abilities.map((a) => a.name + " " + a.text)].join(" ").toLowerCase().includes(needle))).sort((a, b) => levelNum(a.level) - levelNum(b.level) || a.name.localeCompare(b.name));
  const famInfo = fam ? NIMBLE_FAMILIES.find((f) => f.name === fam) : null;
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <NimbleHeader title="Bestiary" subtitle={`${NIMBLE_MONSTERS.length} monsters · ${NIMBLE_FAMILIES.length} families`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">Monsters act together on their group&rsquo;s turn. <span className="font-mono text-[#9fe3bd]">M</span> = Medium armor (damage from dice only, no modifiers); <span className="font-mono text-[#9fe3bd]">H</span> = Heavy (half the dice, no modifiers). Crits and vulnerabilities ignore armor. Minions die to any damage and can&rsquo;t crit.</p>
      <SearchForm base={BASE} q={q} placeholder="Search monsters…" hidden={{ fam, kind }} />
      <ChipRow label="Family" base={BASE} current={current} param="fam" options={FAMILIES} active={fam} />
      <ChipRow label="Kind" base={BASE} current={current} param="kind" options={[{ key: "regular", label: "Regular" }, { key: "legendary", label: "Legendary" }, { key: "minion", label: "Minions" }]} active={kind} />
      {famInfo ? <section className={`${cardCls} mb-4`}><h2 className="text-base font-bold uppercase tracking-[0.12em] text-[#9fe3bd]">{famInfo.name}</h2><p className="mt-1 text-[12px] italic text-[var(--muted)]">{famInfo.blurb}</p>{famInfo.trait ? <p className="mt-1 text-[12px] text-[var(--text)]">{famInfo.trait}</p> : null}{famInfo.sampleEncounters?.length ? <ul className="mt-2 text-[12px] text-[var(--muted)]">{famInfo.sampleEncounters.map((s, i) => <li key={i}>{s}</li>)}</ul> : null}{famInfo.loot ? <p className="mt-2 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Loot:</span> {famInfo.loot}</p> : null}</section> : null}
      <CountLine count={results.length} noun="monster" base={BASE} filtered={Boolean(needle || fam || kind)} />
      {results.length === 0 ? <EmptyState noun="monster" base={BASE} /> : (
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{results.map((m) => (
          <li key={`${m.family}-${m.name}`} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className={nameCls}>{m.name}</h2>
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Lvl {m.level}{m.legendary ? " Solo" : ""}{m.size ? ` · ${m.size}` : ""}</span>
              <span className="font-mono text-[12px] text-[var(--text)]">{m.minion ? "minion" : `${m.hp ?? "—"} HP`}{m.armor ? ` · ${m.armor}` : ""}{m.saves ? ` · ${m.saves}` : ""}</span>
              <span className={badge}>{m.family} · p.{m.page}</span>
            </div>
            {m.description ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">{m.description}</p> : null}
            {m.familyTrait ? <p className="mt-1 text-[12px] text-[var(--muted)]">{m.familyTrait}</p> : null}
            <ul className="mt-2 flex flex-col gap-1">{m.abilities.map((a, i) => <li key={i} className="text-[13px] leading-relaxed text-[var(--text)]"><span className="font-semibold">{a.name}.</span> <span className="text-[var(--muted)]">{a.text}</span></li>)}</ul>
          </li>))}</ul>
      )}
    </div>
  );
}
