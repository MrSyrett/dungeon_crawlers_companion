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

const mods = await Promise.all(["core", "professions", "abilities", "magic", "gear", "bestiary", "tables"].map(part));
const all = Object.assign({}, ...mods);

const slug = (s) => String(s).toLowerCase().replace(/&/g, "and").replace(/['’()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
for (const s of all.DB_SPELLS) for (const pre of s.prerequisite.split(/ and | or /))
  if (!/school|^animism$|^elementalism$|^mentalism$/i.test(pre) && !spellNames.has(pre.toUpperCase())) throw new Error(`${s.name}: unknown prerequisite ${pre}`);

const TYPES = {
  DB_ATTRIBUTES: "DbAttribute[]", DB_CONDITIONS: "DbCondition[]", DB_SKILLS: "DbSkill[]", DB_KIN: "DbKin[]",
  DB_PROFESSIONS: "DbProfession[]", DB_HEROIC_ABILITIES: "DbHeroicAbility[]", DB_SPELLS: "DbSpell[]", DB_MAGIC_TRICKS: "DbMagicTrick[]",
  DB_SUMMONS: "DbSummon[]", DB_ARMOR: "DbArmor[]", DB_HELMETS: "DbArmor[]", DB_WEAPONS: "DbWeapon[]", DB_GEAR: "DbGear[]",
  DB_MONSTERS: "DbMonster[]", DB_NPCS: "DbNpc[]", DB_ANIMALS: "DbAnimal[]", DB_WEAKNESSES: "DbRollEntry[]",
  DB_MEMENTOS: "DbRollEntry[]", DB_APPEARANCES: "DbRollEntry[]", DB_GM_TABLES: "Record<string, DbTable>",
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
