import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_MONSTERS } from "@/lib/data/dnd-monsters";
import type { DndMonster, DndMonsterAction } from "@/lib/data/dnd-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import DndHomebrewEditor from "@/components/DndHomebrewEditor";
import { DndHeader, ChipRow, SearchForm, CountLine, EmptyState, cardCls, badge, one, withParams, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/bestiary";
const hbBadge = "rounded border border-[var(--dnd)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#f0a37f]";
const isHb = (x: { source?: string }) => x.source === "Homebrew";

// CR sort key so "1/8" < "1/2" < "1" < "10".
function crVal(cr: string): number {
  if (cr.includes("/")) { const [a, b] = cr.split("/").map(Number); return a / b; }
  return Number(cr) || 0;
}
const GROUP_ORDER = ["Humanoids", "Beasts", "Monstrosities", "Undead", "Fiends", "Celestials", "Fey", "Dragons", "Giants", "Elementals", "Constructs", "Aberrations", "Oozes", "Plants"];

const mod = (n: number) => Math.floor((n - 10) / 2);
const sgn = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

function ActionList({ title, items, color }: { title: string; items?: DndMonsterAction[]; color?: string }) {
  if (!items || !items.length) return null;
  return (
    <section className="mt-3">
      <h4 className="mb-1 border-b border-[var(--border)] pb-1 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: color ?? "#f0a37f" }}>{title}</h4>
      <div className="flex flex-col gap-1.5">
        {items.map((a, i) => (
          <p key={i} className="text-[12.5px] leading-relaxed text-[var(--muted)]">
            <span className="font-semibold italic text-[var(--text)]">{a.name}.</span> {a.description}
          </p>
        ))}
      </div>
    </section>
  );
}

function StatBlock({ m }: { m: DndMonster }) {
  const line = (label: string, val?: string) => (val ? <div><span className="font-semibold text-[var(--text)]">{label}:</span> <span className="text-[var(--muted)]">{val}</span></div> : null);
  return (
    <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--dnd)" }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{m.name}</h2>
          <p className="text-[12px] italic text-[var(--muted)]">{m.size} {m.type}, {m.alignment}</p>
        </div>
        <span className={badge}>CR {m.cr} · {m.xp.toLocaleString()} XP</span>
      </div>
      <div className="mt-3 grid gap-x-6 gap-y-0.5 text-[12.5px] md:grid-cols-2">
        {line("Armor Class", `${m.ac}${m.acNote ? " " + m.acNote : ""}`)}
        {line("Hit Points", m.hpFormula)}
        {line("Speed", m.speed)}
        {line("Proficiency Bonus", sgn(m.proficiencyBonus))}
      </div>
      <div className="mt-3 grid grid-cols-6 gap-1 text-center">
        {(["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const).map((a) => (
          <div key={a} className="rounded border border-[var(--border)] bg-[var(--panel-2)] py-1">
            <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a}</div>
            <div className="font-mono text-sm font-bold text-[var(--text)]">{m.abilities[a]}</div>
            <div className="font-mono text-[10px] text-[#f0a37f]">{sgn(mod(m.abilities[a]))}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-0.5 text-[12px]">
        {line("Saving Throws", m.savingThrows)}
        {line("Skills", m.skills)}
        {line("Damage Resistances", m.damageResistances)}
        {line("Damage Immunities", m.damageImmunities)}
        {line("Damage Vulnerabilities", m.damageVulnerabilities)}
        {line("Condition Immunities", m.conditionImmunities)}
        {line("Senses", m.senses)}
        {line("Languages", m.languages || "—")}
      </div>
      <ActionList title="Traits" items={m.traits} />
      <ActionList title="Actions" items={m.actions} />
      <ActionList title="Bonus Actions" items={m.bonusActions} />
      <ActionList title="Reactions" items={m.reactions} />
      <ActionList title="Legendary Actions" items={m.legendaryActions} color="#e8c84a" />
    </div>
  );
}

export default async function DndBestiaryPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim();
  const group = one(raw.group);
  const cr = one(raw.cr);
  const pick = one(raw.m);
  const src = ["book", "hb"].includes(one(raw.src)) ? one(raw.src) : "";

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "dnd-monster" }),
    ownHomebrew(user.id, "dnd-monster"),
    userCampaigns(user.id),
  ]);
  const hbMonsters = hbVisible.map((h) => h.data as unknown as DndMonster);
  const allMonsters = [...hbMonsters, ...DND_MONSTERS];

  const groups = GROUP_ORDER.filter((g) => allMonsters.some((m) => m.group === g));
  const crs = [...new Set(allMonsters.map((m) => m.cr))].sort((a, b) => crVal(a) - crVal(b));

  const selected = pick ? allMonsters.find((m) => m.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <DndHeader title="Bestiary" subtitle={`${DND_MONSTERS.length} creatures`} />
        <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--dnd)] hover:underline">← All creatures</a>
        <StatBlock m={selected} />
      </div>
    );
  }

  let list = allMonsters.slice();
  if (src === "hb") list = list.filter(isHb);
  if (src === "book") list = list.filter((m) => !isHb(m));
  if (group) list = list.filter((m) => m.group === group);
  if (cr) list = list.filter((m) => m.cr === cr);
  if (q) { const n = q.toLowerCase(); list = list.filter((m) => m.name.toLowerCase().includes(n) || m.type.toLowerCase().includes(n)); }
  list.sort((a, b) => crVal(a.cr) - crVal(b.cr) || a.name.localeCompare(b.name));

  const current = { q, group, cr, src };
  const filtered = !!(q || group || cr || src);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DndHeader title="Bestiary" subtitle={`${DND_MONSTERS.length} creatures${hbMonsters.length ? ` + ${hbMonsters.length} homebrew` : ""} · CR 0–30`} />
      <DndHomebrewEditor kind="dnd-monster" campaigns={campaigns} initial={hbOwn} />
      <SearchForm base={BASE} q={q} placeholder="Search creatures by name or type…" hidden={{ group, cr, src }} />
      <ChipRow label="Type" base={BASE} current={current} param="group" options={groups.map((g) => ({ key: g, label: g }))} active={group} />
      <ChipRow label="CR" base={BASE} current={current} param="cr" options={crs.map((c) => ({ key: c, label: c }))} active={cr} />
      <ChipRow label="Source" base={BASE} current={current} param="src" options={[{ key: "book", label: "Official" }, { key: "hb", label: "Homebrew" }]} active={src} />
      <CountLine count={list.length} noun="creature" base={BASE} filtered={filtered} />
      {list.length === 0 ? (
        <EmptyState noun="creature" base={BASE} />
      ) : (
        <ul className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m, i) => (
            <li key={`${m.name}-${i}`} className={cardCls}>
              <a href={withParams(BASE, current, { m: m.name })} className="text-base font-bold uppercase tracking-[0.1em] text-[#f0a37f] hover:underline">{m.name} {isHb(m) ? <span className={hbBadge}>HB</span> : null}</a>
              <p className="mt-0.5 text-[11px] italic text-[var(--muted)]">{m.size} {m.type}</p>
              <p className="mt-1.5 flex flex-wrap gap-2 text-[11px] text-[var(--muted)]">
                <span><span className="font-semibold text-[var(--text)]">CR</span> {m.cr}</span>
                <span><span className="font-semibold text-[var(--text)]">AC</span> {m.ac}</span>
                <span><span className="font-semibold text-[var(--text)]">HP</span> {m.hp}</span>
                {m.legendaryActions?.length ? <span className="text-[#e8c84a]">Legendary</span> : null}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
