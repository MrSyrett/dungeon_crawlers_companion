import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_CALLINGS, LOTR_SHADOW, LOTR_FIGHTING_STYLES, LOTR_CRAFTS, LOTR_MULTICALLING, LOTR_TABLES, LOTR_REWARD_LEVELS } from "@/lib/data/lotr-data";
import type { LotrCalling } from "@/lib/data/lotr-types";
import { LotrHeader, BackLink, SectionNav, Field, cardCls, nameCls, badge, eyebrow, sectionH, th, td, one, type RawQuery } from "@/components/LotrRef";

export const dynamic = "force-dynamic";
const BASE = "/lotr/callings";
const FLAW_TEXT = LOTR_SHADOW.flawText as Record<string, string>;
const lvls = (a: number[]) => (a.length ? a.map((n) => ordinal(n)).join(", ") : "—");
function ordinal(n: number): string { return n + (n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"); }

// Extra progression columns: the table's own columns (Sneak Attack, Craft Slots,
// Lore Die) plus the Warden's per-level counts, which live on separate arrays.
function progressionColumns(c: LotrCalling): { label: string; at: (i: number) => string }[] {
  const cols: { label: string; at: (i: number) => string }[] = [];
  const own = [...new Set(c.table.flatMap((r) => Object.keys(r.columns ?? {})))];
  for (const k of own) cols.push({ label: k, at: (i) => String(c.table[i]?.columns?.[k] ?? "—") });
  if (c.favouredFoeCount?.length) cols.push({ label: "Favoured Foes", at: (i) => String(c.favouredFoeCount?.[i] ?? "—") });
  if (c.wardedLandCount?.length) cols.push({ label: "Warded Lands", at: (i) => String(c.wardedLandCount?.[i] ?? "—") });
  return cols;
}

export default async function LotrCallingsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const pick = one(raw.c);
  const selected = LOTR_CALLINGS.find((c) => c.name === pick) ?? null;

  if (!selected) {
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <LotrHeader title="Callings" subtitle={`${LOTR_CALLINGS.length} callings · levels 1–${LOTR_TABLES.maxLevel} · no spellcasting`} />
        <SectionNav items={[{ id: "styles", label: "Fighting Styles" }, { id: "crafts", label: "Crafts" }, { id: "multi", label: "Multiple Callings" }, { id: "beyond", label: "Beyond 10th" }]} />
        <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
          {LOTR_CALLINGS.map((c) => (
            <li key={c.name} className={cardCls}>
              <div className="flex items-start justify-between gap-2">
                <a href={`${BASE}?c=${encodeURIComponent(c.name)}`} className={`${nameCls} hover:underline`}>{c.name}</a>
                <span className={badge}>d{c.hitDie}</span>
              </div>
              <p className="mt-1 text-[13px] italic leading-snug text-[var(--muted)]">{c.flavor}</p>
              <p className="mt-2 text-[12.5px] text-[var(--muted)]">
                <span className="font-semibold text-[var(--text)]">Hit Die:</span> d{c.hitDie} · <span className="font-semibold text-[var(--text)]">Primary:</span> {c.primaryAbility.join("/")} · <span className="font-semibold text-[var(--text)]">Saves:</span> {c.savingThrows.join(", ")}
              </p>
              <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{c.subclassLabel}:</span> {c.subclasses.map((s) => s.name).join(", ")}</p>
              <p className="mt-1 text-[12px] text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Shadow Path:</span> <span className="text-[var(--sys-link)]">{c.shadowPath}</span></p>
            </li>
          ))}
        </ul>

        <section id="styles" className="mt-10 scroll-mt-20">
          <h2 className={sectionH}>Fighting Styles</h2>
          <p className="mb-3 text-[13px] text-[var(--muted)]">Captains, Champions and Wardens pick a style from their calling&rsquo;s list at 2nd level.</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {LOTR_FIGHTING_STYLES.map((f) => (
              <div key={f.name} className={cardCls}>
                <h3 className="text-lg text-[var(--sys-link)]">{f.name}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{f.description}</p>
                <p className="mt-1.5 text-[11px] text-[var(--muted)]">{LOTR_CALLINGS.filter((c) => c.fightingStyles.includes(f.name)).map((c) => c.name).join(" · ") || "—"}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="crafts" className="mt-10 scroll-mt-20">
          <h2 className={sectionH}>Crafts</h2>
          <p className="mb-3 text-[13px] text-[var(--muted)]">Scholars gain craft slots as they level; other callings may take a craft slot and a craft instead of a virtue at their craft-or-virtue levels. Spent slots return after a short or long rest unless a craft says otherwise.</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {LOTR_CRAFTS.map((f) => (
              <div key={f.name} className={cardCls}>
                <h3 className="text-lg text-[var(--sys-link)]">{f.name}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="multi" className="mt-10 scroll-mt-20">
          <h2 className={sectionH}>Multiple Callings</h2>
          <div className={`${cardCls} overflow-x-auto`}>
            <table className="w-full min-w-[520px] border-collapse">
              <thead><tr><th className={th}>Calling</th><th className={th}>Requirement</th><th className={th}>Proficiencies gained</th></tr></thead>
              <tbody>{LOTR_MULTICALLING.map((m) => (
                <tr key={m.calling}><td className={`${td} font-semibold text-[var(--text)]`}>{m.calling}</td><td className={td}>{m.requirement}</td><td className={td}>{m.gains}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section id="beyond" className={`${cardCls} mt-6 scroll-mt-20`}>
          <p className={eyebrow}>Beyond 10th level</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{LOTR_TABLES.beyondTenth}</p>
        </section>
      </div>
    );
  }

  const c = selected;
  const cols = progressionColumns(c);
  const path = LOTR_SHADOW.paths.find((p) => p.name === c.shadowPath);
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <LotrHeader title={c.name} subtitle={`d${c.hitDie} · ${c.primaryAbility.join("/")} · ${c.shadowPath}`} />
      <BackLink href={BASE} label="All callings" />

      <section className={cardCls}>
        <p className="text-[14px] leading-relaxed text-[var(--text)]">{c.flavor}</p>
        <dl className="mt-3 grid gap-x-6 gap-y-1 text-[12.5px] text-[var(--muted)] md:grid-cols-2">
          <Field label="Hit Die">d{c.hitDie} (1st level: {c.hitDie} + CON modifier)</Field>
          <Field label="Saving Throws">{c.savingThrows.join(", ")}</Field>
          <Field label="Armour">{c.proficiencies.armor.join(", ") || "None"}</Field>
          <Field label="Weapons">{c.proficiencies.weapons.join(", ") || "None"}</Field>
          {c.proficiencies.tools.length ? <div className="md:col-span-2"><Field label="Tools">{c.proficiencies.tools.join(", ")}</Field></div> : null}
          <div className="md:col-span-2"><Field label="Skills">Choose {c.proficiencies.skillsChoose} from {c.proficiencies.skillsFrom.join(", ")}</Field></div>
          <div className="md:col-span-2"><Field label="Starting Equipment">{c.startingEquipment.join("; ")}</Field></div>
          <Field label="Virtues at">{lvls(c.virtueLevels)}</Field>
          <Field label="Craft or Virtue at">{lvls(c.craftOrVirtueLevels)}</Field>
          <Field label="Rewards at">{lvls(LOTR_REWARD_LEVELS)}</Field>
          <Field label={c.subclassLabel}>{ordinal(c.subclassLevel)} level</Field>
          {c.fightingStyles.length ? <div className="md:col-span-2"><Field label="Fighting Styles">{c.fightingStyles.join(", ")}</Field></div> : null}
          {c.favouredFoes?.length ? <div className="md:col-span-2"><Field label="Favoured Foes">{c.favouredFoes.join(", ")}</Field></div> : null}
          {c.wardedLands?.length ? <div className="md:col-span-2"><Field label="Warded Lands">{c.wardedLands.join(", ")}</Field></div> : null}
        </dl>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={sectionH}>Level Progression</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr>
                <th className={th}>Lvl</th>
                <th className={th}>PB</th>
                <th className={th}>Features</th>
                {cols.map((col) => <th key={col.label} className={`${th} text-center`}>{col.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {c.table.map((r, i) => (
                <tr key={r.level}>
                  <td className={`${td} font-mono text-[var(--sys-link)]`}>{r.level}</td>
                  <td className={`${td} font-mono`}>+{r.profBonus}</td>
                  <td className={td}>{r.features.join(", ") || "—"}</td>
                  {cols.map((col) => <td key={col.label} className={`${td} text-center font-mono`}>{col.at(i)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={sectionH}>Calling Features</h2>
        <div className="flex flex-col gap-2.5">
          {c.features.map((f, i) => (
            <p key={i} className="text-[13px] leading-relaxed text-[var(--muted)]">
              <span className="font-mono text-[11px] text-[var(--lotr)]">L{f.level}</span> <span className="font-semibold text-[var(--text)]">{f.name}.</span> {f.description}
              {(f as { uses?: string }).uses ? <> <span className={badge}>{(f as { uses?: string }).uses}</span></> : null}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <h2 className={sectionH}>{c.subclassLabel}s</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {c.subclasses.map((s) => (
            <div key={s.name} className={cardCls}>
              <h3 className="text-lg text-[var(--sys-link)]">{s.name}</h3>
              <p className="mt-1 text-[12.5px] italic text-[var(--muted)]">{s.flavor}</p>
              <div className="mt-2 flex flex-col gap-1.5">
                {s.features.map((f, i) => (
                  <p key={i} className="text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-mono text-[11px] text-[var(--lotr)]">L{f.level}</span> <span className="font-semibold text-[var(--text)]">{f.name}.</span> {f.description}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {path ? (
        <section className={`${cardCls} mt-4 border-l-4`} style={{ borderLeftColor: "var(--lotr)" }}>
          <p className={eyebrow}>Shadow Path</p>
          <h2 className="text-xl text-[var(--sys-link)]">{path.name}</h2>
          <p className="mt-1 text-[13px] italic leading-relaxed text-[var(--muted)]">{path.description}</p>
          <ol className="mt-3 flex flex-col gap-1.5">
            {path.flaws.map((f, i) => (
              <li key={f} className="text-[12.5px] leading-relaxed text-[var(--muted)]"><span className="font-mono text-[11px] text-[var(--lotr)]">{i + 1}.</span> <span className="font-semibold text-[var(--text)]">{f}.</span> {FLAW_TEXT[f] ?? ""}</li>
            ))}
          </ol>
          <p className="mt-3 text-[12px] text-[var(--muted)]">Each bout of madness adds the next flaw in order. With all four, the next time Shadow reaches the hero&rsquo;s Wisdom they are lost. See <a href="/lotr/adventuring#shadow" className="text-[var(--sys-link)] underline">The Shadow</a>.</p>
        </section>
      ) : null}
    </div>
  );
}
