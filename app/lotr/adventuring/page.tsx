import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_SHADOW, LOTR_JOURNEY, LOTR_COUNCIL, LOTR_FELLOWSHIP_PHASE, LOTR_TREASURE, LOTR_EYE, LOTR_SKILLS, LOTR_CONDITIONS, LOTR_TABLES } from "@/lib/data/lotr-data";
import { LotrHeader, SectionNav, Bullets, cardCls, badge, eyebrow, th, td } from "@/components/LotrRef";

export const dynamic = "force-dynamic";

const SECTIONS = [
  { id: "shadow", label: "The Shadow" },
  { id: "journeys", label: "Journeys" },
  { id: "councils", label: "Councils" },
  { id: "fellowship", label: "Fellowship Phase" },
  { id: "treasure", label: "Treasure" },
  { id: "eye", label: "Eye of Mordor" },
  { id: "skills", label: "Skills" },
  { id: "conditions", label: "Conditions" },
  { id: "encumbrance", label: "Encumbrance" },
  { id: "resting", label: "Resting" },
  { id: "magical", label: "Magical Success" },
  { id: "exhaustion", label: "Exhaustion" },
];
const FLAW_TEXT = LOTR_SHADOW.flawText as Record<string, string>;
const range = (a: number, b: number) => (a === b ? String(a) : `${a}–${b}`);

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-20 first:mt-0">
      <div className="mb-3 flex items-end justify-between gap-3 border-b border-[var(--border)] pb-2">
        <h2 className="text-2xl text-[var(--sys-link)]">{title}</h2>
        <a href="#top" className="shrink-0 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--sys-link)]">↑ Top</a>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
function Card({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`${cardCls} min-w-0 ${className}`}>
      {title ? <h3 className="mb-2 text-lg text-[var(--sys-link)]">{title}</h3> : null}
      {children}
    </div>
  );
}
// A compact table that scrolls sideways on narrow screens instead of the page.
function Table({ head, rows, min = 420 }: { head: string[]; rows: React.ReactNode[][]; min?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: min }}>
        <thead><tr>{head.map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`${td} ${j === 0 ? "font-semibold text-[var(--text)]" : ""}`}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
// Strip the "1. " prefix the data puts on sequence steps (we render an <ol>).
const stepText = (s: string) => s.replace(/^\d+\.\s*/, "");
function Steps({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-col gap-1.5 text-[13px] leading-relaxed text-[var(--muted)]">
      {items.map((s, i) => <li key={i} className="flex gap-2"><span className="font-mono text-[12px] text-[var(--lotr)]">{i + 1}.</span><span>{stepText(s)}</span></li>)}
    </ol>
  );
}
const P = ({ children }: { children: React.ReactNode }) => <p className="text-[13px] leading-relaxed text-[var(--muted)]">{children}</p>;

export default async function LotrAdventuringPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const S = LOTR_SHADOW, J = LOTR_JOURNEY, C = LOTR_COUNCIL, F = LOTR_FELLOWSHIP_PHASE, T = LOTR_TREASURE, E = LOTR_EYE;
  const removed = ["Arcana", "History (now Old Lore)", "Religion", "Survival"];

  return (
    <div id="top" className="mx-auto w-full max-w-5xl px-5 py-10">
      <LotrHeader title="Adventuring" subtitle="the Shadow · journeys · councils · fellowship · treasure · the Eye" />
      <SectionNav items={SECTIONS} />

      {/* ── The Shadow ─────────────────────────────────────────────── */}
      <Section id="shadow" title="The Shadow">
        <Card><Bullets items={S.rules} /></Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Sources of Shadow">
            <div className="flex flex-col gap-1.5">
              {S.sources.map((s) => <p key={s.name} className="text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{s.name}</span> <span className={badge}>{s.save === "—" ? "no save" : `${s.save} save`}</span> {s.description}</p>)}
            </div>
          </Card>
          <Card title="Miserable & Anguished">
            <div className="flex flex-col gap-2">
              {LOTR_CONDITIONS.filter((c) => c.lotr).map((c) => <P key={c.name}><span className="font-semibold text-[var(--text)]">{c.name}.</span> {c.description}</P>)}
              <P><span className="font-semibold text-[var(--text)]">Harden Will.</span> While Shadow is still below Wisdom, a hero may clear all of it and take a single permanent Shadow Scar instead.</P>
              <P><span className="font-semibold text-[var(--text)]">Hobbits</span> have advantage on Intelligence, Wisdom and Charisma saves against Shadow.</P>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Dread">
            <Table head={["Shadow", "Source", "Example"]} rows={S.dread.map((d) => [String(d.points), d.source, d.example])} />
          </Card>
          <Card title="Misdeeds">
            <Table head={["Shadow", "Misdeed"]} min={300} rows={S.misdeeds.map((m) => [m.points, m.action])} />
            <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{S.misdeedIntention}</p>
          </Card>
        </div>
        <Card title="Bouts of Madness"><Bullets items={S.madness} /></Card>
        <Card title="Shadow Paths & Flaws">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {S.paths.map((p) => (
              <div key={p.name} className="min-w-0 rounded border border-[var(--border)] bg-[var(--panel-2)] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-base text-[var(--sys-link)]">{p.name}</h4>
                  <a href={`/lotr/callings?c=${encodeURIComponent(p.calling)}`} className={`${badge} hover:text-[var(--text)]`}>{p.calling}</a>
                </div>
                <p className="mt-1 text-[12.5px] italic text-[var(--muted)]">{p.description}</p>
                <ol className="mt-2 flex flex-col gap-1 text-[12.5px] text-[var(--muted)]">
                  {p.flaws.map((f, i) => <li key={f}><span className="font-mono text-[11px] text-[var(--lotr)]">{i + 1}.</span> <span className="font-semibold text-[var(--text)]">{f}</span> — {FLAW_TEXT[f] ?? ""}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* ── Journeys ───────────────────────────────────────────────── */}
      <Section id="journeys" title="Journeys">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Journey Roles">
            <div className="flex flex-col gap-1.5">
              {J.roles.map((r) => <P key={r.name}><span className="font-semibold text-[var(--text)]">{r.name}</span> <span className={badge}>{r.skill}</span> {r.task}</P>)}
            </div>
          </Card>
          <Card title="Sequence"><Steps items={J.sequence} /></Card>
        </div>
        <Card title="Pace & Movement"><Bullets items={J.pace} /></Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Event Target (d3)">
            <Table head={["d3", "Who", "Check"]} min={280} rows={J.eventTarget.map((e) => [String(e.roll), e.role, e.check])} />
            <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{J.regionMod}</p>
          </Card>
          <Card title="Event Check DC">
            <Table head={["Terrain", "DC"]} min={220} rows={J.terrainDC.map((t) => [t.terrain, String(t.dc)])} />
            <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{J.seasonNote}</p>
          </Card>
        </div>
        <Card title="Journey Events (d20)">
          <div className="flex flex-col gap-3">
            {J.events.map((e) => {
              const ideas = (J.eventIdeas as Record<string, string[]>)[e.name] ?? [];
              return (
                <div key={e.name} className="border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
                  <p className="text-[13px] leading-relaxed text-[var(--muted)]"><span className="inline-block w-12 font-mono text-[12px] text-[var(--lotr)]">{range(e.min, e.max)}</span><span className="font-semibold text-[var(--text)]">{e.name}</span> <span className={badge}>fatigue +{e.fatigue}</span> {e.effect}</p>
                  {ideas.length ? <p className="mt-1 pl-12 text-[12px] italic text-[var(--muted)]">e.g. {ideas.join(" · ")}</p> : null}
                </div>
              );
            })}
          </div>
        </Card>
        <Card title="Journey Experience (per hex)">
          <Table head={["Hex", "Border Land", "Wild Land", "Dark Land"]} rows={J.xp.map((x) => [x.hex, String(x.border), String(x.wild), String(x.dark)])} />
          <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{J.xpNote}</p>
        </Card>
      </Section>

      {/* ── Councils ───────────────────────────────────────────────── */}
      <Section id="councils" title="Councils">
        <Card title="Sequence"><Steps items={C.sequence} /></Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card title="Request">
            <Table head={["Request", "Successes"]} min={180} rows={C.requests.map((r) => [r.name, String(r.successes)])} />
          </Card>
          <Card title="Audience">
            <Table head={["Attitude", "DC"]} min={180} rows={C.attitudes.map((a) => [a.name, String(a.dc)])} />
          </Card>
          <Card title="Introduction">
            <div className="flex flex-col gap-1.5">{C.intro.map((s) => <P key={s.skill}><span className="font-semibold text-[var(--text)]">{s.skill}.</span> {s.use}</P>)}</div>
          </Card>
        </div>
        <Card title="Interaction Skills">
          <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 md:grid-cols-2">
            {C.interaction.map((s) => <P key={s.skill}><span className="font-semibold text-[var(--text)]">{s.skill}</span> <span className={badge}>{s.counts ? "counts" : "support"}</span> {s.note}</P>)}
          </div>
        </Card>
        <Card title="Outcomes">
          <div className="flex flex-col gap-1.5">{C.outcomes.map((o) => <P key={o.name}><span className="font-semibold text-[var(--text)]">{o.name}.</span> {o.text}</P>)}</div>
        </Card>
        <Card title="Council Experience">
          <Table head={["Audience", "Reasonable", "Bold", "Outrageous"]} rows={C.xp.map((x) => [x.audience, x.reasonable, x.bold, x.outrageous])} />
          <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{C.xpNote}</p>
        </Card>
      </Section>

      {/* ── Fellowship Phase ───────────────────────────────────────── */}
      <Section id="fellowship" title="Fellowship Phase">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Structure"><Steps items={F.structure} /></Card>
          <Card title="Yule"><Bullets items={F.yule} /></Card>
        </div>
        <Card title="Undertakings">
          <div className="flex flex-col gap-2.5">
            {F.undertakings.map((u) => (
              <div key={u.name} className="border-b border-[var(--border)] pb-2.5 last:border-0 last:pb-0">
                <p className="text-[13px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{u.name}</span>{u.yule ? <> <span className={badge}>Yule only</span></> : null} {u.effect}</p>
                {u.free ? <p className="mt-0.5 text-[12px] text-[var(--muted)]"><span className="text-[var(--sys-link)]">Free for:</span> {u.free}</p> : null}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12.5px] text-[var(--muted)]">{F.gearNote}</p>
        </Card>
        <Card title="Songs">
          <div className="flex flex-col gap-1.5">{F.songs.map((s) => <P key={s.name}><span className="font-semibold text-[var(--text)]">{s.name}.</span> {s.effect}</P>)}</div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{F.songNote}</p>
        </Card>
      </Section>

      {/* ── Treasure ───────────────────────────────────────────────── */}
      <Section id="treasure" title="Treasure">
        <Card title="Hoards">
          <Table head={["Hoard", "Examples", "Value (g)", "Magic d20s", "Greed DC"]} min={560} rows={T.hoards.map((h) => [h.rating, h.examples, `${h.value} (avg ${h.avg})`, String(h.magicRolls), String(h.greedDC)])} />
          <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{T.hoardNote}</p>
        </Card>
        <Card title="Magical Treasure (d20)">
          <Table head={["d20", "Result", "Greed Shadow"]} rows={T.magical.map((m) => [range(m.min, m.max), m.result, m.shadow])} />
        </Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Blessings (d20)">
            <Table head={["d20", "Skill", "Typical objects"]} min={300} rows={T.blessings.map((b) => [String(b.roll), b.skill, b.objects])} />
          </Card>
          <div className="flex min-w-0 flex-col gap-4">
            <Card title="Blessing Die">
              <Table head={["Proficiency bonus", "Die"]} min={200} rows={T.blessingDie.map((b) => [`+${b.pb}`, b.die])} />
              <Bullets items={T.blessingRules} className="mt-3" />
            </Card>
            <Card title="Famous Weapons & Armour">
              <Bullets items={T.famousRules} />
              <p className="mt-2 text-[12.5px] text-[var(--muted)]">Qualities: see <a href="/lotr/rewards#enchanted" className="text-[var(--sys-link)] underline">Enchanted Rewards</a>.</p>
            </Card>
          </div>
        </div>
        <Card title="Precious Objects (d6 each)">
          <Table head={["d6", "Form", "Material", "Craftsmanship"]} min={480} rows={T.precious.form.map((f, i) => [String(i + 1), f, T.precious.material[i] ?? "", T.precious.craft[i] ?? ""])} />
        </Card>
        <Card title="Curses">
          <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 md:grid-cols-2">{T.curses.map((c) => <P key={c.name}><span className="font-semibold text-[var(--text)]">{c.name}.</span> {c.text}</P>)}</div>
          <p className="mt-2 text-[12.5px] italic text-[var(--muted)]">{T.curseNote}</p>
        </Card>
      </Section>

      {/* ── Eye of Mordor ──────────────────────────────────────────── */}
      <Section id="eye" title="Eye of Mordor">
        <P>An optional rule: the Loremaster tracks how much the Enemy notices the Company. When Eye Awareness reaches the region&rsquo;s Hunt threshold, the Company is revealed.</P>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Starting Awareness">
            <Table head={["Company includes", "Score"]} min={240} rows={E.starting.map((s) => [s.company, String(s.score)])} />
            <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{E.startingNote}</p>
          </Card>
          <Card title="Awareness Increases"><Bullets items={E.increases} /></Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="Hunt Threshold">
            <Table head={["Region", "Hunt"]} min={200} rows={E.thresholds.map((t) => [t.region, String(t.hunt)])} />
          </Card>
          <Card title="Threshold Modifiers">
            <Table head={["Mod", "Circumstance"]} min={260} rows={E.modifiers.map((m) => [m.mod, m.text])} />
          </Card>
        </div>
        <Card title="Revelation Episodes (d10)">
          <P>{E.revelationNote}</P>
          <div className="mt-2 flex flex-col gap-1.5">
            {E.revelations.map((r, i) => <P key={r.name}><span className="inline-block w-7 font-mono text-[12px] text-[var(--lotr)]">{i + 1}</span><span className="font-semibold text-[var(--text)]">{r.name}.</span> {r.text}</P>)}
          </div>
        </Card>
      </Section>

      {/* ── Skills ─────────────────────────────────────────────────── */}
      <Section id="skills" title="Skills">
        <P>Middle-earth uses {LOTR_SKILLS.length} skills. Removed: {removed.join(", ")}. Marked skills are new or changed.</P>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {LOTR_SKILLS.map((s) => (
            <div key={s.name} className={`${cardCls} py-3 ${s.lotr ? "border-[var(--lotr)]" : ""}`}>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base text-[var(--sys-link)]">{s.name}</h3>
                <span className="flex shrink-0 gap-1">{s.lotr ? <span className={`${badge} border-[var(--lotr)] text-[var(--sys-link)]`}>LotR</span> : null}<span className={badge}>{s.ability}</span></span>
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Conditions ─────────────────────────────────────────────── */}
      <Section id="conditions" title="Conditions">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {LOTR_CONDITIONS.map((c) => (
            <div key={c.name} className={`${cardCls} py-3 ${c.lotr ? "border-[var(--lotr)]" : ""}`}>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base text-[var(--sys-link)]">{c.name}</h3>
                {c.lotr ? <span className={`${badge} border-[var(--lotr)] text-[var(--sys-link)]`}>LotR</span> : null}
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{c.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Encumbrance / Resting / Magical success / Exhaustion ──── */}
      <Section id="encumbrance" title="Encumbrance">
        <Card><Bullets items={LOTR_TABLES.encumbrance} /><p className="mt-2 text-[12.5px] text-[var(--muted)]">Dwarves double their carrying capacity and thresholds (Make Light of Burdens).</p></Card>
      </Section>
      <Section id="resting" title="Resting">
        <Card><Bullets items={LOTR_TABLES.resting} /></Card>
      </Section>
      <Section id="magical" title="Magical Success">
        <Card>
          <Bullets items={LOTR_TABLES.magicalSuccess} />
          <p className={`${eyebrow} mt-4`}>Inspiration</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{LOTR_TABLES.inspiration}</p>
        </Card>
      </Section>
      <Section id="exhaustion" title="Exhaustion">
        <Card>
          <Table head={["Level", "Effect"]} min={240} rows={LOTR_TABLES.exhaustion.map((e) => [String(e.level), e.effect])} />
          <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--muted)]">Levels are cumulative. Journeys are the usual source: a failed fatigue save at the end of a journey adds levels. A long rest in a safe haven removes one level.</p>
        </Card>
      </Section>
    </div>
  );
}
