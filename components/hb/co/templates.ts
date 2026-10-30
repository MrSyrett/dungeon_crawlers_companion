// ─────────────────────────────────────────────────────────────────────────────
// Candela Obscura template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Each loader turns the book's own entries (lib/data/
// candela-data, the rows /candela/abilities and /candela/gear render) into the
// STORED homebrew data shape for that kind — { source, owner, desc } for an
// ability, { type, owner, desc } for gear, i.e. a pre-builder record — so a
// template fills the builder through the same legacy→draft path an old record
// takes (abilityFromData / gearFromData: the book's `desc` becomes the
// builder's text; uses/costs/actions/effects start empty — the book states
// those in prose, so they stay in the text for the user to turn into badges).
//
// Specialty gear: the book lists only names in each specialty's kit, so those
// templates carry type "Specialty" + owner and no text.
//
// The data loads with dynamic import() inside each loader (a separate chunk,
// fetched only when the picker opens).
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

const snip = (t: string, n = 80) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);

async function abilities(): Promise<TemplateOption[]> {
  const { CO_ROLES } = await import("@/lib/data/candela-data");
  const out: TemplateOption[] = [];
  for (const r of CO_ROLES) {
    r.abilities.forEach((a, i) =>
      out.push({ key: `role:${r.role}:${a.name}#${i}`, name: a.name, group: "Role", meta: `${r.role} · ${snip(a.desc, 60)}`, data: { name: a.name, source: "Role", owner: r.role, desc: a.desc } }),
    );
  }
  for (const r of CO_ROLES) {
    for (const sp of r.specialties) {
      sp.abilities.forEach((a, i) =>
        out.push({ key: `spec:${sp.name}:${a.name}#${i}`, name: a.name, group: "Specialty", meta: `${sp.name} · ${snip(a.desc, 60)}`, data: { name: a.name, source: "Specialty", owner: sp.name, desc: a.desc } }),
      );
    }
  }
  return out;
}

async function gear(): Promise<TemplateOption[]> {
  const { CO_GEAR, CO_ROLES } = await import("@/lib/data/candela-data");
  const out: TemplateOption[] = CO_GEAR.map((g, i) => ({
    key: `std:${g.name}#${i}`, name: g.name, group: g.type, meta: snip(g.desc), data: { name: g.name, type: g.type, desc: g.desc },
  }));
  for (const r of CO_ROLES) {
    for (const sp of r.specialties) {
      sp.gear.forEach((g, i) =>
        out.push({ key: `spec:${sp.name}:${g}#${i}`, name: g, group: "Specialty", meta: `${sp.name} gear`, data: { name: g, type: "Specialty", owner: sp.name, desc: "" } }),
      );
    }
  }
  return out;
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "co-ability": abilities,
  "co-gear": gear,
};

/** The book's template loader for a co-* kind, or null when it has none. */
export const coBookTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
