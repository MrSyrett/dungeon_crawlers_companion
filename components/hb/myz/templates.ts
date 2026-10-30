// ─────────────────────────────────────────────────────────────────────────────
// MUTANT: YEAR ZERO template lists for the shared TemplatePicker (components/
// hb/TemplatePicker.tsx). Each loader turns the book's tables (lib/data/
// myz-data.ts, the rows /myz/gear renders) into the STORED homebrew data shape
// (./rules.ts), so a template fills the builder through the same
// weaponFromData / gearFromData path an old record takes.
//
// Scrap weapons / armor / supplies map field by field (slots → weight, the
// comment → desc, obvious features such as Jury-Rigged lifted into chips).
// Artifacts are prose in the book; the parts the builder has fields for are
// read out of it — DEV Req / DEV Bonus, "Gear Bonus +N Shoot, weapon damage
// N, Long range" for the weapon artifacts (listed under weapons), "Gear Bonus
// +2 to Scout and Find the Path" skill badges and an Armor / Protection Rating
// against damage for the rest (listed under gear). The DEV sentences leave the
// description; everything else stays in it. Bullet values come from the Item
// Shop's price list (MYZ_VALUES).
// The book arrays are pulled in with dynamic import() inside each loader.
// ─────────────────────────────────────────────────────────────────────────────
import type { TemplateOption } from "@/components/hb/TemplatePicker";
import { ALL_SKILLS, DEV_AREAS, FEATURES, RANGES, type DevBonus, type DevReq, type SkillBonus } from "./rules";

type Data = Record<string, unknown>;
type Artifact = { roll: string; name: string; desc: string };
const byName = (a: TemplateOption, b: TemplateOption) => a.name.localeCompare(b.name, "en");
const snip = (t: string, n = 80) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const weightOf = (n: number) => (n === 0 ? "0" : n === 0.5 ? "½" : n >= 2 ? "2" : "1");
const featuresIn = (text: string): string[] => {
  const t = text.toLowerCase();
  const hits = new Set<string>();
  if (/jury-rigged/.test(t)) hits.add("Jury-Rigged");
  if (/can't be carried/.test(t)) hits.add("Can't be carried");
  if (/thrown/.test(t)) hits.add("Thrown");
  if (/\bclip\b/.test(t)) hits.add("Clip");
  if (/full auto/.test(t)) hits.add("Full auto");
  if (/silent/.test(t)) hits.add("Silent");
  if (/burns/.test(t)) hits.add("Burns");
  if (/needs electricity|needs a battery/.test(t)) hits.add("Needs electricity");
  return FEATURES.filter((f) => hits.has(f));
};
const ammoIn = (name: string, text: string): string => {
  const t = `${name} ${text}`.toLowerCase();
  if (/booze|gasoline/.test(t) && /flamethrower|dose/.test(t)) return "Booze";
  if (/explosive charge/.test(t)) return "Charge";
  if (/arrow|bow/.test(t)) return "Arrows";
  if (/grenade|jerrycan/.test(t)) return "Single use";
  if (/pistol|rifle|derringer|revolver|shotgun|gun\b/.test(t) && !/flare/.test(t)) return "Bullets";
  return "";
};

// ── Artifact prose → fields ─────────────────────────────────────────────────
const areaOf = (s: string) => DEV_AREAS.find((a) => a.toLowerCase() === s.trim().toLowerCase());
function devOf(desc: string): { devReq?: DevReq; devBonus?: DevBonus[]; rest: string } {
  const out: { devReq?: DevReq; devBonus?: DevBonus[]; rest: string } = { rest: desc };
  const req = /DEV Req:\s*([A-Za-z ]+?)\s+(\d+)\.?/.exec(desc);
  const a = req ? areaOf(req[1]) : undefined;
  if (req && a) out.devReq = { area: a, level: Number(req[2]) };
  const bon = /DEV Bonus:\s*([^.]+)\.?/.exec(desc);
  if (bon) {
    out.devBonus = bon[1].split(",").flatMap((p) => {
      const m = /^\s*([A-Za-z ]+?)\s+(\+(?:\d|D6))\s*$/i.exec(p);
      const ar = m ? areaOf(m[1]) : undefined;
      return m && ar ? [{ area: ar, amount: m[2].toUpperCase() }] : [];
    });
  }
  out.rest = desc.replace(/\s*DEV Req:[^.]*\.?/, "").replace(/\s*DEV Bonus:[^.]*\.?/, "").trim();
  return out;
}
const skillOf = (s: string) => ALL_SKILLS.find((k) => k.toLowerCase() === s.trim().toLowerCase());
/** "Gear Bonus +3 to Scout and Find the Path" / "+2 Manipulate" (skill names only — vehicles' bare bonus is skipped). */
function skillBonusOf(desc: string): SkillBonus[] {
  const out: SkillBonus[] = [];
  const re = /\+(\d)\s+(?:to\s+)?([A-Z][A-Za-z-]*(?:\s+(?:the\s+)?[A-Z][A-Za-z-]*)*(?:\s+and\s+[A-Z][A-Za-z-]*(?:\s+(?:the\s+)?[A-Z][A-Za-z-]*)*)?)/g;
  for (const m of desc.matchAll(re)) {
    for (const part of m[2].split(/\s+and\s+/)) {
      const skill = skillOf(part);
      if (skill && !out.some((b) => b.skill === skill)) out.push({ skill, amount: Number(m[1]) });
    }
  }
  return out;
}
const weightIn = (desc: string) => (/tiny item/i.test(desc) ? "0" : /light item/i.test(desc) ? "½" : /heavy item/i.test(desc) ? "2" : "1");
const isWeaponArtifact = (a: Artifact) => /weapon damage \d/i.test(a.desc);

function artifactWeapon(a: Artifact, value?: number): Data {
  const dev = devOf(a.desc);
  const t = a.desc;
  const dmg = /weapon damage (\d+)/i.exec(t);
  const own = /\+(\d)\s+(Shoot|Fight)\b/.exec(t);
  const gb = own ? Number(own[1]) : Number(/Gear Bonus \+(\d)/i.exec(t)?.[1] ?? 0);
  const rng = RANGES.find((r) => new RegExp(`\\b${r}\\s+range`, "i").test(t));
  const skill = /melee weapon/i.test(t) ? "Fight" : own?.[2] ?? (/via Shoot/.test(t) || rng ? "Shoot" : "Fight");
  const blast = /Blast Power (\d+)/i.exec(t);
  const out: Data = {
    name: a.name, skill, bonus: /no Gear Bonus/i.test(t) ? 0 : gb, damage: dmg ? Number(dmg[1]) : 1,
    range: rng ?? (skill === "Shoot" ? "Short" : "Arm's Length"), weight: weightIn(t), desc: dev.rest,
    artifact: true, devReq: dev.devReq, devBonus: dev.devBonus ?? [],
  };
  if (blast) out.blast = Number(blast[1]);
  const ammo = ammoIn(a.name, t);
  if (ammo) out.ammo = ammo;
  const f = featuresIn(t);
  if (f.length) out.features = f;
  if (value) out.value = value;
  return out;
}

function artifactGear(a: Artifact, value?: number): Data {
  const dev = devOf(a.desc);
  const armor = /(?:Armor|Protection) Rating (\d+) against damage/i.exec(a.desc);
  const out: Data = { name: a.name, weight: weightIn(a.desc), desc: dev.rest, artifact: true, devReq: dev.devReq, devBonus: dev.devBonus ?? [] };
  if (armor) Object.assign(out, { kind: "armor", rating: Number(armor[1]) });
  else Object.assign(out, { kind: "gear", skillBonus: skillBonusOf(a.desc) });
  if (value) out.value = value;
  return out;
}

async function weapons(): Promise<TemplateOption[]> {
  const { MYZ_MELEE_WEAPONS, MYZ_RANGED_WEAPONS, MYZ_ARTIFACTS, MYZ_VALUES } = await import("@/lib/data/myz-data");
  const val = (n: string): number | undefined => (MYZ_VALUES as Record<string, number>)[n];
  const scrap = (skill: "Fight" | "Shoot", group: string) => (w: (typeof MYZ_MELEE_WEAPONS)[number], i: number): TemplateOption => {
    const data: Data = { name: w.name, skill, bonus: w.bonus, damage: w.damage, range: w.range, weight: weightOf(w.slots), desc: w.comment };
    const f = featuresIn(w.comment);
    if (f.length) data.features = f;
    const ammo = skill === "Shoot" ? ammoIn(w.name, w.comment) : "";
    if (ammo) data.ammo = ammo;
    const blast = /Blast Power (\d+)/i.exec(w.comment);
    if (blast) data.blast = Number(blast[1]);
    if (val(w.name)) data.value = val(w.name);
    return { key: `${group}:${w.name}#${i}`, name: w.name, group, meta: `bonus +${w.bonus} · ${w.damage} dmg · ${w.range}${w.comment ? ` · ${snip(w.comment, 50)}` : ""}`, data };
  };
  const arts = MYZ_ARTIFACTS.filter(isWeaponArtifact).map((a, i): TemplateOption => {
    const data = artifactWeapon(a, val(a.name));
    return { key: `art:${a.name}#${i}`, name: a.name, group: "Artifacts", meta: `${data.skill === "Shoot" ? "Ranged" : "Melee"} · bonus +${data.bonus} · ${data.damage} dmg · ${data.range}`, data };
  }).sort(byName);
  return [...MYZ_MELEE_WEAPONS.map(scrap("Fight", "Melee")), ...MYZ_RANGED_WEAPONS.map(scrap("Shoot", "Ranged")), ...arts];
}

async function gear(): Promise<TemplateOption[]> {
  const { MYZ_ARMOR, MYZ_GEAR, MYZ_ARTIFACTS, MYZ_VALUES } = await import("@/lib/data/myz-data");
  const val = (n: string): number | undefined => (MYZ_VALUES as Record<string, number>)[n];
  const armor = MYZ_ARMOR.map((a, i): TemplateOption => {
    const data: Data = { name: a.name, kind: "armor", weight: "1", rating: typeof a.rating === "number" ? a.rating : 3, desc: a.comment };
    if (/\bartifact\b/i.test(a.comment)) data.artifact = true;
    if (val(a.name)) data.value = val(a.name);
    return { key: `armor:${a.name}#${i}`, name: a.name, group: "Armor", meta: `Armor Rating ${a.rating} · ${snip(a.comment, 60)}`, data };
  });
  const supplies = MYZ_GEAR.map((g, i): TemplateOption => {
    const s = g.slots.toLowerCase();
    const weight = /^tiny|^—/.test(s) ? "0" : /^light/.test(s) ? "½" : /^heavy/.test(s) ? "2" : "1";
    const simple = /^(1 regular item|tiny|light|heavy|—)$/.test(s);
    const data: Data = { name: g.name, kind: "gear", weight, skillBonus: [], desc: simple ? g.comment : `${g.comment} Carry: ${g.slots}.` };
    if (val(g.name)) data.value = val(g.name);
    return { key: `gear:${g.name}#${i}`, name: g.name, group: "Supplies", meta: snip(g.comment), data };
  });
  const arts = MYZ_ARTIFACTS.filter((a) => !isWeaponArtifact(a)).map((a, i): TemplateOption => ({
    key: `art:${a.name}#${i}`, name: a.name, group: "Artifacts", meta: snip(devOf(a.desc).rest), data: artifactGear(a, val(a.name)),
  })).sort(byName);
  return [...armor, ...supplies, ...arts];
}

const LOADERS: Record<string, () => Promise<TemplateOption[]>> = { "myz-weapon": weapons, "myz-gear": gear };

/** The book's entries for a MYZ homebrew kind, lazily loaded (see header). */
export function myzTemplates(kind: string): (() => Promise<TemplateOption[]>) | null {
  return LOADERS[kind] ?? null;
}
