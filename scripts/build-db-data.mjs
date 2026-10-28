#!/usr/bin/env node
// Build the Dragonbane data.
//   data/db/parts/*.mjs  →  lib/data/db-data.ts          (typed, for Next pages)
//                        →  public/tools-data/db-data.js (window.DB_* globals, for
//                           the character sheet, session builder and GM Screen)
// Run: node scripts/build-db-data.mjs   (npm run data:db)
//
// Adds a stable `id` (slug of the name) to every record that lacks one, and checks
// that every profession kit item resolves to a gear/weapon/armor record.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const part = (n) => import(pathToFileURL(join(ROOT, "data", "db", "parts", n + ".mjs")).href);

const mods = await Promise.all(["core", "professions", "abilities", "magic", "gear", "bestiary", "tables", "bestiary-book", "magic-book"].map(part));
const all = Object.assign({}, ...mods);

const slug = (s) => String(s).toLowerCase().replace(/&/g, "and").replace(/['’()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ── Expansions: the Bestiary and the Book of Magic ─────────────────────────────
// Every record carries `source` ("core" | "bestiary" | "magic"). An expansion record
// with the same name as a core one replaces it (the newer printing), keeping the core
// id so saved sheets and sessions still resolve; the core page is kept as corePage.
const tag = (arr, s) => arr.map((r) => ({ ...r, source: r.source || s }));
const replaceByName = (core, exp, alias = {}) => {
  const out = core.map((c) => {
    const e = exp.find((x) => x.name === c.name || alias[x.name] === c.name);
    return e ? { ...e, id: c.id || slug(c.name), corePage: c.page } : c;
  }).map((r) => { if (r.id === undefined) delete r.id; return r; });
  const used = new Set(out.map((r) => r.name));
  return [...out, ...exp.filter((x) => !used.has(x.name) && !alias[x.name])];
};
const stripSuffix = (r) => (r.id && /-bestiary$/.test(r.id) ? (({ id, ...rest }) => rest)(r) : r);
// Core monsters get the Bestiary chapter they belong to, so lists can group by it.
const CORE_CATEGORY = { Demon: "Demons", Dragon: "Dragons", Ghost: "Undead", Giant: "Giants", "Giant Spider": "Beasts", Griffon: "Beasts",
  Harpy: "Rare Kin", Manticore: "Beasts", Minotaur: "Rare Kin", Troll: "Trolls", Wight: "Undead", "Vampiric Bats": "Beasts" };
const coreMon = all.DB_MONSTERS.map((m) => ({ ...m, source: "core", category: CORE_CATEGORY[m.name] || "Monsters" }));
all.DB_MONSTERS = replaceByName(coreMon, all.DB_MONSTERS_EXPANSION.map(stripSuffix), { "Adult Dragon": "Dragon" });
all.DB_NPCS = replaceByName(tag(all.DB_NPCS, "core"), all.DB_NPCS_EXPANSION.map(stripSuffix));
Object.assign(all.DB_NPC_TRAITS, all.DB_NPC_TRAITS_EXTRA);
// Kin: the Bestiary's D20 table covers the core six and its nine new kin.
const k20 = Object.fromEntries(all.DB_KIN_TABLE20.map((r) => [r.kin, r.roll]));
all.DB_KIN = [...tag(all.DB_KIN, "core"), ...all.DB_KIN_EXPANSION].map((k) => ({ ...k, roll20: k.roll20 || k20[k.name] }));
for (const k of all.DB_KIN) if (!k.roll20) throw new Error(`Kin ${k.name} missing from the D20 kin table`);
all.DB_TABLES.kinDie20 = "D20";
// Spells and tricks: revised ones replace the core version.
const S = (o) => ({ powerLevels: true, dodge: false, parry: false, ...o });
all.DB_SPELLS = replaceByName(tag(all.DB_SPELLS, "core"), all.DB_SPELLS_EXPANSION.map(S));
all.DB_MAGIC_TRICKS = replaceByName(tag(all.DB_MAGIC_TRICKS, "core"), all.DB_MAGIC_TRICKS_EXPANSION);
// Alchemy recipes are learned and prepared like spells, so they join DB_SPELLS (school
// "Alchemy", recipe: true). Brewing takes a shift and an Alchemy roll; the power level
// sets the number of doses (and +3 poison potency per level above 1 for poisons).
for (const r of all.DB_ALCHEMY.recipes) {
  if (all.DB_SPELLS.some((s) => s.name === r.name)) throw new Error(`recipe ${r.name} clashes with a spell`);
  all.DB_SPELLS.push(S({ name: r.name, school: "Alchemy", rank: r.rank, prerequisite: r.prerequisite || "Alchemy", requirements: ["ingredient"],
    requirementDetail: (r.ingredients || []).join(", "), castingTime: "shift", range: "—", duration: r.duration || "Until used", page: r.page,
    text: r.effect, recipe: true, ingredients: r.ingredients || [], product: r.coreGear || r.name, source: "magic",
    ...(r.potency ? { potency: r.potency } : {}) }));
}
// Schools: each school record (bar General Magic) is a secondary skill. Harmonism has no
// skill of its own — it is cast with Performance (rollsWith).
const schools = all.DB_MAGIC_SCHOOLS.filter((s) => s.name !== "General Magic");
for (const sc of schools) {
  if (all.DB_SKILLS.some((k) => k.name === sc.name)) continue;
  const rolls = sc.skill && sc.skill !== sc.name ? sc.skill : null;
  all.DB_SKILLS.push({ id: slug(sc.name), name: sc.name, attribute: rolls ? "CHA" : sc.attribute || "INT", type: "secondary", school: true, page: sc.page,
    ...(rolls ? { rollsWith: rolls } : {}), source: "magic",
    text: (rolls ? `Not a skill of its own: Harmonism spells are cast with ${rolls}. ` : "") + sc.summary });
}
all.DB_MAGIC_RULES.schools = schools.map((s) => s.name);
all.DB_MAGIC_RULES.creationSchools = Object.fromEntries(["Mage", "Bard"].map((p) => [p, schools.filter((s) => s.creation && (s.professions || []).includes(p)).map((s) => s.name)]));
const mage = all.DB_PROFESSIONS.find((p) => p.mage);
for (const sc of schools) if (sc.creation && (sc.professions || []).includes("Mage") && sc.startingSkills?.length) mage.schoolSkills[sc.name] = sc.startingSkills;
// Gear from the Book of Magic: laboratories, alchemy ingredients and substances, the whip.
all.DB_GEAR = [...tag(all.DB_GEAR, "core"), ...all.DB_GEAR_EXPANSION];
all.DB_WEAPONS = [...tag(all.DB_WEAPONS, "core"), ...all.DB_WEAPONS_EXPANSION];
for (const k of ["DB_ARMOR", "DB_HELMETS", "DB_HEROIC_ABILITIES", "DB_PROFESSIONS", "DB_SUMMONS", "DB_ANIMALS"]) all[k] = tag(all[k], "core");
all.DB_SKILLS = tag(all.DB_SKILLS, "core");
for (const k of ["DB_KIN_EXPANSION", "DB_MONSTERS_EXPANSION", "DB_NPCS_EXPANSION", "DB_NPC_TRAITS_EXTRA", "DB_SPELLS_EXPANSION", "DB_MAGIC_TRICKS_EXPANSION", "DB_GEAR_EXPANSION", "DB_WEAPONS_EXPANSION"]) delete all[k];

const ID_LISTS = ["DB_SKILLS", "DB_KIN", "DB_PROFESSIONS", "DB_HEROIC_ABILITIES", "DB_SPELLS", "DB_MAGIC_TRICKS", "DB_SUMMONS",
  "DB_ARMOR", "DB_HELMETS", "DB_WEAPONS", "DB_GEAR", "DB_MONSTERS", "DB_NPCS", "DB_ANIMALS"];
for (const k of ID_LISTS) {
  const seen = new Set();
  all[k] = all[k].map((r) => {
    const id = r.id || slug(r.name);
    if (seen.has(id)) throw new Error(`${k}: duplicate id ${id}`);
    seen.add(id);
    return { id, ...r };
  });
}
for (const k of all.DB_KIN) k.abilities = k.abilities.map((a) => ({ id: a.id || slug(a.name), ...a }));

// Kit items must resolve.
const itemNames = new Set([...all.DB_WEAPONS, ...all.DB_ARMOR, ...all.DB_HELMETS, ...all.DB_GEAR].map((r) => r.name));
const missing = [];
for (const p of all.DB_PROFESSIONS) for (const kit of p.kits) for (const it of kit.items)
  for (const n of it.choice || [it.name]) if (!itemNames.has(n)) missing.push(`${p.name}: ${n}`);
if (missing.length) throw new Error("Unresolved kit items: " + missing.join("; "));
// Heroic abilities named by professions must exist.
const abilityNames = new Set(all.DB_HEROIC_ABILITIES.map((a) => a.name));
for (const p of all.DB_PROFESSIONS) for (const a of p.heroicAbilities) if (!abilityNames.has(a)) throw new Error(`${p.name}: unknown heroic ability ${a}`);
// Spell prerequisites naming spells must exist.
const spellNames = new Set(all.DB_SPELLS.map((s) => s.name.toUpperCase()));
const schoolRe = new RegExp(`school|^any |skill level|^(${all.DB_MAGIC_RULES.schools.join("|")})$`, "i");
for (const s of all.DB_SPELLS) for (const pre of s.prerequisite.split(/ and | or |, /).map((x) => x.trim()))
  if (!schoolRe.test(pre) && !spellNames.has(pre.toUpperCase())) throw new Error(`${s.name}: unknown prerequisite ${pre}`);
const schoolNames = new Set(["General", ...all.DB_MAGIC_RULES.schools]);
for (const s of [...all.DB_SPELLS, ...all.DB_MAGIC_TRICKS]) if (!schoolNames.has(s.school)) throw new Error(`${s.name}: unknown school ${s.school}`);
const gearNames = new Set();
for (const g of [...all.DB_WEAPONS, ...all.DB_ARMOR, ...all.DB_HELMETS, ...all.DB_GEAR]) { if (gearNames.has(g.name)) throw new Error(`duplicate item name ${g.name}`); gearNames.add(g.name); }

const TYPES = {
  DB_ATTRIBUTES: "DbAttribute[]", DB_CONDITIONS: "DbCondition[]", DB_SKILLS: "DbSkill[]", DB_KIN: "DbKin[]",
  DB_PROFESSIONS: "DbProfession[]", DB_HEROIC_ABILITIES: "DbHeroicAbility[]", DB_SPELLS: "DbSpell[]", DB_MAGIC_TRICKS: "DbMagicTrick[]",
  DB_SUMMONS: "DbSummon[]", DB_ARMOR: "DbArmor[]", DB_HELMETS: "DbArmor[]", DB_WEAPONS: "DbWeapon[]", DB_GEAR: "DbGear[]",
  DB_MONSTERS: "DbMonster[]", DB_NPCS: "DbNpc[]", DB_ANIMALS: "DbAnimal[]", DB_WEAKNESSES: "DbRollEntry[]",
  DB_MEMENTOS: "DbRollEntry[]", DB_APPEARANCES: "DbRollEntry[]", DB_GM_TABLES: "Record<string, DbTable>",
  DB_MAGIC_SCHOOLS: "DbMagicSchool[]", DB_KIN_TABLE20: "DbKinTableRow[]", DB_KIN_LORE: "DbKinLore[]", DB_BESTIARY_CHAPTERS: "DbBestiaryChapter[]",
};

const header = "// GENERATED FILE - do not edit by hand.\n// Source: data/db/parts/*.mjs - regenerate with: node scripts/build-db-data.mjs\n// Dragonbane (Free League Publishing). Mechanics and table values are game facts;\n// descriptive text is original paraphrase written for this app.\n";
const names = Object.keys(all).filter((k) => k.startsWith("DB_")).sort();
const typeNames = [...new Set(Object.values(TYPES).map((t) => t.replace("[]", "").replace(/^Record<string, (\w+)>$/, "$1")))].sort();

let ts = header + `import type { ${typeNames.join(", ")} } from "./db-types";\n\n`;
let js = header + "(function(){\n";
for (const k of names) {
  const json = JSON.stringify(all[k], null, 1);
  ts += `export const ${k}${TYPES[k] ? ": " + TYPES[k] : ""} = ${json};\n\n`;
  js += `var ${k} = ${json};\nwindow.${k} = ${k};\n`;
}
js += "})();\n";

writeFileSync(join(ROOT, "lib", "data", "db-data.ts"), ts);
writeFileSync(join(ROOT, "public", "tools-data", "db-data.js"), js);
console.log(`db: ${names.length} exports → lib/data/db-data.ts, public/tools-data/db-data.js`);
for (const k of names) if (Array.isArray(all[k])) console.log(`  ${k}: ${all[k].length}`);
