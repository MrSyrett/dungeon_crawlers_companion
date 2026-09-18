import { GB_BESTIARY } from "@/lib/data/gb-bestiary";
import { GbHeader, TabRow, cardCls, nameCls, badge, catBadge } from "@/components/GbRef";

export const dynamic = "force-dynamic";

const TRAIT_KEYS: [("brains" | "muscles" | "moves" | "cool"), string][] = [
  ["brains", "BRN"], ["muscles", "MUS"], ["moves", "MOV"], ["cool", "COOL"],
];

export default function GbBestiaryPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <GbHeader title="Ghosts & Extras" subtitle="Ghostbusters International · the spooks, monsters and weirdos you'll bust" />
      <TabRow active="/gb/bestiary" />
      <p className="mb-4 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">
        Every non-player character is an &ldquo;extra.&rdquo; They use the same four Traits plus a Power
        rating with supernatural abilities. Whittle a ghost&rsquo;s Ectopresence to 0 with proton streams,
        then trap it — unless it has Proton Immunity, in which case you&rsquo;ll need its weakness or some
        weird science.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GB_BESTIARY.map((c) => (
          <div key={c.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className={nameCls}>{c.name}</h3>
              <span className="flex items-center gap-1.5">
                <span className={badge}>{c.role}</span>
                {c.power ? <span className={catBadge}>Power {c.power}</span> : null}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TRAIT_KEYS.map(([k, lbl]) => (
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
            {c.powers?.length ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Powers:</span> {c.powers.join(", ")}</p> : null}
            {c.weaknesses ? <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Weaknesses:</span> {c.weaknesses}</p> : null}
            <p className="mt-1 text-[12px]"><span className="font-semibold text-[var(--gb)]">Goal:</span> {c.goal}</p>
            {c.tags ? <p className="mt-1 text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">Tags:</span> {c.tags}</p> : null}
            {c.description ? <p className="mt-2 text-[12px] italic leading-relaxed text-[var(--muted)]">{c.description}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
