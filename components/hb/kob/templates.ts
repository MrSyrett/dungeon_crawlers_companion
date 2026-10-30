// ─────────────────────────────────────────────────────────────────────────────
// Kids on Bikes template lists for the shared TemplatePicker (components/hb/
// TemplatePicker.tsx). Each loader turns the book's own entries (lib/data/kob-*,
// the rows /kob/tropes and /kob/strengths render) into the STORED homebrew data
// shape for that kind — what the pages' hbToTrope/hbToStrength/hbToFlaw read —
// so a template fills the builder through the same legacy→draft path an old
// record takes (tropeFromData / strengthFromData / flawFromData). The book
// rows already are that shape: a strength's printed `cost` + `description` is
// exactly a pre-builder record (strengthFromData parses the AT cost and keeps
// the description as the text). A trope's `extras` (Capes/Brooms suggestions)
// has no builder field and is left out.
//
// Book arrays load with dynamic import() inside each loader (a separate chunk,
// fetched only when the picker opens).
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 80) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);

async function bookNames(): Promise<{ order: string[]; label: (k: string) => string }> {
  const { KOB_BOOKS } = await import("@/lib/data/kob-books");
  const name = Object.fromEntries(KOB_BOOKS.map((b) => [b.key, b.name])) as Record<string, string>;
  return { order: KOB_BOOKS.map((b) => b.name), label: (k) => name[k] ?? k };
}
const inOrder = (list: TemplateOption[], order: string[]) =>
  list.sort((a, b) => order.indexOf(a.group ?? "") - order.indexOf(b.group ?? "") || byName(a, b));

async function tropes(): Promise<TemplateOption[]> {
  const [{ KOB_TROPES }, books] = await Promise.all([import("@/lib/data/kob-tropes"), bookNames()]);
  return inOrder(
    KOB_TROPES.map((t, i): TemplateOption => {
      const data: Data = {
        name: t.name, book: t.book, dice: { ...t.dice }, ages: [...t.ages],
        suggestedStrengths: [...t.suggestedStrengths], suggestedFlaws: [...t.suggestedFlaws], questions: [...t.questions],
      };
      if (t.suggestedRide) data.suggestedRide = t.suggestedRide;
      const dice = Object.entries(t.dice).map(([s, d]) => `${s.slice(0, 3)} d${d}`).join(" ");
      return { key: `${t.name}#${t.book}#${i}`, name: t.name, group: books.label(t.book), meta: [t.ages.join(", "), dice].filter(Boolean).join(" · "), data };
    }),
    books.order,
  );
}

async function strengths(): Promise<TemplateOption[]> {
  const [{ KOB_STRENGTHS }, books] = await Promise.all([import("@/lib/data/kob-strengths"), bookNames()]);
  return inOrder(
    KOB_STRENGTHS.map((s, i): TemplateOption => ({
      key: `${s.name}#${s.book}#${i}`,
      name: s.name,
      group: books.label(s.book),
      meta: [s.cost, snip(s.description, 70)].filter(Boolean).join(" · "),
      data: { name: s.name, book: s.book, cost: s.cost, description: s.description },
    })),
    books.order,
  );
}

async function flaws(): Promise<TemplateOption[]> {
  const [{ KOB_FLAWS }, books] = await Promise.all([import("@/lib/data/kob-flaws"), bookNames()]);
  return inOrder(
    KOB_FLAWS.map((f, i): TemplateOption => ({
      key: `${f.name}#${f.book}#${i}`,
      name: f.name,
      group: books.label(f.book),
      meta: f.description ? snip(f.description) : books.label(f.book),
      data: { name: f.name, book: f.book, description: f.description ?? "" },
    })),
    books.order,
  );
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "kob-trope": tropes,
  "kob-strength": strengths,
  "kob-flaw": flaws,
};

/** The book's template loader for a kob-* kind, or null when it has none. */
export const kobBookTemplates = (kind: string): (() => Promise<TemplateOption[]>) | null => LOADERS[kind] ?? null;
