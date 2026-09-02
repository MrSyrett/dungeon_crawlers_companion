import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DND_SPELLS } from "@/lib/data/dnd-spells";
import { DndHeader, ChipRow, SearchForm, CountLine, EmptyState, cardCls, badge, one, type RawQuery } from "@/components/DndRef";

export const dynamic = "force-dynamic";
const BASE = "/dnd/spells";
const CLASSES = ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"];
const SCHOOLS = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];
const lvlLabel = (n: number) => (n === 0 ? "Cantrip" : `Level ${n}`);

export default async function DndSpellsPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const q = one(raw.q).trim().toLowerCase();
  const lvl = one(raw.lvl);
  const cls = one(raw.cls);
  const school = one(raw.school);

  let list = DND_SPELLS.slice();
  if (lvl !== "") list = list.filter((s) => String(s.level) === lvl);
  if (cls) list = list.filter((s) => s.classes.some((c) => c === cls));
  if (school) list = list.filter((s) => s.school === school);
  if (q) list = list.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  list.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));

  const current = { q: one(raw.q), lvl, cls, school };
  const filtered = !!(q || lvl !== "" || cls || school);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DndHeader title="Spells" subtitle={`${DND_SPELLS.length} spells · cantrips–level 9`} />
      <SearchForm base={BASE} q={one(raw.q)} placeholder="Search spells by name or effect…" hidden={{ lvl, cls, school }} />
      <ChipRow label="Level" base={BASE} current={current} param="lvl" options={[...Array(10).keys()].map((n) => ({ key: String(n), label: n === 0 ? "Cantrip" : String(n) }))} active={lvl} />
      <ChipRow label="Class" base={BASE} current={current} param="cls" options={CLASSES.map((c) => ({ key: c, label: c }))} active={cls} />
      <ChipRow label="School" base={BASE} current={current} param="school" options={SCHOOLS.map((s) => ({ key: s, label: s }))} active={school} />
      <CountLine count={list.length} noun="spell" base={BASE} filtered={filtered} />
      {list.length === 0 ? <EmptyState noun="spell" base={BASE} /> : (
        <div className="flex flex-col gap-3">
          {list.map((s) => (
            <article key={s.name} className={cardCls}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold uppercase tracking-[0.1em] text-[#f0a37f]">{s.name}</h3>
                <span className={badge}>{lvlLabel(s.level)} · {s.school}</span>
              </div>
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-[var(--muted)]">
                <span><span className="font-semibold text-[var(--text)]">Cast:</span> {s.castingTime}</span>
                <span><span className="font-semibold text-[var(--text)]">Range:</span> {s.range}</span>
                <span><span className="font-semibold text-[var(--text)]">Components:</span> {s.components}</span>
                <span><span className="font-semibold text-[var(--text)]">Duration:</span> {s.duration}</span>
                {s.concentration ? <span className="text-[#e8c84a]">Concentration</span> : null}
                {s.ritual ? <span className="text-[#8ad4ff]">Ritual</span> : null}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--text)]">{s.description}</p>
              {s.higherLevels ? <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[#f0a37f]">At Higher Levels.</span> {s.higherLevels}</p> : null}
              {s.classes.length ? <p className="mt-1.5 text-[11px] text-[var(--muted)]">{s.classes.join(" · ")}</p> : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
