import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LOTR_WEAPONS, LOTR_ARMOR, LOTR_ARMOR_NOTE, LOTR_GEAR, LOTR_MOUNTS, LOTR_MOUNT_NOTE, LOTR_EXPENSES, LOTR_STANDARDS, LOTR_TABLES } from "@/lib/data/lotr-data";
import type { LotrWeapon, LotrArmor, LotrGear } from "@/lib/data/lotr-types";
import { visibleHomebrew, ownHomebrew, userCampaigns } from "@/lib/homebrew";
import HomebrewEditor from "@/components/HomebrewEditor";
import { LotrHeader, ModeRow, ChipRow, SearchForm, CountLine, EmptyState, Bullets, cardCls, nameCls, badge, hbBadge, eyebrow, sectionH, th, td, one, isHb, srcKey, srcChips, type RawQuery } from "@/components/LotrRef";
import InstantFilter from "@/components/InstantFilter";
import { facetMatch, facetAttr } from "@/lib/facets";

export const dynamic = "force-dynamic";
const BASE = "/lotr/equipment";
const MODES = ["weapons", "armour", "gear", "mounts", "living"];
const GEAR_CATS = ["Adventuring Gear", "Artisan's Tools", "Gaming Set", "Musical Instrument", "Other Tools", "Pipe-weed"];

function CoinageNote() {
  return (
    <div className={`${cardCls} mt-6`}>
      <p className={eyebrow}>Coinage</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{LOTR_TABLES.coinage} Prices list GP/SP/CP for gold, silver pennies and copper coins.</p>
    </div>
  );
}

export default async function LotrEquipmentPage({ searchParams }: { searchParams: Promise<RawQuery> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const raw = await searchParams;
  const mode = MODES.includes(one(raw.mode)) ? one(raw.mode) : "weapons";
  const q = one(raw.q).trim().toLowerCase();

  const [hbWV, hbWOwn, hbGV, hbGOwn, campaigns] = await Promise.all([
    visibleHomebrew(user.id, { type: "lotr-weapon" }),
    ownHomebrew(user.id, "lotr-weapon"),
    visibleHomebrew(user.id, { type: "lotr-gear" }),
    ownHomebrew(user.id, "lotr-gear"),
    userCampaigns(user.id),
  ]);
  const hbW = hbWV.map((h) => h.data as unknown as LotrWeapon & { description?: string });
  const hbG = hbGV.map((h) => h.data as unknown as LotrGear);

  const modeOpts = [
    { key: "weapons", label: `Weapons (${LOTR_WEAPONS.length + hbW.length})` },
    { key: "armour", label: `Armour (${LOTR_ARMOR.length})` },
    { key: "gear", label: `Gear (${LOTR_GEAR.length + hbG.length})` },
    { key: "mounts", label: "Mounts & Expenses" },
    { key: "living", label: "Standards of Living" },
  ];
  const head = (
    <>
      <LotrHeader title="Equipment" subtitle="weapons · armour · gear · mounts · standards of living" />
      {mode === "weapons" ? <HomebrewEditor kind="lotr-weapon" campaigns={campaigns} initial={hbWOwn} /> : null}
      {mode === "gear" ? <HomebrewEditor kind="lotr-gear" campaigns={campaigns} initial={hbGOwn} /> : null}
      <ModeRow base={BASE} current={{}} param="mode" options={modeOpts} active={mode} />
    </>
  );
  const clearBase = mode === "weapons" ? BASE : `${BASE}?mode=${mode}`;

  if (mode === "weapons") {
    const list = [...hbW, ...LOTR_WEAPONS];
    const srcOpts = srcChips(list.map((w) => w.source));
    const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
    const cats = ["Simple Melee", "Simple Ranged", "Martial Melee", "Martial Ranged"].filter((c) => list.some((w) => `${w.category} ${w.kind}` === c));
    const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
    const cur = { q: one(raw.q), cat, src };
    const facets = (w: LotrWeapon) => ({ cat: `${w.category} ${w.kind}`, src: srcKey(w.source) });
    const show = (w: LotrWeapon) => facetMatch(facets(w), cur) && (!q || w.name.toLowerCase().includes(q) || w.properties.some((p) => p.toLowerCase().includes(q)));
    const shown = list.filter(show).length;
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        {head}
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search weapons…" hidden={{ cat, src }} />
          <ChipRow label="Type" base={BASE} current={cur} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
          <ChipRow label="Source" base={BASE} current={cur} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="weapon" base={clearBase} filtered={!!(q || cat || src)} />
          <EmptyState noun="weapon" base={clearBase} hidden={shown > 0} />
          <div className={`${cardCls} overflow-x-auto`}>
            <table className="w-full min-w-[600px] border-collapse">
              <thead><tr><th className={th}>Name</th><th className={th}>Type</th><th className={th}>Damage</th><th className={th}>Properties</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
              <tbody>{list.map((w, i) => (
                <tr key={`${w.name}-${i}`} hidden={!show(w)} data-f={facetAttr(facets(w))}>
                  <td className={`${td} font-semibold text-[var(--text)]`}>{w.name} {isHb(w) ? <span className={hbBadge}>HB</span> : null}</td>
                  <td className={td}>{w.category} {w.kind}</td>
                  <td className={`${td} font-mono`}>{w.damage} {w.damageType}</td>
                  <td className={td}>{w.properties.join(", ") || "—"}{(w as { description?: string }).description ? <span className="block text-[11.5px] italic">{(w as { description?: string }).description}</span> : null}</td>
                  <td className={`${td} font-mono`}>{w.cost}</td>
                  <td className={`${td} font-mono`}>{w.weight}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </InstantFilter>
        <CoinageNote />
      </div>
    );
  }

  if (mode === "armour") {
    const cats = ["Light", "Medium", "Heavy", "Shield"].filter((c) => LOTR_ARMOR.some((a) => a.category === c));
    const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
    const cur = { q: one(raw.q), cat };
    const facets = (a: LotrArmor) => ({ cat: a.category });
    const show = (a: LotrArmor) => facetMatch(facets(a), cur) && (!q || a.name.toLowerCase().includes(q));
    const shown = LOTR_ARMOR.filter(show).length;
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        {head}
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search armour…" hidden={{ mode, cat }} />
          <ChipRow label="Category" base={BASE} current={{ mode, ...cur }} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
          <CountLine count={shown} noun="armour type" base={clearBase} filtered={!!(q || cat)} />
          <EmptyState noun="armour" base={clearBase} hidden={shown > 0} />
          <div className={`${cardCls} overflow-x-auto`}>
            <table className="w-full min-w-[600px] border-collapse">
              <thead><tr><th className={th}>Name</th><th className={th}>Category</th><th className={th}>AC</th><th className={th}>Stealth</th><th className={th}>Fatigue</th><th className={th}>Cost</th><th className={th}>Weight</th></tr></thead>
              <tbody>{LOTR_ARMOR.map((a) => (
                <tr key={a.name} hidden={!show(a)} data-f={facetAttr(facets(a))}>
                  <td className={`${td} font-semibold text-[var(--text)]`}>{a.name}</td>
                  <td className={td}>{a.category}</td>
                  <td className={`${td} font-mono`}>{a.baseAC}</td>
                  <td className={td}>{a.stealthDisadvantage ? <span className="text-[var(--bad)]">Disadvantage</span> : "—"}</td>
                  <td className={td}>{a.fatigueDisadvantage ? <span className="text-[var(--bad)]">Disadvantage</span> : "—"}</td>
                  <td className={`${td} font-mono`}>{a.cost}</td>
                  <td className={`${td} font-mono`}>{a.weight}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </InstantFilter>
        <div className={`${cardCls} mt-4`}>
          <p className={eyebrow}>Fatigue disadvantage</p>
          <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{LOTR_ARMOR_NOTE} Dwarves ignore it (Make Light of Burdens); the Cunning-make reward removes it.</p>
        </div>
        <CoinageNote />
      </div>
    );
  }

  if (mode === "gear") {
    const list = [...hbG, ...LOTR_GEAR];
    const cats = GEAR_CATS.filter((c) => list.some((g) => g.category === c));
    const cat = cats.includes(one(raw.cat)) ? one(raw.cat) : "";
    const srcOpts = srcChips(list.map((g) => g.source));
    const src = srcOpts.some((o) => o.key === one(raw.src)) ? one(raw.src) : "";
    const cur = { q: one(raw.q), cat, src };
    const facets = (g: LotrGear) => ({ cat: g.category, src: srcKey(g.source) });
    const show = (g: LotrGear) => facetMatch(facets(g), cur) && (!q || g.name.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q));
    const shown = list.filter(show).length;
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        {head}
        <InstantFilter>
          <SearchForm base={BASE} q={one(raw.q)} placeholder="Search gear…" hidden={{ mode, cat, src }} />
          <ChipRow label="Category" base={BASE} current={{ mode, ...cur }} param="cat" options={cats.map((c) => ({ key: c, label: c }))} active={cat} />
          <ChipRow label="Source" base={BASE} current={{ mode, ...cur }} param="src" options={srcOpts} active={src} />
          <CountLine count={shown} noun="item" base={clearBase} filtered={!!(q || cat || src)} />
          <EmptyState noun="item" base={clearBase} hidden={shown > 0} />
          <ul className="grid grid-cols-1 items-start gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((g, i) => (
              <li key={`${g.name}-${i}`} className={`${cardCls} py-3`} hidden={!show(g)} data-f={facetAttr(facets(g))}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base leading-tight text-[var(--sys-link)]">{g.name} {isHb(g) ? <span className={hbBadge}>HB</span> : null}</h3>
                  <span className={`${badge} shrink-0`}>{g.category}</span>
                </div>
                <p className="mt-0.5 font-mono text-[11.5px] text-[var(--muted)]">{g.cost}{g.weight && g.weight !== "—" ? ` · ${g.weight}` : ""}</p>
                {g.description ? <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">{g.description}</p> : null}
              </li>
            ))}
          </ul>
        </InstantFilter>
        <CoinageNote />
      </div>
    );
  }

  if (mode === "mounts") {
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        {head}
        <section>
          <h2 className={sectionH}>Mounts</h2>
          <div className={`${cardCls} overflow-x-auto`}>
            <table className="w-full min-w-[460px] border-collapse">
              <thead><tr><th className={th}>Mount</th><th className={th}>Cost</th><th className={th}>Speed</th><th className={th}>Carrying capacity</th><th className={th}>Constitution</th></tr></thead>
              <tbody>{LOTR_MOUNTS.map((m) => (
                <tr key={m.name}><td className={`${td} font-semibold text-[var(--text)]`}>{m.name}</td><td className={`${td} font-mono`}>{m.cost}</td><td className={td}>{m.speed}</td><td className={td}>{m.capacity}</td><td className={`${td} font-mono`}>{m.constitution}</td></tr>
              ))}</tbody>
            </table>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{LOTR_MOUNT_NOTE}</p>
        </section>
        <section className="mt-8">
          <h2 className={sectionH}>Expenses</h2>
          <div className={cardCls}>
            <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {LOTR_EXPENSES.map((e) => (
                <li key={e.item} className="flex items-baseline justify-between gap-3 border-b border-[var(--border)] py-1.5 text-[13px] text-[var(--muted)]"><span>{e.item}</span><span className="shrink-0 font-mono text-[var(--text)]">{e.cost}</span></li>
              ))}
            </ul>
          </div>
        </section>
        <CoinageNote />
      </div>
    );
  }

  // Standards of living → starting gear & coin
  const stds = LOTR_STANDARDS.filter((s) => s.gear.length || s.coin);
  const others = LOTR_STANDARDS.filter((s) => !(s.gear.length || s.coin)).map((s) => s.name);
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      {head}
      <p className="mb-4 text-[13px] leading-relaxed text-[var(--muted)]">A new hero&rsquo;s culture sets their standard of living, which decides their starting gear and coin (on top of calling equipment and the tools their background grants).{others.length ? ` ${others.join(" and ")} standards exist for wealthier folk but no heroic culture starts there.` : ""}</p>
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
        {stds.map((s) => (
          <div key={s.name} className={cardCls}>
            <div className="flex items-start justify-between gap-2">
              <h3 className={nameCls}>{s.name}</h3>
              <span className={badge}>{s.coin}{s.weight ? ` · ${s.weight}` : ""}</span>
            </div>
            <p className="mt-1 text-[12px] italic text-[var(--muted)]">{s.cultures.join(", ") || "—"}</p>
            <Bullets items={s.gear} className="mt-2" />
          </div>
        ))}
      </div>
      <div className={`${cardCls} mt-6`}>
        <p className={eyebrow}>Encumbrance</p>
        <Bullets items={LOTR_TABLES.encumbrance} className="mt-1" />
      </div>
      <CoinageNote />
    </div>
  );
}
