import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DS_SHIP } from "@/lib/data/darkspace";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { DarkSpaceHeader, DataTable, cardCls, nameCls, hbBadge } from "@/components/DarkSpaceRef";

export const dynamic = "force-dynamic";

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

export default async function DarkSpaceStarshipsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [hbVisible, hbOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "ds-ship-item" }),
    ownHomebrew(user.id, "ds-ship-item"),
    userCampaigns(user.id),
  ]);
  const hb: Record<string, unknown>[] = hbVisible.map((h) => ({ name: h.name, ...(h.data as Record<string, unknown>) }));
  const hbBy = (cat: string) => hb.filter((r) => s(r.category) === cat);

  const ship = DS_SHIP;
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <DarkSpaceHeader title="Starships" subtitle="A ship is built like a Spacer" />
      <div className="mb-6"><HomebrewEditor kind="ds-ship-item" campaigns={campaigns} initial={hbOwn} /></div>

      <section className={cardCls}>
        <h2 className={`${nameCls} mb-2`}>Building a Ship</h2>
        <ol className="ml-4 list-decimal space-y-1.5 text-[13px] leading-relaxed text-[var(--text)]">
          {ship.design.map((d, i) => <li key={i}>{d}</li>)}
        </ol>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-1`}>Base Systems</h2>
        <p className="text-[13px] leading-relaxed text-[var(--muted)]">Every ship needs these to operate: <span className="font-semibold text-[var(--text)]">{ship.baseSystems.join(", ")}</span>.</p>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Classifications</h2>
        <p className="mb-3 text-[12px] text-[var(--muted)]">Choose a Classification for base System / Feature slots, a free starting component, an HP die, always-on Features, and a Talent table the ship rolls on as it levels with its crew.</p>
        <div className="flex flex-col gap-3">
          {ship.classifications.map((c) => (
            <div key={c.name} className="rounded-md border border-[var(--border)] bg-[var(--panel-2)] p-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-black uppercase tracking-[0.1em] text-[#8fd6ea]">{c.name}</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[var(--muted)]">
                  <span><span className="font-semibold text-[var(--text)]">Sys</span> {c.sysSlots}</span>
                  <span><span className="font-semibold text-[var(--text)]">Feat</span> {c.featSlots}</span>
                  <span><span className="font-semibold text-[var(--text)]">HP</span> {c.hpDie}</span>
                  <span><span className="font-semibold text-[var(--text)]">Free</span> {c.freeComponent}</span>
                </div>
              </div>
              <p className="mt-1 text-[12px] italic leading-relaxed text-[var(--muted)]">{c.blurb}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {c.features.map((f) => (
                  <li key={f.name} className="text-[12px] leading-relaxed text-[var(--text)]"><span className="font-semibold text-[#8fd6ea]">{f.name}.</span> <span className="text-[var(--muted)]">{f.text}</span></li>
                ))}
              </ul>
              <div className="mt-2">
                <DataTable head={["2d6", `${c.name} Talent`]} rows={c.talents.map((t) => [t.r, t.text])} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Components</h2>
        <p className="mb-2 text-[12px] text-[var(--muted)]">Purchasable Systems and Features. Advanced versions cost +1 slot and grant advantage on that system.</p>
        <DataTable
          head={["Component", "Type", "Cost", "Upkeep", "Adv", "Notes"]}
          rows={ship.components.map((c) => [c.name, c.type, (c.costNote ? c.costNote : c.cost + "cr"), c.maint + "cr", c.advanced ? "yes" : "—", c.desc])}
        />
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Ship Weapons</h2>
        <DataTable head={["Weapon", "Cost", "Range", "Damage", "Properties"]} rows={ship.weapons.map((w) => [w.name, w.cost + "cr", w.range, w.dmg, w.props])} />
        {hbBy("weapon").length ? (
          <div className="mt-3">
            <h3 className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">Homebrew <span className={hbBadge}>HB</span></h3>
            <DataTable head={["Weapon", "Cost", "Range", "Damage", "Properties"]} rows={hbBy("weapon").map((w) => [s(w.name), s(w.cost) + "cr", s(w.range), s(w.dmg), s(w.props)])} />
          </div>
        ) : null}
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Ship Armor</h2>
        <DataTable head={["Armor", "Cost", "AC", "Properties"]} rows={ship.armor.map((a) => [a.name, a.cost + "cr", a.ac, a.props])} />
        {hbBy("armor").length ? (
          <div className="mt-3">
            <h3 className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">Homebrew <span className={hbBadge}>HB</span></h3>
            <DataTable head={["Armor", "Cost", "AC", "Properties"]} rows={hbBy("armor").map((a) => [s(a.name), s(a.cost) + "cr", s(a.ac), s(a.props)])} />
          </div>
        ) : null}
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Property Keys</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">Weapon Properties</h3>
            <ul className="flex flex-col gap-1">
              {Object.entries(ship.weaponProps).map(([k, v]) => (
                <li key={k} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{k}</span> — {v}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#8fd6ea]">Armor Properties</h3>
            <ul className="flex flex-col gap-1">
              {Object.entries(ship.armorProps).map(([k, v]) => (
                <li key={k} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{k}</span> — {v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-2`}>Command Crew</h2>
        <ul className="grid gap-2 md:grid-cols-2">
          {ship.commandCrew.map((r) => (
            <li key={r.role} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{r.role}.</span> {r.text}</li>
          ))}
        </ul>
      </section>

      <section className={`${cardCls} mt-4`}>
        <h2 className={`${nameCls} mb-1`}>Stock Ship Classes</h2>
        <ul className="mt-2 grid gap-2 md:grid-cols-2">
          {ship.stockClasses.map((c) => (
            <li key={c.name} className="text-[12px] leading-relaxed text-[var(--muted)]"><span className="font-semibold text-[var(--text)]">{c.name}.</span> {c.text}</li>
          ))}
        </ul>
      </section>

      {(hbBy("system").length || hbBy("feature").length) ? (
        <section className={`${cardCls} mt-4`}>
          <h2 className={`${nameCls} mb-2`}>Homebrew Systems & Features</h2>
          <ul className="flex flex-col gap-2">
            {[...hbBy("system"), ...hbBy("feature")].map((r, i) => (
              <li key={i} className="text-[13px] leading-relaxed text-[var(--text)]">
                <span className="font-semibold text-[#8fd6ea]">{s(r.name)}</span> <span className="text-[var(--muted)]">({s(r.category)}{s(r.cost) ? `, ${s(r.cost)}cr` : ""})</span>{s(r.desc) ? ` — ${s(r.desc)}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
