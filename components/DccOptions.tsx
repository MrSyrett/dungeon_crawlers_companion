"use client";

import { useMemo, useState, type ReactNode } from "react";
import { DCC_DEITIES } from "@/lib/data/dcc-deities";
import { DCC_DEBUFFS } from "@/lib/data/dcc-debuffs";
import { DCC_BUFFS } from "@/lib/data/dcc-buffs";
import { DCC_EXPERIENCES } from "@/lib/data/dcc-experiences";
import { DCC_BACKGROUNDS } from "@/lib/data/dcc-backgrounds";
import type {
  DccDeity,
  DccDebuff,
  DccBuff,
  DccExperience,
  DccBackground,
} from "@/lib/data/dcc-types";

type TabKey = "deities" | "debuffs" | "buffs" | "experiences" | "backgrounds";

const TABS: { key: TabKey; label: string; count: number }[] = [
  { key: "deities", label: "Deities", count: DCC_DEITIES.length },
  { key: "debuffs", label: "Debuffs", count: DCC_DEBUFFS.length },
  { key: "buffs", label: "Buffs", count: DCC_BUFFS.length },
  { key: "experiences", label: "Experiences", count: DCC_EXPERIENCES.length },
  { key: "backgrounds", label: "Backgrounds", count: DCC_BACKGROUNDS.length },
];

// ── shared styling ──────────────────────────────────────────────────────────
const chipBase =
  "rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors";
const chipOff =
  "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]";
const chipOn = "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]";
const badge =
  "rounded border border-[var(--border)] px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]";

function Badge({ label, value }: { label: string; value: string }): ReactNode {
  return (
    <span className={badge}>
      {label} <span className="text-[var(--text)]">{value}</span>
    </span>
  );
}

function Card({ children }: { children: ReactNode }): ReactNode {
  return (
    <li className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4">{children}</li>
  );
}

function CardTitle({ name, aside }: { name: string; aside?: ReactNode }): ReactNode {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 className="text-base font-bold uppercase tracking-[0.12em] text-[#f0a8a3]">{name}</h3>
      {aside}
    </div>
  );
}

function Grid({ children }: { children: ReactNode }): ReactNode {
  return <ul className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">{children}</ul>;
}

function Chips({
  label,
  options,
  active,
  onPick,
}: {
  label: string;
  options: string[];
  active: string;
  onPick: (v: string) => void;
}): ReactNode {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onPick("")}
        className={`${chipBase} ${active ? chipOff : chipOn}`}
      >
        All
      </button>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          className={`${chipBase} ${active === o ? chipOn : chipOff}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// "Ogun, God of Blacksmithery" → { name, epithet }
function splitName(full: string): { name: string; epithet: string } {
  const i = full.indexOf(",");
  return i === -1 ? { name: full, epithet: "" } : { name: full.slice(0, i), epithet: full.slice(i + 1).trim() };
}

// ── per-tab renderers ───────────────────────────────────────────────────────
function DeitiesSection({ q }: { q: string }): ReactNode {
  const [stat, setStat] = useState("");
  const stats = useMemo(
    () => [...new Set(DCC_DEITIES.map((d) => d.signatureStat).filter(Boolean) as string[])].sort(),
    [],
  );
  const rows = DCC_DEITIES.filter((d) => {
    if (stat && d.signatureStat !== stat) return false;
    if (!q) return true;
    const hay = [d.name, d.temple, d.offering, d.rival, d.sponsor, d.symbol, ...d.signatureSkills, ...d.tiers.flatMap((t) => t.benefits)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }).sort((a, b) => a.name.localeCompare(b.name, "en"));

  return (
    <>
      {stats.length ? <div className="mb-5"><Chips label="Signature stat" options={stats} active={stat} onPick={setStat} /></div> : null}
      <Count n={rows.length} noun="deity" plural="deities" />
      <Grid>
        {rows.map((d: DccDeity, i) => {
          const { name, epithet } = splitName(d.name);
          return (
            <Card key={`${d.name}-${i}`}>
              <CardTitle
                name={name}
                aside={d.signatureStat ? <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Signature {d.signatureStat}</span> : undefined}
              />
              {epithet ? <p className="mt-0.5 text-[13px] italic text-[var(--muted)]">{epithet}</p> : null}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {d.temple ? <Badge label="Temple" value={d.temple} /> : null}
                {d.offering ? <Badge label="Offering" value={d.offering} /> : null}
                {d.rival ? <Badge label="Rival" value={d.rival} /> : null}
                {d.sponsor ? <Badge label="Sponsor" value={d.sponsor} /> : null}
              </div>
              {d.signatureSkills.length ? (
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Signature skills:</span>{" "}
                  {d.signatureSkills.join(", ")}
                </p>
              ) : null}
              {d.symbol ? (
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                  <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Symbol:</span> {d.symbol}
                </p>
              ) : null}
              {d.tiers.length ? (
                <div className="mt-3 flex flex-col gap-2 border-t border-[var(--border)] pt-3">
                  {d.tiers.map((t) => (
                    <div key={t.tier}>
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#f0a8a3]">{t.tier}</div>
                      <ul className="mt-1 flex flex-col gap-0.5">
                        {t.benefits.map((b, bi) => (
                          <li key={bi} className="text-[13px] leading-relaxed text-[var(--muted)]">• {b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </Card>
          );
        })}
      </Grid>
    </>
  );
}

function DebuffsSection({ q }: { q: string }): ReactNode {
  const rows = DCC_DEBUFFS.filter((d: DccDebuff) =>
    !q || [d.name, d.effect, d.duration].join(" ").toLowerCase().includes(q),
  ).sort((a, b) => a.name.localeCompare(b.name, "en"));
  return (
    <>
      <p className="mb-4 text-[13px] leading-relaxed text-[var(--muted)]">Negative conditions (Core p.97, Table 11). <span className="text-[var(--text)]">F</span> = the current Floor Number.</p>
      <Count n={rows.length} noun="debuff" plural="debuffs" />
      <Grid>
        {rows.map((d, i) => (
          <Card key={`${d.name}-${i}`}>
            <CardTitle name={d.name} aside={d.stackable ? <span className="rounded border border-[var(--red)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#f0a8a3]">Stackable</span> : undefined} />
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{d.effect}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold uppercase tracking-[0.08em]">Duration:</span> {d.duration}</p>
          </Card>
        ))}
      </Grid>
    </>
  );
}

function BuffsSection({ q }: { q: string }): ReactNode {
  const [kind, setKind] = useState("");
  const rows = DCC_BUFFS.filter((b: DccBuff) => {
    if (kind && b.kind !== kind.toLowerCase()) return false;
    return !q || [b.name, b.effect, b.duration].filter(Boolean).join(" ").toLowerCase().includes(q);
  }).sort((a, b) => a.name.localeCompare(b.name, "en"));
  return (
    <>
      <p className="mb-4 text-[13px] leading-relaxed text-[var(--muted)]">Positive conditions (Core p.95-96). <span className="text-[var(--text)]">Internal</span> buffs are always-on; <span className="text-[var(--text)]">External</span> buffs are triggered and limited to three at once (Rule of Three).</p>
      <div className="mb-5"><Chips label="Kind" options={["Internal", "External"]} active={kind} onPick={setKind} /></div>
      <Count n={rows.length} noun="buff" plural="buffs" />
      <Grid>
        {rows.map((b, i) => (
          <Card key={`${b.name}-${i}`}>
            <CardTitle name={b.name} aside={<span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{b.kind}</span>} />
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{b.effect}</p>
            {b.duration ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold uppercase tracking-[0.08em]">Duration:</span> {b.duration}</p> : null}
          </Card>
        ))}
      </Grid>
    </>
  );
}

function ExperiencesSection({ q }: { q: string }): ReactNode {
  const [floor, setFloor] = useState("");
  const floors = useMemo(() => [...new Set(DCC_EXPERIENCES.map((e) => String(e.floor)))].sort(), []);
  const rows = DCC_EXPERIENCES.filter((e: DccExperience) => {
    if (floor && String(e.floor) !== floor) return false;
    return !q || [e.name, e.table, e.desc, ...e.skills].filter(Boolean).join(" ").toLowerCase().includes(q);
  }).sort((a, b) => a.table.localeCompare(b.table, "en") || a.name.localeCompare(b.name, "en"));
  return (
    <>
      <p className="mb-4 text-[13px] leading-relaxed text-[var(--muted)]">Fast-forward creation events for Third-Floor-and-beyond crawlers (Core Ch.3). Each grants a choice of two skills. Floor 2 tables are the tutorial-floor experiences usable at Floor 3+.</p>
      {floors.length ? <div className="mb-5"><Chips label="Floor" options={floors} active={floor} onPick={setFloor} /></div> : null}
      <Count n={rows.length} noun="experience" plural="experiences" />
      <Grid>
        {rows.map((e, i) => (
          <Card key={`${e.name}-${i}`}>
            <CardTitle name={e.name} aside={<span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Floor {e.floor}</span>} />
            <p className="mt-0.5 text-[12px] italic text-[var(--muted)]">{e.table}</p>
            {e.desc ? <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{e.desc}</p> : null}
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
              <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Skills (pick 2):</span> {e.skills.join(", ")}
            </p>
          </Card>
        ))}
      </Grid>
    </>
  );
}

function BackgroundsSection({ q }: { q: string }): ReactNode {
  const [era, setEra] = useState("");
  const [kind, setKind] = useState("");
  const eras = useMemo(() => [...new Set(DCC_BACKGROUNDS.map((b) => b.era))], []);
  const rows = DCC_BACKGROUNDS.filter((b: DccBackground) => {
    if (era && b.era !== era) return false;
    if (kind && b.kind !== kind.toLowerCase()) return false;
    return !q || [b.name, ...b.skills].join(" ").toLowerCase().includes(q);
  }).sort((a, b) => a.era.localeCompare(b.era, "en") || a.name.localeCompare(b.name, "en"));
  return (
    <>
      <p className="mb-4 text-[13px] leading-relaxed text-[var(--muted)]">Character-creation Step 1 skill tables (Core Ch.3). Each background offers three skills; the crawler takes two. Human and animal crawlers draw from different tables.</p>
      <div className="mb-3"><Chips label="Era" options={eras} active={era} onPick={setEra} /></div>
      <div className="mb-5"><Chips label="Crawler" options={["Human", "Animal"]} active={kind} onPick={setKind} /></div>
      <Count n={rows.length} noun="background" plural="backgrounds" />
      <Grid>
        {rows.map((b, i) => (
          <Card key={`${b.name}-${i}`}>
            <CardTitle
              name={b.name}
              aside={
                <span className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{b.era}</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">· {b.kind}</span>
                </span>
              }
            />
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
              <span className="font-semibold uppercase tracking-[0.08em] text-[var(--text)]">Skills (pick 2):</span> {b.skills.join(", ")}
            </p>
          </Card>
        ))}
      </Grid>
    </>
  );
}

function Count({ n, noun, plural }: { n: number; noun: string; plural: string }): ReactNode {
  return (
    <div className="mb-4 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
      {n} {n === 1 ? noun : plural}
    </div>
  );
}

export default function DccOptions(): ReactNode {
  const [tab, setTab] = useState<TabKey>("deities");
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();

  return (
    <div>
      {/* Section toggle bar */}
      <div className="mb-5 flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded border px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
              tab === t.key
                ? "border-[var(--red)] bg-[var(--panel-2)] text-[#f0a8a3]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]"
            }`}
          >
            {t.label} <span className="opacity-60">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5 flex gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search this section…"
          className="min-w-0 flex-1 rounded border border-[var(--border)] bg-[var(--panel)] px-3 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--red)]"
        />
        {q ? (
          <button
            type="button"
            onClick={() => setQ("")}
            className="shrink-0 rounded border border-[var(--border)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--red)] hover:text-[var(--text)]"
          >
            Clear
          </button>
        ) : null}
      </div>

      {tab === "deities" ? <DeitiesSection q={needle} /> : null}
      {tab === "debuffs" ? <DebuffsSection q={needle} /> : null}
      {tab === "buffs" ? <BuffsSection q={needle} /> : null}
      {tab === "experiences" ? <ExperiencesSection q={needle} /> : null}
      {tab === "backgrounds" ? <BackgroundsSection q={needle} /> : null}
    </div>
  );
}
