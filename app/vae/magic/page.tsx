import { VAE_MAGIC } from "@/lib/data/vae-data";
import { VaesenHeader, SectionH, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

const M = VAE_MAGIC;

export default function VaesenMagicPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="Magic & The Sight" subtitle="Vaesen · how the creatures bend the world — and the rare relics that resist them" />

      <div className={`${cardCls} mb-6`}>
        <h3 className={nameCls}>The Sight</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{M.theSight}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={cardCls}>
          <h3 className={nameCls}>Enchantments</h3>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{M.families.enchantments}</p>
        </div>
        <div className={cardCls}>
          <h3 className={nameCls}>Curses</h3>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{M.families.curses}</p>
        </div>
        <div className={cardCls}>
          <h3 className={nameCls}>Trollcraft</h3>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">{M.families.trollcraft}</p>
        </div>
      </div>

      <SectionH>Enchantments</SectionH>
      <p className="mb-3 text-[12px] text-[var(--muted)]">Atmosphere magic — succeeds automatically; affected characters make a Fear test (usually Fear 1).</p>
      <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {M.enchantments.map((e) => (
          <div key={e.name} className={cardCls}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--sys-link)]">{e.name}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{e.effect}</p>
          </div>
        ))}
      </div>

      <SectionH>Curses</SectionH>
      <p className="mb-3 text-[12px] text-[var(--muted)]">Direct attacks — opposed MAGIC vs the listed skill; the creature needs more successes, and extra successes inflict Conditions.</p>
      <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {M.curses.map((c) => (
          <div key={c.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--sys-link)]">{c.name}</h3>
              {c.resist ? <span className={badge}>Resist: {c.resist}</span> : null}
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{c.effect}</p>
          </div>
        ))}
      </div>

      <SectionH>Trollcraft</SectionH>
      <p className="mb-3 text-[12px] text-[var(--muted)]">Reality-bending magic of trolls and fairies — used as atmosphere (Fear test) or as an attack (opposed MAGIC).</p>
      <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {M.trollcraft.map((t) => (
          <div key={t.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[var(--sys-link)]">{t.name}</h3>
              {t.resist ? <span className={badge}>Resist: {t.resist}</span> : null}
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--text)]">{t.effect}</p>
          </div>
        ))}
      </div>

      <div className={`${cardCls} mb-8`}>
        <h3 className={nameCls}>Items of Power &amp; Magic Items</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">
          Protective relics and vaesen gear now live on the <a href="/vae/gear?mode=power" className="text-[var(--sys-link)] underline">Weapons &amp; Gear</a> page,
          where they can be added to a character from the Item Shop and dropped from the GM Screen gear generator.
        </p>
      </div>

      <div className={cardCls}>
        <h3 className={nameCls}>Player characters using magic</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text)]">{M.pcMagic}</p>
      </div>
    </div>
  );
}
