// ─────────────────────────────────────────────────────────────────────────────
// MARVEL MULTIVERSE RPG template lists for the shared TemplatePicker
// (components/hb/TemplatePicker.tsx). Each loader turns the book's entries
// (lib/data/mmrpg-*.ts, the rows the reference pages render) into the STORED
// homebrew data shape (./rules.ts), so a template fills the builder through the
// same powerFromData / labelFromData / iconicFromData / baseFromData path an
// old record takes.
//
// Powers, traits and tags already are the stored shapes (prose effect /
// description; badges are left for the user). Iconic items: the book's
// "Restrictions: Carried, Flashy; Note: …" line splits into the restriction
// picks and the special text, granted powers / origin / range / attack
// abilities / damage bonus map across, and the book's Power Value is kept as
// an override (the builder's auto PV is one click away). The long lore `notes`
// aren't a builder field and are dropped. HQ / starship profiles map rank,
// traits and tags; the blurb becomes the notes.
// The book arrays are pulled in with dynamic import() inside each loader.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";

type Data = Record<string, unknown>;
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 90) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const s = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));

async function powers(): Promise<TemplateOption[]> {
  const { MMRPG_POWERS } = await import("@/lib/data/mmrpg-powers");
  return MMRPG_POWERS.map((p, i): TemplateOption => ({
    key: `${p.name}#${p.powerSet}#${i}`,
    name: p.name,
    group: p.powerSet === "None" || !p.powerSet ? "Basic" : p.powerSet,
    meta: [p.prerequisites && p.prerequisites !== "None" ? `prereq ${p.prerequisites}` : "", p.action, p.cost, p.duration].filter(Boolean).join(" · ") || snip(p.effect),
    data: {
      name: p.name, powerSet: p.powerSet || "None", prerequisites: p.prerequisites, action: p.action, trigger: p.trigger,
      duration: p.duration, range: p.range, cost: p.cost, effect: p.effect, fantastic: p.fantastic,
    },
  })).sort((a, b) => (a.group === b.group ? 0 : a.group === "Basic" ? -1 : b.group === "Basic" ? 1 : (a.group ?? "").localeCompare(b.group ?? "")) || byName(a, b));
}

const labels = (load: () => Promise<{ name: string; description: string }[]>) => async (): Promise<TemplateOption[]> =>
  (await load()).map((t, i) => ({ key: `${t.name}#${i}`, name: t.name, meta: snip(t.description), data: { name: t.name, description: t.description } })).sort(byName);
const traits = labels(async () => (await import("@/lib/data/mmrpg-traits")).MMRPG_TRAITS);
const tags = labels(async () => (await import("@/lib/data/mmrpg-tags")).MMRPG_TAGS);

/** "Restrictions: Carried, Flashy; Note: …" → restriction picks + the rest as special text. */
export function splitIconicSpecial(special: string): { restrictions: string[]; special: string } {
  const m = /^\s*Restrictions?:\s*([^;]*)(?:;\s*([\s\S]*))?$/i.exec(special);
  if (!m) return { restrictions: [], special: special.trim() };
  const restrictions = m[1].split(",").map((x) => x.trim()).filter((x) => x && x.length > 1); // drops the stray "W" marks
  return { restrictions, special: (m[2] ?? "").replace(/^Note:\s*/i, "").trim() };
}

async function iconic(): Promise<TemplateOption[]> {
  const { MMRPG_EQUIPMENT } = await import("@/lib/data/mmrpg-equipment");
  const order = ["Weapon", "Item", "Armor"];
  return (MMRPG_EQUIPMENT as unknown as Data[])
    .filter((e) => e.tier === "Iconic")
    .map((e, i): TemplateOption => {
      const type = order.includes(s(e.type)) ? s(e.type) : "Item";
      const sp = splitIconicSpecial(s(e.special));
      const owner = s(e.owner) === "—" ? "" : s(e.owner);
      const data: Data = {
        name: s(e.name), type, owner, origin: s(e.grantsOrigin), grantsPowers: s(e.grantsPowers),
        restrictions: sp.restrictions, special: sp.special,
      };
      if (typeof e.powerValue === "number") { data.pvAuto = false; data.powerValue = e.powerValue; }
      if (type === "Weapon") {
        data.range = s(e.range);
        data.ability = s(e.ability) || "melee";
        if (Array.isArray(e.multAbilities)) data.multAbilities = e.multAbilities;
        const dmg = s(e.damageBonus);
        data.damageBonus = dmg === "—" ? "" : dmg;
        if (sp.restrictions.some((r) => /does no actual damage/i.test(r))) data.noDamage = true;
      }
      return {
        key: `${s(e.name)}#${i}`,
        name: s(e.name),
        group: type === "Armor" ? "Armor" : `${type}s`,
        meta: [owner, typeof e.powerValue === "number" ? `PV ${e.powerValue}` : "", type === "Weapon" && s(e.damageBonus) && s(e.damageBonus) !== "—" ? `Dmg ${s(e.damageBonus)}` : "", s(e.grantsPowers) ? snip(s(e.grantsPowers), 60) : ""].filter(Boolean).join(" · "),
        data,
      };
    })
    .sort((a, b) => order.indexOf(s(a.data.type)) - order.indexOf(s(b.data.type)) || byName(a, b));
}

type Profile = { name: string; teamRank: number | string; blurb?: string; notes?: string; traits: { name: string; n?: number }[]; tags: { name: string; note?: string }[] };
const profileOpt = (p: Profile, i: number): TemplateOption => ({
  key: `${p.name}#${i}`,
  name: p.name,
  meta: `Rank ${p.teamRank} · ${p.traits.reduce((n, t) => n + (t.n || 1), 0)} traits · ${p.tags.length} tags`,
  data: {
    name: p.name, teamRank: p.teamRank, traits: p.traits.map((t) => ({ name: t.name, n: t.n || 1 })),
    tags: p.tags.map((t) => (t.note ? { name: t.name, note: t.note } : { name: t.name })),
    notes: [p.blurb, p.notes].filter(Boolean).join("\n\n"),
  },
});
const hqs = async () => ((await import("@/lib/data/mmrpg-hq-profiles")).MMRPG_HQ_PROFILES as unknown as Profile[]).map(profileOpt).sort(byName);
const ships = async () => ((await import("@/lib/data/mmrpg-starship-profiles")).MMRPG_STARSHIP_PROFILES as unknown as Profile[]).map(profileOpt).sort(byName);

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = {
  "mmrpg-power": powers, "mmrpg-trait": traits, "mmrpg-tag": tags, "mmrpg-iconic": iconic, "mmrpg-hq": hqs, "mmrpg-starship": ships,
};

/** The book's entries for a Marvel homebrew kind, lazily loaded (see header). */
export function mmrpgTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
