import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SW_TEMPLATES } from "@/lib/data/sw-templates";
import { SW_TABLES } from "@/lib/data/sw-tables";
import { SW_ATTRIBUTES } from "@/lib/data/sw-types";
import { SwHeader, SearchForm, ChipRow, CountLine, EmptyState, cardCls, nameCls, badge, code, one, type Query, type RawQuery } from "@/components/SwRef";

export const dynamic = "force-dynamic";
const BASE = "/sw/templates";
// A rough archetype filter: which attribute the template leans on hardest.
const LEANS = [
  { key: "Dexterity", label: "Fighters" }, { key: "Mechanical", label: "Pilots" }, { key: "Knowledge", label: "Thinkers" },
  { key: "Perception", label: "Talkers" }, { key: "Strength", label: "Bruisers" }, { key: "Technical", label: "Techs" }, { key: "force", label: "Force users" },
];
const isForce = (t: (typeof SW_TEMPLATES)[number]) => /Force skills?:/i.test(t.specialRule ?? "");
const lean = (t: (typeof SW_TEMPLATES)[number]) => SW_ATTRIBUTES.reduce((best, a) => (t.attributes[a] > t.attributes[best] ? a : best), SW_ATTRIBUTES[0]);

export default async function SwTemplatesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim(); const needle = q.toLowerCase();
  const kind = LEANS.some((l) => l.key === one(raw.kind)) ? one(raw.kind) : "";
  const current: Query = { q, kind };
  const results = SW_TEMPLATES.filter((t) => (!kind || (kind === "force" ? isForce(t) : lean(t) === kind)) && (!needle || [t.name, t.background, t.personality, t.quote ?? "", t.specialRule ?? "", t.equipment.join(" ")].join(" ").toLowerCase().includes(needle)));
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <SwHeader title="Character Templates" subtitle={`${SW_TEMPLATES.length} templates · pick one, add ${SW_TABLES.creation.skillDice}D of skills`} />
      <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">{SW_TABLES.creation.templateNote}</p>
      <SearchForm base={BASE} q={q} placeholder="Search templates…" hidden={{ kind }} />
      <ChipRow label="Leans on" base={BASE} current={current} param="kind" options={LEANS} active={kind} />
      <CountLine count={results.length} noun="template" base={BASE} filtered={Boolean(needle || kind)} />
      {results.length === 0 ? <EmptyState noun="template" base={BASE} /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((t) => (
            <article key={t.name} className={cardCls}>
              <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className={nameCls}>{t.name}</h2><span className={badge}>p.{t.page}{isForce(t) ? " · Force" : ""}</span></div>
              <div className="mt-3 grid grid-cols-3 gap-1 sm:grid-cols-6">{SW_ATTRIBUTES.map((a) => <div key={a} className="rounded border border-[var(--border)] bg-[var(--panel-2)] px-1 py-1.5 text-center"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{a.slice(0, 4)}</div><div className="font-mono text-[13px] text-[#f0c020]">{code(t.attributes[a])}</div></div>)}</div>
              {t.quote ? <p className="mt-3 text-[13px] italic leading-relaxed text-[var(--text)]">&ldquo;{t.quote}&rdquo;</p> : null}
              <details className="mt-2"><summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.15em] text-[#f0c020]">Background & personality</summary>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{t.background}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Personality.</span> {t.personality}</p>
                {t.connection ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Connection.</span> {t.connection}</p> : null}
              </details>
              {t.specialRule ? <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Special.</span> {t.specialRule}</p> : null}
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Equipment.</span> {t.equipment.join(", ")}{t.credits ? ` · ${t.credits}` : ""}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
