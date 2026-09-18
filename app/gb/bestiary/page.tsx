import { GB_BESTIARY } from "@/lib/data/gb-bestiary";
import { GB_GHOST_ABILITIES } from "@/lib/data/gb-ghost-abilities";
import { GB_GHOST_WEAKNESSES } from "@/lib/data/gb-ghost-weaknesses";
import { GB_GHOST_TOUGHNESS } from "@/lib/data/gb-ghost-toughness";
import { GbHeader, TabRow, cardCls, nameCls, badge, catBadge, SectionH } from "@/components/GbRef";

export const dynamic = "force-dynamic";

const TRAIT_KEYS: [("brains" | "muscles" | "moves" | "cool"), string][] = [
  ["brains", "BRN"], ["muscles", "MUS"], ["moves", "MOV"], ["cool", "COOL"],
];

export default function GbBestiaryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <GbHeader title="Ghosts & Extras" subtitle="Ghostbusters International · the spooks, monsters and weirdos you'll bust" />
      <TabRow active="/gb/bestiary" />

      <SectionH>The Roster</SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GB_BESTIARY.map((c) => (
          <div key={c.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={nameCls}>{c.name}</h3>
              <span className="flex flex-wrap items-center gap-1.5">
                {c.power ? <span className={catBadge}>Power {c.power}</span> : null}
                {c.ectopresence != null ? <span className="rounded bg-[#4a2d63] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#eabfff]">Ecto {c.ectopresence}</span> : null}
              </span>
            </div>
            <div className="mt-0.5 flex flex-wrap gap-1.5 text-[11px] text-[var(--muted)]">
              <span className={badge}>{c.role}</span>
              {c.entityType ? <span>{c.entityType}</span> : null}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TRAIT_KEYS.filter(([k]) => c[k]).map(([k, lbl]) => (
                <span key={lbl} className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px]">
                  <span className="text-[var(--muted)]">{lbl}</span> <span className="font-semibold text-[#8fce3f]">{c[k]}</span>
                </span>
              ))}
            </div>
            {c.talents?.length ? (
              <p className="mt-2 text-[12px] leading-relaxed">
                <span className="font-semibold text-[var(--gb)]">Talents:</span>{" "}
                {c.talents.map((t) => `${t.name} ${t.value}`).join(" · ")}
              </p>
            ) : null}
            {c.powers?.length ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Abilities:</span> {c.powers.join(", ")}</p> : null}
            {c.weaknesses ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Weakness:</span> {c.weaknesses}</p> : null}
            <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Goal:</span> {c.goal}</p>
            {c.tags ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Tags:</span> {c.tags}</p> : null}
            {c.description ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{c.description}</p> : null}
          </div>
        ))}
      </div>

      <SectionH>Building a Ghost <span className="text-[11px] font-normal text-[var(--muted)]">— the Instant Trait Rate Table</span></SectionH>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.08em] text-[#8fce3f]">
              <th className="border-b border-[var(--border)] px-2 py-1.5">Toughness</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Power</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Special Abilities</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Ectopresence</th>
              <th className="border-b border-[var(--border)] px-2 py-1.5">Brains &amp; Cool</th>
            </tr>
          </thead>
          <tbody>
            {GB_GHOST_TOUGHNESS.map((t) => (
              <tr key={t.toughness}>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-semibold text-[var(--text)]">{t.toughness}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.power}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.abilities}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.ectopresence}</td>
                <td className="border-b border-[var(--border)] px-2 py-1.5 font-mono">{t.brainsCool}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionH>Special Abilities <span className="text-[11px] font-normal text-[var(--muted)]">— L = Lesser · G = Greater</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {GB_GHOST_ABILITIES.map((a) => (
          <div key={a.name} className={cardCls}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#8fce3f]">{a.name}</h3>
              <span className={badge}>{a.category}</span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{a.description}</p>
          </div>
        ))}
      </div>

      <SectionH>Weaknesses <span className="text-[11px] font-normal text-[var(--muted)]">— every tough spook needs one</span></SectionH>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GB_GHOST_WEAKNESSES.map((w) => (
          <div key={w.name} className={cardCls}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--gb)]">{w.name}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{w.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
