import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DB_KIN, DB_TABLES, DB_KIN_TABLE20, DB_KIN_LORE, DB_NPC_TRAITS } from "@/lib/data/db-data";
import type { DbKin } from "@/lib/data/db-types";
import { DbHeader, BackLink, RuleNote, cardCls, nameCls, badge, eyebrow, sectionH, th, td, one, srcPage, type RawQuery } from "@/components/DbRef";

export const dynamic = "force-dynamic";
const BASE = "/dragonbane/kin";
// Core kin (Core Rules p.10–13) and the nine playable kin from the Bestiary (ch.1–2).
// The Bestiary's D20 kin table replaces the core D12 one when its kin are in play.

const wpText = (wp: number | string | null) => (wp == null ? "No WP" : wp === "varies" ? "WP varies" : `${wp} WP`);
const timingText = (t: string) => ({ action: "Action", free: "No action", reaction: "Reaction", passive: "Always on", downtime: "During rest", rest: "During rest", roundStart: "Start of round" } as Record<string, string>)[t] ?? t;
const rollRange = (r?: [number, number]) => !r ? "—" : (r[0] === r[1] ? `${r[0]}` : `${r[0]}–${r[1]}`);
const isCore = (k: DbKin) => (k.source ?? "core") === "core";
const TRAITS = DB_NPC_TRAITS as Record<string, string>;

function KinDetail({ k }: { k: DbKin }) {
  const lore = DB_KIN_LORE.find((l) => l.kin === k.name);
  const traits = (k.traits as string[] | undefined) ?? [];
  return (
    <div className={`${cardCls} border-l-4`} style={{ borderLeftColor: "var(--db)" }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-3xl text-[var(--sys-link)]">{k.name}</h2>
        <span className="flex flex-wrap gap-1.5">
          <span className={badge}>D20 {rollRange(k.roll20)}</span>
          {k.roll ? <span className={badge}>D12 {rollRange(k.roll)}</span> : null}
          <span className={badge}>Movement {k.movement}</span>
          {!isCore(k) ? <span className={badge}>Bestiary</span> : null}
        </span>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted)]">{k.text}</p>
      <h3 className={`${sectionH} mt-5`}>Innate {k.abilities.length > 1 ? "abilities" : "ability"}</h3>
      <div className="flex flex-col gap-3">
        {k.abilities.map((a) => (
          <div key={a.id} className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-lg text-[var(--text)]">{a.name}</p>
              <span className="flex gap-1.5"><span className={badge}>{wpText(a.wp)}</span><span className={badge}>{timingText(a.timing)}</span></span>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{a.text}</p>
            {a.wpNote ? <p className="mt-1 text-[12px] italic text-[var(--muted)]">{String(a.wpNote)}</p> : null}
          </div>
        ))}
      </div>
      {k.pcNotes || traits.length ? (
        <>
          <h3 className={`${sectionH} mt-5`}>As a player character</h3>
          {traits.length ? (
            <dl className="flex flex-col gap-1 text-[13px] text-[var(--muted)]">
              {traits.map((t) => <div key={t}><dt className="inline font-semibold text-[var(--text)]">{t}:</dt> <dd className="inline">{TRAITS[t] ?? ""}</dd></div>)}
            </dl>
          ) : null}
          {k.pcNotes ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{k.pcNotes}</p> : null}
          {!isCore(k) ? <p className="mt-2 text-[12px] italic text-[var(--muted)]">Bestiary kin are playable if your gaming group agrees. Create the character in the usual way — the NPC stat blocks show typical members, not player characters.</p> : null}
        </>
      ) : null}
      <h3 className={`${sectionH} mt-5`}>Names</h3>
      <ol className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-[13px] text-[var(--muted)] sm:grid-cols-3">
        {k.names.map((n, i) => <li key={n}><span className="mr-2 font-mono text-[11px] text-[var(--db-ink)]">{i + 1}</span>{n}</li>)}
      </ol>
      {lore ? (
        <>
          <h3 className={`${sectionH} mt-5`}>For the GM</h3>
          {lore.encounter ? <p className="text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Random encounter.</span> {lore.encounter}</p> : null}
          {lore.seed ? <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Adventure seed.</span> {lore.seed}</p> : null}
          <p className="mt-2 text-[13px]"><a className="text-[var(--sys-link)] underline" href={`/dragonbane/bestiary?tab=npcs&kind=${encodeURIComponent(k.name)}`}>{k.name} NPC stat blocks →</a></p>
        </>
      ) : null}
      <p className="mt-4 text-[12px] italic text-[var(--muted)]">Only this kin can have its innate ability. It sits in the Abilities &amp; Spells box on the sheet. {srcPage(k)}.</p>
    </div>
  );
}

function KinCard({ k }: { k: DbKin }) {
  return (
    <li className={cardCls}>
      <a href={`${BASE}?k=${k.id}`} className="group block">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`${nameCls} group-hover:underline`}>{k.name}</h3>
          <span className="flex gap-1.5">{!isCore(k) ? <span className={badge}>Bestiary</span> : null}<span className={badge}>D20 {rollRange(k.roll20)}</span></span>
        </div>
        <p className="mt-1 line-clamp-3 text-[12.5px] leading-relaxed text-[var(--muted)]">{k.text}</p>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[12px] text-[var(--muted)]">
          <span><span className="font-semibold text-[var(--text)]">Movement:</span> {k.movement}</span>
          <span><span className="font-semibold text-[var(--text)]">Innate:</span> {k.abilities.map((a) => `${a.name} (${wpText(a.wp)})`).join(", ")}</span>
        </p>
      </a>
    </li>
  );
}

export default async function DbKinPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.k);
  const selected = pick ? DB_KIN.find((k) => k.id === pick || k.name === pick) ?? null : null;
  if (selected) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <DbHeader title="Kin" subtitle={`${selected.name} · movement ${selected.movement}`} />
        <BackLink href={BASE} label="All kin" />
        <KinDetail k={selected} />
      </div>
    );
  }
  const core = DB_KIN.filter(isCore), bestiary = DB_KIN.filter((k) => !isCore(k));

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DbHeader title="Kin" subtitle={`${DB_KIN.length} playable kin · ${core.length} core + ${bestiary.length} from the Bestiary · roll D20 or choose`} />
      <RuleNote title="Choosing a kin">
        <p>Kin sets your base Movement, your innate ability (mallards have two) and a list of typical names. Everyone speaks, reads and writes the common tongue; other kin also know their own language. Most innate abilities cost Willpower Points to use.</p>
        <p className="mt-1.5">The Bestiary adds nine kin — orcs, ogres, goblins, hobgoblins, frog people, karkions, cat people, lizard people and satyrs — playable if your group agrees. All have base Movement 10. With them in play, roll on the D20 table below instead of the core D12 table.</p>
      </RuleNote>

      <h2 className={sectionH}>Core kin</h2>
      <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{core.map((k) => <KinCard key={k.id} k={k} />)}</ul>
      {bestiary.length ? (
        <>
          <h2 className={`${sectionH} mt-8`}>Bestiary kin</h2>
          <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{bestiary.map((k) => <KinCard key={k.id} k={k} />)}</ul>
        </>
      ) : null}

      <section className="mt-8">
        <h2 className={sectionH}>Kin table (D20)</h2>
        <table className="w-full border-collapse">
          <thead><tr><th className={th}>D20</th><th className={th}>Kin</th><th className={th}>Ability</th><th className={th}>Core D12</th></tr></thead>
          <tbody>{DB_KIN_TABLE20.map((r) => { const k = DB_KIN.find((x) => x.name === r.kin); return <tr key={r.kin}><td className={td}>{rollRange(r.roll)}</td><td className={td}>{k ? <a className="underline" href={`${BASE}?k=${k.id}`}>{r.kin}</a> : r.kin}</td><td className={td}>{r.ability}</td><td className={td}>{k?.roll ? rollRange(k.roll) : "—"}</td></tr>; })}</tbody>
        </table>
      </section>

      <section className="mt-8">
        <h2 className={sectionH}>Movement</h2>
        <p className="mb-2 text-[13px] text-[var(--muted)]">Metres you can run in a combat round: your kin&apos;s base, adjusted by AGL.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>Kin</th><th className={th}>Base</th></tr></thead>
            <tbody>{DB_KIN.map((k) => <tr key={k.id}><td className={td}>{k.name}</td><td className={td}>{k.movement}</td></tr>)}</tbody>
          </table>
          <table className="w-full border-collapse">
            <thead><tr><th className={th}>AGL</th><th className={th}>Modifier</th></tr></thead>
            <tbody>{DB_TABLES.movementAgl.map((r) => <tr key={r.min}><td className={td}>{r.min}–{r.max}</td><td className={td}>{r.mod > 0 ? `+${r.mod}` : r.mod === 0 ? "—" : r.mod}</td></tr>)}</tbody>
          </table>
        </div>
        <p className={`${eyebrow} mt-3`}>Core kin table (D12)</p>
        <p className="text-[13px] text-[var(--muted)]">{core.map((k) => `${rollRange(k.roll)} ${k.name}`).join(" · ")}</p>
      </section>
    </div>
  );
}
