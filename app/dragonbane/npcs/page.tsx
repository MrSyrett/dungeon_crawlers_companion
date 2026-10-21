import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_NPCS, DB_ANIMALS, DB_NPC_TRAITS, DB_NPC_ATTRIBUTES, DB_GM_TABLES } from "@/lib/data/db-data";
import type { DbNpc } from "@/lib/data/db-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DbHeader, ChipRow, SearchForm, CountLine, EmptyState, SectionNav, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, th, td, one, isHb, srcKey, srcChips, type RawQuery } from "@/components/DbRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/npcs";
const KIND_ORDER = ["Typical", "Goblin", "Orc", "Skeleton"];
const KIND_LABEL: Record<string, string> = { Typical: "Typical NPCs", Goblin: "Goblins", Orc: "Orcs", Skeleton: "Skeletons" };

const dmgText = (d: DbNpc["damageBonus"]) => (d && Object.keys(d).length ? Object.entries(d).map(([k, v]) => `${k} +${v}`).join(", ") : "—");

function NpcCard({ n }: { n: DbNpc }) {
  const skills = Object.entries(n.skills).map(([k, v]) => `${k} ${v}`).join(", ");
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className={nameCls}>{n.name} {isHb(n) ? <span className={hbBadge}>HB</span> : null}</h3>
        <span className="flex shrink-0 gap-1.5">{n.boss ? <span className={badge}>Boss</span> : null}<span className={badge}>{n.kind}</span></span>
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1 text-center">
        {[["Mov", n.movement ?? "—"], ["Dmg bonus", dmgText(n.damageBonus)], ["HP", n.hp], ["WP", n.wp ?? "—"]].map(([k, v]) => (
          <div key={String(k)} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1">
            <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{k}</div>
            <div className="font-mono text-[12.5px] font-bold text-[var(--text)]">{v}</div>
          </div>
        ))}
      </div>
      <dl className="mt-2 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
        {n.armor ? <div><dt className="inline font-semibold text-[var(--text)]">Armor:</dt> <dd className="inline">{n.armor.name} ({n.armor.rating})</dd></div> : null}
        {skills ? <div><dt className="inline font-semibold text-[var(--text)]">Skills:</dt> <dd className="inline">{skills}</dd></div> : null}
        {n.abilities.length ? <div><dt className="inline font-semibold text-[var(--text)]">Heroic abilities:</dt> <dd className="inline">{n.abilities.join(", ")}</dd></div> : null}
        {n.spells?.length ? <div><dt className="inline font-semibold text-[var(--text)]">Spells:</dt> <dd className="inline">{n.spells.join(", ")}</dd></div> : null}
        {n.weapons?.length ? <div><dt className="inline font-semibold text-[var(--text)]">Weapons:</dt> <dd className="inline">{n.weapons.map((w) => `${w.qty && w.qty > 1 ? `${w.qty}× ` : ""}${w.name} (skill ${w.skill}, ${w.damage})`).join("; ")}</dd></div> : null}
        {n.gear?.length ? <div><dt className="inline font-semibold text-[var(--text)]">Gear:</dt> <dd className="inline">{n.gear.join(", ")}</dd></div> : null}
      </dl>
      {n.traits?.length ? <Bullets className="mt-1.5" items={n.traits.map((t) => DB_NPC_TRAITS[t as keyof typeof DB_NPC_TRAITS] ? `${t}: ${DB_NPC_TRAITS[t as keyof typeof DB_NPC_TRAITS]}` : t)} /> : null}
    </>
  );
}

export default async function DbNpcsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;

  const [hbV, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "db-npc" }),
    ownHomebrew(user.id, "db-npc"),
    userCampaigns(user.id),
  ]);
  const hbNpcs = hbV.map((h) => h.data as unknown as DbNpc);
  const all = [...hbNpcs, ...DB_NPCS];

  const q = one(raw.q).trim().toLowerCase();
  const kinds = [...KIND_ORDER.filter((k) => all.some((n) => n.kind === k)), ...[...new Set(all.map((n) => n.kind))].filter((k) => !KIND_ORDER.includes(k)).sort()];
  const kind = kinds.includes(one(raw.kind)) ? one(raw.kind) : "";
  const roles = [{ key: "minion", label: "Minions" }, { key: "boss", label: "Bosses" }];
  const role = roles.some((r) => r.key === one(raw.role)) ? one(raw.role) : "";
  const srcOpts = srcChips(all.map((n) => n.source));
  const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
  const current = { q: one(raw.q), kind, role, src };
  const facets = (n: DbNpc) => ({ kind: n.kind, role: n.boss ? "boss" : "minion", src: srcKey(n.source) });
  const show = (n: DbNpc) => facetMatch(facets(n), current) && (!q || n.name.toLowerCase().includes(q));
  const list = all.slice().sort((a, b) => (kinds.indexOf(a.kind) - kinds.indexOf(b.kind)) || Number(!!a.boss) - Number(!!b.boss) || a.name.localeCompare(b.name));
  const shown = list.filter(show).length;
  const gen = DB_GM_TABLES.npc;
  const A = DB_NPC_ATTRIBUTES;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <DbHeader title="NPCs" subtitle={`${DB_NPCS.length} stat blocks · ${DB_ANIMALS.length} animals${hbNpcs.length ? ` · +${hbNpcs.length} homebrew` : ""}`} />
      <HomebrewEditor kind="db-npc" campaigns={campaigns} initial={hbOwn} />
      <SectionNav items={[{ id: "npcs", label: "Stat Blocks" }, { id: "running", label: "Running NPCs" }, { id: "animals", label: "Common Animals" }, { id: "generator", label: "Random NPCs" }]} />

      <section id="npcs" className="scroll-mt-20">
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search NPCs…" hidden={{ kind, role, src }} />
          <ChipRow label="Group" base={BASE} current={current} param="kind" options={kinds.map((k) => ({ key: k, label: KIND_LABEL[k] ?? k }))} active={kind} />
          <ChipRow label="Role" base={BASE} current={current} param="role" options={roles} active={role} />
          <ChipRow label="Source" base={BASE} current={current} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="NPC" base={BASE} filtered={!!(q || kind || role || src)} />
          <EmptyState noun="NPC" base={BASE} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
            {list.map((n, i) => <li key={`${n.id}-${i}`} className={cardCls} hidden={!show(n)} data-f={facetAttr(facets(n))}><NpcCard n={n} /></li>)}
          </ul>
        </InstantFilter>
      </section>

      <section id="running" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Running NPCs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardCls}>
            <p className={eyebrow}>Minions &amp; bosses</p>
            <Bullets className="mt-1" items={[A.minions, A.bosses, "Roll for NPCs only when what they do affects a player character directly; an unlisted skill is level 5. At zero HP an NPC makes no death rolls — the GM decides."]} />
          </div>
          <div className={cardCls}>
            <p className={eyebrow}>NPC attributes</p>
            <dl className="mt-1 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">{(["STR", "AGL", "CON", "WIL", "INT", "CHA"] as const).map((k) => <div key={k}><dt className="inline font-semibold text-[var(--text)]">{k}:</dt> <dd className="inline">{A[k]}</dd></div>)}</dl>
          </div>
        </div>
      </section>

      <section id="animals" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Common animals</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--panel)]">
          <table className="w-full min-w-[560px] border-collapse">
            <thead><tr>{["Animal", "Movement", "HP", "Attack", "Skills"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
            <tbody>{DB_ANIMALS.map((a) => (
              <tr key={a.id}>
                <td className={`${td} font-semibold text-[var(--text)]`}>{a.name}</td><td className={td}>{a.movement}</td><td className={td}>{a.hp}</td>
                <td className={td}>{a.attack.name} (skill {a.attack.skill}, {a.attack.damage})</td>
                <td className={td}>{Object.entries(a.skills).map(([k, v]) => `${k} ${v}`).join(", ")}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section id="generator" className="mt-10 scroll-mt-20">
        <h2 className={sectionH}>Random NPCs</h2>
        <p className="mb-3 text-[13px] text-[var(--muted)]">{gen.note} The name column lists three options per roll — pick one.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(gen.columns ?? []).map((c) => (
            <div key={c.die} className={cardCls}>
              <p className="font-label text-[13px] tracking-[0.06em] text-[var(--sys-sub)]">{c.name}<span className="ml-2 font-mono text-[11px] text-[var(--db-ink)]">{c.die}</span></p>
              <ol className="mt-1.5 flex flex-col gap-0.5 text-[12.5px] text-[var(--muted)]">
                {c.values.map((v, i) => <li key={i}><span className="mr-2 inline-block w-6 font-mono text-[11px] text-[var(--db-ink)]">{i + 1}</span>{v}</li>)}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
