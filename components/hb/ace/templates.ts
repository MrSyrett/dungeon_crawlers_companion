// ─────────────────────────────────────────────────────────────────────────────
// ACE! template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Each loader turns the book's own entries (lib/data/ace-*,
// the rows the /ace reference pages render) into the STORED homebrew data shape
// for that kind — the shape the pages' hbToX() read back — so a template fills
// the builder through the same legacy→draft path an old record takes
// (roleFromData / gearFromData / extraFromData / focusFromData / traitFromData).
// ACE's book rows already are that shape; only the page number is dropped.
//
// The book arrays are pulled in with dynamic import() inside each loader, so
// they're only fetched (as a separate chunk) when someone opens the picker.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { ACE_STATS, settingLabel } from "./rules";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 80) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
/** Book row → stored data: drop the printed page, keep everything else. */
const strip = <T extends { page?: number }>(row: T): Data => {
  const out: Data = { ...row };
  delete out.page;
  return out;
};
/** Order groups by first appearance (the page's own chip order), then by name. */
const inOrder = (list: TemplateOption[], order: string[]) =>
  list.sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b));

async function roles(): Promise<TemplateOption[]> {
  const { ACE_ROLES } = await import("@/lib/data/ace-roles");
  const order = [...new Set(ACE_ROLES.map((r) => r.category))];
  return inOrder(
    ACE_ROLES.map((r, i): TemplateOption => ({
      key: `${r.name}#${r.setting}#${i}`,
      name: r.name,
      group: r.category,
      meta: [settingLabel(r.setting), r.power ? "Power" : "", snip(r.ability, 60)].filter(Boolean).join(" · "),
      data: strip(r),
    })),
    order,
  );
}

async function focuses(): Promise<TemplateOption[]> {
  const { ACE_FOCUSES } = await import("@/lib/data/ace-focuses");
  return inOrder(
    ACE_FOCUSES.map((f, i): TemplateOption => ({
      key: `${f.name}#${f.stat}#${f.setting}#${i}`,
      name: f.name,
      group: f.stat,
      meta: [f.stat, settingLabel(f.setting), f.note ?? ""].filter(Boolean).join(" · "),
      data: { ...f },
    })),
    [...ACE_STATS],
  );
}

async function traits(): Promise<TemplateOption[]> {
  const { ACE_TRAITS } = await import("@/lib/data/ace-traits");
  const order = [...new Set(ACE_TRAITS.map((t) => settingLabel(t.setting)))];
  return inOrder(
    ACE_TRAITS.map((t, i): TemplateOption => ({
      key: `${t.name}#${t.setting}#${i}`,
      name: t.name,
      group: settingLabel(t.setting),
      meta: t.description ? snip(t.description) : settingLabel(t.setting),
      data: { ...t },
    })),
    order,
  );
}

async function gear(): Promise<TemplateOption[]> {
  const { ACE_GEAR } = await import("@/lib/data/ace-gear");
  const order = [...new Set(ACE_GEAR.map((g) => g.category))].sort();
  return inOrder(
    ACE_GEAR.map((g, i): TemplateOption => ({
      key: `${g.name}#${g.setting}#${i}`,
      name: g.name,
      group: g.category,
      meta: [g.tier, g.tn != null ? `TN ${g.tn}` : "", g.damage != null ? `${g.damage} dmg` : "", g.defence != null ? `+${g.defence} Def` : "", settingLabel(g.setting)].filter(Boolean).join(" · "),
      data: strip(g),
    })),
    order,
  );
}

async function extras(): Promise<TemplateOption[]> {
  const { ACE_EXTRAS } = await import("@/lib/data/ace-extras");
  const order = [...new Set(ACE_EXTRAS.map((e) => e.type))].sort();
  return inOrder(
    ACE_EXTRAS.map((e, i): TemplateOption => ({
      key: `${e.name}#${e.setting}#${i}`,
      name: e.name,
      group: e.type,
      meta: [e.type, e.health != null ? `Health ${e.health}` : "", e.defence != null ? `Def ${e.defence}` : "", settingLabel(e.setting)].filter(Boolean).join(" · "),
      data: strip(e),
    })),
    order,
  );
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "ace-role": roles,
  "ace-focus": focuses,
  "ace-trait": traits,
  "ace-gear": gear,
  "ace-extra": extras,
};

/** The book's template loader for an ace-* kind, or null when it has none. */
export const aceBookTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
