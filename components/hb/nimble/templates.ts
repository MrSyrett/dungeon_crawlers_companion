// ─────────────────────────────────────────────────────────────────────────────
// Nimble template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). The book rows (lib/data/nimble-*) already ARE the legacy
// stored homebrew shape for each nimble-* kind — the builders' xxxFromData()
// parse the composed strings (damage / armor / properties / cost, the spell
// text, the "Name. text" abilities, the saves line) exactly as they do for a
// record saved before the structured builder data existed. So each loader only
// drops the book-only fields (page) and adds the group/meta the picker shows.
//
// The books are pulled in with dynamic import() inside each loader, so they're
// only fetched (as a separate chunk) when someone opens the picker.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { NIM_ITEM_CATEGORIES } from "./rules";

type Data = Record<string, unknown>;
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const strip = <T extends { page?: number }>(row: T): Data => {
  const { page: _page, ...rest } = row;
  void _page;
  return rest as Data;
};
/** Stable sort by the order groups first appear in (the page's own order). */
const inGroupOrder = (list: TemplateOption[]) => {
  const order: string[] = [];
  for (const o of list) if (!order.includes(o.group ?? "")) order.push(o.group ?? "");
  return list.map((o, i) => ({ o, i })).sort((a, b) => order.indexOf(a.o.group ?? "") - order.indexOf(b.o.group ?? "") || a.i - b.i).map((x) => x.o);
};

async function items(): Promise<TemplateOption[]> {
  const { NIMBLE_ITEMS } = await import("@/lib/data/nimble-items");
  const order = NIM_ITEM_CATEGORIES as readonly string[];
  return NIMBLE_ITEMS.map((it, i): TemplateOption => ({
    key: `${it.name}#${it.category}#${i}`,
    name: it.name,
    group: it.category,
    meta: [it.damage || (it.armor ? `Armor ${it.armor}` : ""), it.properties, it.cost || it.rarity || (it.description ? snip(it.description, 60) : "")].filter(Boolean).join(" · "),
    data: strip(it),
  })).sort((a, b) => (order.indexOf(a.group ?? "") + 1 || 99) - (order.indexOf(b.group ?? "") + 1 || 99));
}

async function spells(): Promise<TemplateOption[]> {
  const { NIMBLE_SPELLS } = await import("@/lib/data/nimble-spells");
  // The spells page sorts school → tiered before utility → tier.
  const sorted = [...NIMBLE_SPELLS].sort((a, b) => a.school.localeCompare(b.school) || Number(!!a.utility) - Number(!!b.utility) || a.tier - b.tier);
  return sorted.map((s, i): TemplateOption => ({
    key: `${s.name}#${s.school}#${i}`,
    name: s.name,
    group: s.school,
    meta: [s.utility ? "Utility" : s.tier ? `Tier ${s.tier}` : "Cantrip", s.actions, s.targeting].filter(Boolean).join(" · "),
    data: strip(s),
  }));
}

async function monsters(): Promise<TemplateOption[]> {
  const { NIMBLE_MONSTERS } = await import("@/lib/data/nimble-monsters");
  return inGroupOrder(NIMBLE_MONSTERS.map((m, i): TemplateOption => ({
    key: `${m.name}#${m.family}#${i}`,
    name: m.name,
    group: m.family,
    meta: [`Lvl ${m.level}${m.legendary ? " Solo" : ""}`, m.minion ? "minion" : `${m.hp ?? "—"} HP`, m.armor ? (m.armor === "H" ? "Heavy armor" : "Medium armor") : "", m.size].filter(Boolean).join(" · "),
    data: strip(m),
  })));
}

async function ancestries(): Promise<TemplateOption[]> {
  const { NIMBLE_ANCESTRIES } = await import("@/lib/data/nimble-ancestries");
  return NIMBLE_ANCESTRIES.map((a, i): TemplateOption => ({
    key: `${a.name}#${i}`,
    name: a.name,
    group: a.group,
    meta: [a.size, a.traits.map((t) => t.name).filter(Boolean).join(", ")].filter(Boolean).join(" · "),
    data: strip(a),
  })).sort((a, b) => (a.group === b.group ? 0 : a.group === "Common" ? -1 : 1));
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "nimble-item": items, "nimble-spell": spells, "nimble-monster": monsters, "nimble-ancestry": ancestries,
};

/** The book's entries for a nimble-* homebrew kind, lazily loaded (see header). */
export function nimbleTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
