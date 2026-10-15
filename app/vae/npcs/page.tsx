import { VAE_NPCS, VAE_ANIMALS } from "@/lib/data/vae-data";
import { VaesenHeader, SectionH, cardCls, nameCls, badge } from "@/components/VaesenRef";

export const dynamic = "force-dynamic";

const stat = (label: string, val: number | string) => (
  <span className="font-mono text-[11px] text-[var(--muted)]">
    {label} <b className="text-[var(--text)]">{String(val)}</b>
  </span>
);

export default function VaesenNpcsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <VaesenHeader title="NPCs & Animals" subtitle="Vaesen · the supporting cast — townsfolk, officials, and beasts" />
      <p className="mb-6 max-w-[72ch] text-[13px] leading-relaxed text-[var(--muted)]">
        NPCs and animals use <b className="text-[var(--sys-link)]">Toughness</b> (physical and mental) instead of Conditions:
        each point of damage is −1 to the matching skill, and when damage exceeds Toughness the NPC is Broken (knocked out
        or dead). Minor NPCs are 1/1, Named NPCs 2/2, Unique NPCs 3/3. Any human NPC can be made a witch or wizard — give
        them a MAGIC value and a few chosen Enchantments, Curses, or Trollcraft.
      </p>

      <SectionH>NPC Archetypes</SectionH>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {VAE_NPCS.map((n) => (
          <div key={n.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{n.name}</h3>
              <span className={badge}>Tough {n.toughPhys}/{n.toughMental}</span>
            </div>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {stat("PHY", n.physique)}
              {stat("PRE", n.precision)}
              {stat("LOG", n.logic)}
              {stat("EMP", n.empathy)}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--text)]">
              <b className="text-[var(--muted)]">Skills:</b> {n.skills}
            </p>
          </div>
        ))}
      </div>

      <SectionH>Animals</SectionH>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {VAE_ANIMALS.map((a) => (
          <div key={a.name} className={cardCls}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className={nameCls}>{a.name}</h3>
              <span className={badge}>Tough {a.toughness}</span>
            </div>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {stat("MIGHT", a.might)}
              {stat("BODY", a.bodyControl)}
              {stat("DMG", a.damage)}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--muted)]">
              Attacks with Might; uses Body Control to sneak or evade. One slow + one fast action per round.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
