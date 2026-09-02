import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_CLASSES } from "@/lib/data/dnd-classes";
import { DndHeader, cardCls, badge, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/classes";
const sourceLabel: Record<string, string> = { srd: "SRD", phb: "PHB", eberron: "Eberron", dmg: "DMG", mm: "MM", "forgotten-realms": "FR" };

export default async function DndClassesPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.cls);
  const selected = DND_CLASSES.find((c) => c.name === pick) ?? null;

  if (!selected) {
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <DndHeader title="Classes" subtitle={`${DND_CLASSES.length} classes · levels 1–20`} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {DND_CLASSES.map((c) => (
            <li key={c.name} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <a href={`${BASE}?cls=${encodeURIComponent(c.name)}`} className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f] hover:underline">{c.name}</a>
                <span className={badge}>{sourceLabel[c.source] ?? c.source}</span>
              </div>
              <p className="mt-1 text-[12px] italic text-[var(--muted)]">{c.flavor}</p>
              <p className="mt-2 text-[12px] text-[var(--muted)]">
                <span className="font-semibold text-[var(--text)]">Hit Die:</span> d{c.hitDie} · <span className="font-semibold text-[var(--text)]">Primary:</span> {c.primaryAbility.join("/")} · <span className="font-semibold text-[var(--text)]">Saves:</span> {c.savingThrows.join(", ")}
                {c.spellcasting !== "none" ? <> · <span className="font-semibold text-[var(--text)]">Caster:</span> {c.spellcasting}</> : null}
              </p>
              <p className="mt-1 text-[11px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{c.subclassLabel}:</span> {c.subclasses.map((s) => s.name).join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const c = selected;
  const columns = [...new Set(c.table.flatMap((r) => Object.keys(r.columns ?? {})))];
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DndHeader title={c.name} subtitle={`d${c.hitDie} · ${c.primaryAbility.join("/")} · ${c.spellcasting !== "none" ? c.spellcasting + " caster" : "martial"}`} />
      <a href={BASE} className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--dnd)] hover:underline">← All classes</a>

      <section className={cardCls}>
        <p className="text-[13px] leading-relaxed text-[var(--text)]">{c.flavor}</p>
        <dl className="mt-3 grid gap-x-6 gap-y-1 text-[12px] text-[var(--muted)] md:grid-cols-2">
          <div><dt className="inline font-semibold text-[var(--text)]">Hit Die:</dt> <dd className="inline">d{c.hitDie}</dd></div>
          <div><dt className="inline font-semibold text-[var(--text)]">Saving Throws:</dt> <dd className="inline">{c.savingThrows.join(", ")}</dd></div>
          <div><dt className="inline font-semibold text-[var(--text)]">Armor:</dt> <dd className="inline">{c.proficiencies.armor.join(", ") || "None"}</dd></div>
          <div><dt className="inline font-semibold text-[var(--text)]">Weapons:</dt> <dd className="inline">{c.proficiencies.weapons.join(", ") || "None"}</dd></div>
          {c.proficiencies.tools.length ? <div className="md:col-span-2"><dt className="inline font-semibold text-[var(--text)]">Tools:</dt> <dd className="inline">{c.proficiencies.tools.join(", ")}</dd></div> : null}
          <div className="md:col-span-2"><dt className="inline font-semibold text-[var(--text)]">Skills:</dt> <dd className="inline">Choose {c.proficiencies.skillsChoose} from {c.proficiencies.skillsFrom.join(", ")}</dd></div>
          <div className="md:col-span-2"><dt className="inline font-semibold text-[var(--text)]">Starting Equipment:</dt> <dd className="inline">{c.startingEquipment.join(" — or — ")}</dd></div>
        </dl>
      </section>

      <section className={`${cardCls} mt-4 overflow-x-auto`}>
        <h3 className="mb-2 text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">Level Progression</h3>
        <table className="w-full border-collapse text-[11.5px]">
          <thead>
            <tr className="text-left text-[var(--muted)]">
              <th className="border-b border-[var(--border)] px-2 py-1">Lvl</th>
              <th className="border-b border-[var(--border)] px-2 py-1">PB</th>
              <th className="border-b border-[var(--border)] px-2 py-1">Features</th>
              {columns.map((col) => <th key={col} className="border-b border-[var(--border)] px-2 py-1 text-center">{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {c.table.map((r) => (
              <tr key={r.level} className="align-top">
                <td className="border-b border-[var(--border)] px-2 py-1 font-mono text-[#f0a37f]">{r.level}</td>
                <td className="border-b border-[var(--border)] px-2 py-1 font-mono text-[var(--muted)]">+{r.profBonus}</td>
                <td className="border-b border-[var(--border)] px-2 py-1 text-[var(--muted)]">{r.features.join(", ") || "—"}</td>
                {columns.map((col) => <td key={col} className="border-b border-[var(--border)] px-2 py-1 text-center font-mono text-[var(--muted)]">{r.columns?.[col] ?? "—"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h3 className="mb-2 text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">Class Features</h3>
        <div className="flex flex-col gap-2">
          {c.features.filter((f) => !f.subclass).map((f, i) => (
            <p key={i} className="text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-mono text-[11px] text-[var(--dnd)]">L{f.level}</span> <span className="font-semibold text-[var(--text)]">{f.name}.</span> {f.description}</p>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h3 className="mb-2 text-base font-bold uppercase tracking-[0.12em] text-[#f0a37f]">{c.subclassLabel}s</h3>
        <div className="flex flex-col gap-3">
          {c.subclasses.map((s) => (
            <div key={s.name} className={cardCls}>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-[var(--text)]">{s.name}</h4>
                <span className={badge}>{sourceLabel[s.source] ?? s.source}</span>
              </div>
              <p className="mt-1 text-[12px] italic text-[var(--muted)]">{s.flavor}</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {s.features.map((f, i) => (
                  <p key={i} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-mono text-[11px] text-[var(--dnd)]">L{f.level}</span> <span className="font-semibold text-[var(--text)]">{f.name}.</span> {f.description}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
