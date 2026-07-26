"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Mirror of lib/homebrew's public shapes (kept local so this client component
// doesn't pull in the server module). Must stay in sync with lib/homebrew's HbType.
type HbType = "spell" | "gear" | "monster" | "class" | "ancestry" | "background";
type CampaignRef = { id: string; name: string; code: string };
type HomebrewRecord = {
  id: string;
  type: HbType;
  name: string;
  campaignIds: string[];
  data: Record<string, unknown>;
  updatedAt: string;
  owner: boolean;
};

const BONUS_TARGETS: [string, string][] = [
  ["ac", "AC"], ["hp", "HP"], ["meleeAtk", "Melee Attack"], ["meleeDmg", "Melee Damage"],
  ["rangedAtk", "Ranged Attack"], ["rangedDmg", "Ranged Damage"], ["slots", "Gear Slots"],
  ["str", "Strength"], ["dex", "Dexterity"], ["con", "Constitution"],
  ["int", "Intelligence"], ["wis", "Wisdom"], ["cha", "Charisma"],
];
const GEAR_KINDS: [string, string][] = [
  ["gear", "Gear"], ["weapon", "Weapon"], ["armor", "Armor"],
  ["shield", "Shield"], ["magic", "Magic Item"], ["ammo", "Ammo"],
];
const TIERS = ["1", "2", "3", "4", "5"];
const ALIGNMENTS: [string, string][] = [["L", "Lawful"], ["N", "Neutral"], ["C", "Chaotic"]];
// Stored lowercase to match the book's stat blocks ("near"), shown capitalised.
const MOVEMENTS: [string, string][] = [["near", "Near"], ["close", "Close"], ["far", "Far"]];
const ABILITIES: [keyof Form, string][] = [
  ["mS", "STR"], ["mD", "DEX"], ["mC", "CON"], ["mI", "INT"], ["mW", "WIS"], ["mCh", "CHA"],
];
// Mirrors WEAPON_RANGES / SPELL_RANGES in lib/homebrew.ts (kept local so this
// client component doesn't import the server module).
const WEAPON_RANGES = ["Close", "Near", "Far", "Close/Near", "Close/Far"];
const SPELL_RANGES = [
  "Self", "Touch", "Close", "Near", "Far", "Double near", "1 mile", "Same plane", "Unlimited",
];

type BonusRow = { amount: string; target: string };
type Form = {
  id: string | null; // null while creating
  name: string;
  campaignIds: string[]; // empty = personal
  // spell
  tier: string;
  range: string;
  duration: string;
  damage: string;
  desc: string;
  // gear
  kind: string;
  cost: string;
  costUnit: string;
  slots: string;
  qty: string;
  note: string;
  wtype: string;
  ammo: string; // "" = needs no ammo (explicit, outranks the sheet's name guess)
  acBase: string;
  acDex: boolean;
  acBonus: string;
  props: string;
  bonuses: BonusRow[];
  equippable: boolean;
  // monster
  ac: string;
  hp: string;
  atk: string;
  mv: string;
  lv: string;
  al: string;
  mS: string; mD: string; mC: string; mI: string; mW: string; mCh: string;
  notes: string;
  ctype: string;
};

const s = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

function blankForm(type: HbType): Form {
  return {
    id: null,
    name: "",
    campaignIds: [],
    tier: "1",
    range: type === "spell" ? "Close" : "",
    duration: "Instant",
    damage: "",
    desc: "",
    kind: "gear",
    cost: "",
    costUnit: "gp",
    slots: "",
    qty: "",
    note: "",
    wtype: "M",
    ammo: "",
    acBase: "11",
    acDex: true,
    acBonus: "2",
    props: "",
    bonuses: [],
    equippable: false,
    ac: "10",
    hp: "1",
    atk: "",
    mv: "near",
    lv: "1",
    al: "N",
    mS: "+0", mD: "+0", mC: "+0", mI: "+0", mW: "+0", mCh: "+0",
    notes: "",
    ctype: "Monster",
  };
}

function formFromRecord(rec: HomebrewRecord): Form {
  const d = rec.data || {};
  const base = blankForm(rec.type);
  base.id = rec.id;
  base.name = rec.name;
  base.campaignIds = rec.campaignIds ?? [];
  if (rec.type === "monster") {
    base.ac = s(d.ac); base.hp = s(d.hp); base.atk = s(d.atk);
    base.mv = s(d.mv); base.lv = s(d.lv); base.al = s(d.al) || "N";
    base.mS = s(d.s); base.mD = s(d.d); base.mC = s(d.c);
    base.mI = s(d.i); base.mW = s(d.w); base.mCh = s(d.ch);
    base.notes = s(d.notes);
    base.ctype = s(d.ctype) || "Monster";
  } else if (rec.type === "spell") {
    base.tier = s(d.tier) || "1";
    base.range = s(d.range);
    base.duration = s(d.duration);
    base.damage = s(d.damage);
    base.desc = s(d.desc);
  } else {
    base.kind = s(d.kind) || "gear";
    const unit = ["gp", "sp", "cp"].find((u) => d[u] != null) || "gp";
    base.costUnit = unit;
    base.cost = d[unit] != null ? s(d[unit]) : "";
    base.slots = s(d.slots);
    base.qty = s(d.qty);
    base.note = s(d.note);
    base.wtype = s(d.wtype) || "M";
    base.ammo = s(d.ammo);
    base.range = s(d.range);
    base.damage = s(d.damage);
    base.props = s(d.props);
    base.acBase = d.acBase != null ? s(d.acBase) : "11";
    base.acDex = !!d.acDex;
    base.acBonus = d.acBonus != null ? s(d.acBonus) : "2";
    base.bonuses = Array.isArray(d.bonuses)
      ? (d.bonuses as Record<string, unknown>[]).map((b) => ({ amount: s(b.amount), target: s(b.target) }))
      : [];
    base.equippable = !!d.equippable;
  }
  return base;
}

function payloadFromForm(type: HbType, f: Form): Record<string, unknown> {
  if (type === "monster") {
    return {
      name: f.name, ac: f.ac, hp: f.hp, atk: f.atk, mv: f.mv, lv: f.lv, al: f.al,
      s: f.mS, d: f.mD, c: f.mC, i: f.mI, w: f.mW, ch: f.mCh,
      notes: f.notes, ctype: f.ctype,
    };
  }
  if (type === "spell") {
    return {
      name: f.name,
      tier: f.tier,
      range: f.range,
      duration: f.duration,
      damage: f.damage,
      desc: f.desc,
    };
  }
  return {
    name: f.name,
    kind: f.kind,
    cost: f.cost,
    costUnit: f.costUnit,
    slots: f.slots,
    qty: f.qty,
    note: f.note,
    wtype: f.wtype,
    ammo: f.ammo,
    range: f.range,
    damage: f.damage,
    props: f.props,
    acBase: f.acBase,
    acDex: f.acDex,
    acBonus: f.acBonus,
    bonuses: f.bonuses,
    equippable: f.equippable,
  };
}

// `fieldBase` carries no width, so callers can set their own without fighting
// `w-full` (two width utilities on one element resolve by stylesheet order, not
// by the order they're written — which previously blew out the bonus amount box).
const fieldBase =
  "rounded border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--gold)]";
const field = `w-full ${fieldBase}`;
const label = "block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)] mb-1";
const btn =
  "rounded border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--gold)] hover:text-[var(--text)] disabled:opacity-50";
const btnGold =
  "rounded border border-[var(--gold)] bg-[var(--panel-2)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black disabled:opacity-50";

export default function HomebrewManager({
  type,
  campaigns,
  initial,
  ammoOptions = [],
  monsterTypes = [],
}: {
  type: HbType;
  campaigns: CampaignRef[];
  initial: HomebrewRecord[];
  /** Ammo a homebrew weapon can require — book ammo plus any homebrew ammo. */
  ammoOptions?: string[];
  /** Creature types offered for homebrew monsters. */
  monsterTypes?: string[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<HomebrewRecord[]>(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const noun = type === "spell" ? "spell" : type === "monster" ? "monster" : "item";
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  function shareLabel(rec: HomebrewRecord): string {
    const ids = rec.campaignIds ?? [];
    if (!ids.length) return "Personal";
    const names = ids.map((id) => campaigns.find((x) => x.id === id)?.name).filter(Boolean);
    if (!names.length) return `Shared · ${ids.length} campaign${ids.length === 1 ? "" : "s"}`;
    return `Shared · ${names.join(", ")}`;
  }

  function toggleCampaign(id: string) {
    setForm((f) =>
      f
        ? {
            ...f,
            campaignIds: f.campaignIds.includes(id)
              ? f.campaignIds.filter((x) => x !== id)
              : [...f.campaignIds, id],
          }
        : f,
    );
  }

  async function submit() {
    if (!form) return;
    if (!form.name.trim()) {
      setError(`Give the ${noun} a name.`);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const body =
        form.id === null
          ? { type, data: payloadFromForm(type, form), campaignIds: form.campaignIds }
          : { data: payloadFromForm(type, form), campaignIds: form.campaignIds };
      const res = await fetch(form.id === null ? "/api/homebrew" : `/api/homebrew/${form.id}`, {
        method: form.id === null ? "POST" : "PATCH",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setError((await res.text()) || "Could not save.");
        return;
      }
      const { item } = (await res.json()) as { item: HomebrewRecord };
      setItems((prev) => {
        const without = prev.filter((p) => p.id !== item.id);
        return [item, ...without].sort((a, b) => a.name.localeCompare(b.name, "en"));
      });
      setForm(null);
      router.refresh(); // update the merged catalog on the page
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(rec: HomebrewRecord) {
    if (!confirm(`Delete "${rec.name}"? This can't be undone.`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/homebrew/${rec.id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!res.ok) {
        setError("Could not delete.");
        return;
      }
      setItems((prev) => prev.filter((p) => p.id !== rec.id));
      if (form?.id === rec.id) setForm(null);
      router.refresh();
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--panel)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-bold uppercase tracking-[0.15em]">
          My Homebrew {type === "spell" ? "Spells" : type === "monster" ? "Monsters" : "Gear"}
          <span className="ml-2 text-[var(--muted)]">({items.length})</span>
        </span>
        <span className="text-[var(--muted)]">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className="border-t border-[var(--border)] px-4 py-4">
          {items.length === 0 ? (
            <p className="mb-3 text-[13px] text-[var(--muted)]">
              Nothing yet. Create a homebrew {noun} below — keep it personal, or share it with a
              campaign so every linked sheet can use it.
            </p>
          ) : (
            <ul className="mb-4 divide-y divide-[var(--border)]">
              {items.map((rec) => (
                <li key={rec.id} className="flex items-center justify-between gap-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[var(--text)]">{rec.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {shareLabel(rec)}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className={btn} onClick={() => setForm(formFromRecord(rec))} disabled={busy}>
                      Edit
                    </button>
                    <button className={btn} onClick={() => remove(rec)} disabled={busy}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {form ? (
            <div className="rounded border border-[var(--border)] bg-[var(--panel-2)] p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label}>Name</label>
                  <input
                    className={field}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder={type === "spell" ? "Spell name" : "Item name"}
                  />
                </div>

                {type === "monster" ? (
                  <>
                    <div>
                      <label className={label}>Creature type</label>
                      <select className={field} value={form.ctype} onChange={(e) => set("ctype", e.target.value)}>
                        {(monsterTypes.length ? monsterTypes : ["Monster"]).map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Level</label>
                      <input className={field} value={form.lv} onChange={(e) => set("lv", e.target.value)} placeholder="1" />
                    </div>
                    <div>
                      <label className={label}>AC</label>
                      <input className={field} value={form.ac} onChange={(e) => set("ac", e.target.value)} placeholder="12" />
                    </div>
                    <div>
                      <label className={label}>HP</label>
                      <input className={field} value={form.hp} onChange={(e) => set("hp", e.target.value)} placeholder="8" />
                    </div>
                    <div>
                      <label className={label}>Movement</label>
                      <select className={field} value={form.mv} onChange={(e) => set("mv", e.target.value)}>
                        {MOVEMENTS.map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                        {form.mv && !MOVEMENTS.some(([v]) => v === form.mv) ? (
                          <option value={form.mv}>{form.mv}</option>
                        ) : null}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Alignment</label>
                      <select className={field} value={form.al} onChange={(e) => set("al", e.target.value)}>
                        {ALIGNMENTS.map(([k, l]) => (
                          <option key={k} value={k}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Attacks</label>
                      <input
                        className={field}
                        value={form.atk}
                        onChange={(e) => set("atk", e.target.value)}
                        placeholder="1 claw +2 (1d6) or 1 bite +1 (1d8)"
                      />
                      <p className="mt-1 text-[11px] text-[var(--muted)]">
                        Written like the book — the GM screen turns each “+bonus (dice)” into a roll button.
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Ability modifiers</label>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {ABILITIES.map(([key, lbl]) => (
                          <div key={String(key)}>
                            <div className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{lbl}</div>
                            <input
                              className={`${field} text-center`}
                              value={String(form[key])}
                              onChange={(e) => set(key, e.target.value as never)}
                              placeholder="+0"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Traits</label>
                      <textarea
                        className={field}
                        rows={3}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Fire Breath: Fills a near cube. DC 15 DEX or 4d6 damage."
                      />
                      <p className="mt-1 text-[11px] text-[var(--muted)]">
                        Use “Name: description.” for each trait. Any dice become roll buttons in the tracker.
                      </p>
                    </div>
                  </>
                ) : type === "spell" ? (
                  <>
                    <div>
                      <label className={label}>Tier</label>
                      <select className={field} value={form.tier} onChange={(e) => set("tier", e.target.value)}>
                        {TIERS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Range</label>
                      <select className={field} value={form.range} onChange={(e) => set("range", e.target.value)}>
                        {SPELL_RANGES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Duration</label>
                      <input className={field} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="Instant / Focus / 5 rounds" />
                    </div>
                    <div>
                      <label className={label}>Damage / Healing (optional)</label>
                      <input className={field} value={form.damage} onChange={(e) => set("damage", e.target.value)} placeholder="e.g. 1d6" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Description</label>
                      <textarea className={field} rows={3} value={form.desc} onChange={(e) => set("desc", e.target.value)} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className={label}>Kind</label>
                      <select className={field} value={form.kind} onChange={(e) => set("kind", e.target.value)}>
                        {GEAR_KINDS.map(([k, l]) => (
                          <option key={k} value={k}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className={label}>Cost</label>
                        <input className={field} type="number" value={form.cost} onChange={(e) => set("cost", e.target.value)} placeholder="0" />
                      </div>
                      <div className="w-20">
                        <label className={label}>Unit</label>
                        <select className={field} value={form.costUnit} onChange={(e) => set("costUnit", e.target.value)}>
                          <option value="gp">gp</option>
                          <option value="sp">sp</option>
                          <option value="cp">cp</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={label}>Gear slots</label>
                      <input className={field} value={form.slots} onChange={(e) => set("slots", e.target.value)} placeholder="1" />
                    </div>
                    <div>
                      <label className={label}>Quantity per slot (optional)</label>
                      <input className={field} value={form.qty} onChange={(e) => set("qty", e.target.value)} placeholder="e.g. 20" />
                    </div>

                    {form.kind === "weapon" ? (
                      <>
                        <div>
                          <label className={label}>Weapon type</label>
                          <select className={field} value={form.wtype} onChange={(e) => set("wtype", e.target.value)}>
                            <option value="M">Melee</option>
                            <option value="R">Ranged</option>
                            <option value="M/R">Melee / Ranged</option>
                          </select>
                        </div>
                        <div>
                          <label className={label}>Range</label>
                          <select className={field} value={form.range} onChange={(e) => set("range", e.target.value)}>
                            {WEAPON_RANGES.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={label}>Requires ammo</label>
                          <select className={field} value={form.ammo} onChange={(e) => set("ammo", e.target.value)}>
                            <option value="">— None —</option>
                            {ammoOptions.map((a) => (
                              <option key={a} value={a}>{a}</option>
                            ))}
                            {form.ammo && !ammoOptions.includes(form.ammo) ? (
                              <option value={form.ammo}>{form.ammo} (missing)</option>
                            ) : null}
                          </select>
                        </div>
                        <div>
                          <label className={label}>Damage</label>
                          <input className={field} value={form.damage} onChange={(e) => set("damage", e.target.value)} placeholder="1d6" />
                        </div>
                        <div>
                          <label className={label}>Properties</label>
                          <input className={field} value={form.props} onChange={(e) => set("props", e.target.value)} placeholder="Finesse, Thrown" />
                        </div>
                      </>
                    ) : null}

                    {form.kind === "armor" ? (
                      <>
                        <div>
                          <label className={label}>Base AC</label>
                          <input className={field} type="number" value={form.acBase} onChange={(e) => set("acBase", e.target.value)} placeholder="11" />
                        </div>
                        <div className="flex items-end pb-2">
                          <label className="flex items-center gap-2 text-sm text-[var(--text)]">
                            <input type="checkbox" checked={form.acDex} onChange={(e) => set("acDex", e.target.checked)} />
                            Adds DEX modifier
                          </label>
                        </div>
                      </>
                    ) : null}

                    {form.kind === "shield" ? (
                      <div>
                        <label className={label}>AC bonus</label>
                        <input className={field} type="number" value={form.acBonus} onChange={(e) => set("acBonus", e.target.value)} placeholder="2" />
                      </div>
                    ) : null}

                    <div className="sm:col-span-2">
                      <label className={label}>Description</label>
                      <textarea className={field} rows={2} value={form.note} onChange={(e) => set("note", e.target.value)} />
                    </div>

                    {/* Bonuses + equippable — same system the sheet applies when the item is equipped */}
                    <div className="sm:col-span-2">
                      <label className={label}>Bonuses (applied when equipped)</label>
                      <div className="flex flex-col gap-2">
                        {form.bonuses.map((b, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              className={`${fieldBase} w-16 shrink-0`}
                              type="number"
                              value={b.amount}
                              placeholder="+1"
                              onChange={(e) =>
                                set(
                                  "bonuses",
                                  form.bonuses.map((x, j) => (j === i ? { ...x, amount: e.target.value } : x)),
                                )
                              }
                            />
                            <select
                              className={`${fieldBase} min-w-0 flex-1`}
                              value={b.target}
                              onChange={(e) =>
                                set(
                                  "bonuses",
                                  form.bonuses.map((x, j) => (j === i ? { ...x, target: e.target.value } : x)),
                                )
                              }
                            >
                              {BONUS_TARGETS.map(([k, l]) => (
                                <option key={k} value={k}>{l}</option>
                              ))}
                            </select>
                            <button
                              className={`${btn} shrink-0`}
                              onClick={() => set("bonuses", form.bonuses.filter((_, j) => j !== i))}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        className={`${btn} mt-2`}
                        onClick={() => set("bonuses", [...form.bonuses, { amount: "", target: "ac" }])}
                      >
                        + Add bonus
                      </button>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-[var(--text)]">
                        <input type="checkbox" checked={form.equippable} onChange={(e) => set("equippable", e.target.checked)} />
                        Equippable (shows an equip checkbox in the gear list)
                      </label>
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label className={label}>Share with</label>
                  {campaigns.length === 0 ? (
                    <p className="text-[11px] text-[var(--muted)]">
                      Join or create a campaign to share homebrew with a party.
                    </p>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1.5">
                        {campaigns.map((c) => (
                          <label key={c.id} className="flex items-center gap-2 text-sm text-[var(--text)]">
                            <input
                              type="checkbox"
                              checked={form.campaignIds.includes(c.id)}
                              onChange={() => toggleCampaign(c.id)}
                            />
                            {c.name}
                          </label>
                        ))}
                      </div>
                      <p className="mt-1.5 text-[11px] text-[var(--muted)]">
                        {form.campaignIds.length === 0
                          ? "Personal — only you can use this."
                          : `Every sheet linked to ${form.campaignIds.length} campaign${form.campaignIds.length === 1 ? "" : "s"} can use this.`}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {error ? <p className="mt-3 text-[13px] text-[var(--red)]">{error}</p> : null}

              <div className="mt-4 flex gap-2">
                <button className={btnGold} onClick={submit} disabled={busy}>
                  {busy ? "Saving…" : form.id === null ? "Create" : "Save changes"}
                </button>
                <button className={btn} onClick={() => setForm(null)} disabled={busy}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button className={btnGold} onClick={() => setForm(blankForm(type))} disabled={busy}>
              + Add homebrew {noun}
            </button>
          )}

          {error && !form ? <p className="mt-3 text-[13px] text-[var(--red)]">{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
