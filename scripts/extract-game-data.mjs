// Generates lib/data/{monsters,spells}.ts from the tool templates.
//
// The bestiary and spell list already exist as plain JS arrays inside the tool
// HTML (SD_MONSTERS in the GM screen, SD_SPELLS in the Shadowdark character
// sheet). Rather than keep a second hand-maintained copy — which would drift
// the first time someone edits a stat block — this reads those arrays and
// writes typed TS modules the app can import directly.
//
// Runs on prebuild; the generated files are committed so `next dev` works
// without a build step. Re-run by hand after editing a template:
//   node scripts/extract-game-data.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATES = join(ROOT, "tools", "templates");
const OUT_DIR = join(ROOT, "lib", "data");

// Pull `const NAME = [ ... ];` out of a template and evaluate just that literal.
// The templates are our own source, and only the array expression is evaluated
// — never the surrounding page script.
function extractArray(html, name, sourceLabel) {
  const decl = `const ${name} = [`;
  const start = html.indexOf(decl);
  if (start === -1) throw new Error(`${name} not found in ${sourceLabel}`);

  const open = start + decl.length - 1; // at '['
  const end = html.indexOf("\n];", open);
  if (end === -1) throw new Error(`${name} in ${sourceLabel} is not terminated by "\\n];"`);

  const literal = html.slice(open, end + 2);
  const value = runInNewContext(literal, Object.create(null), { timeout: 5000 });
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${name} in ${sourceLabel} did not evaluate to a non-empty array`);
  }
  return value;
}

// Same idea as extractArray, but for a `const NAME = { ... };` object literal
// (SHOP_MAGIC groups its items by kind). Wrapped in parens so the braces are
// parsed as an object expression rather than a block.
function extractObject(html, name, sourceLabel) {
  const decl = `const ${name} = {`;
  const start = html.indexOf(decl);
  if (start === -1) throw new Error(`${name} not found in ${sourceLabel}`);

  const open = start + decl.length - 1; // at '{'
  const end = html.indexOf("\n};", open);
  if (end === -1) throw new Error(`${name} in ${sourceLabel} is not terminated by "\\n};"`);

  const literal = html.slice(open, end + 2); // includes closing '}'
  const value = runInNewContext(`(${literal})`, Object.create(null), { timeout: 5000 });
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${name} in ${sourceLabel} did not evaluate to an object`);
  }
  return value;
}

// Variant of extractArray for a single-line declaration (`const NAME = [...];`),
// which the multi-line terminator above wouldn't match.
function extractInlineArray(html, name, sourceLabel) {
  const re = new RegExp(`const ${name} = (\\[[^\\n]*?\\]);`);
  const m = html.match(re);
  if (!m) throw new Error(`${name} not found (inline) in ${sourceLabel}`);
  const value = runInNewContext(m[1], Object.create(null), { timeout: 5000 });
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${name} in ${sourceLabel} did not evaluate to a non-empty array`);
  }
  return value;
}

// Shop rows carry price as one of gp / sp / cp. Collapse to a display string.
function costOf(row) {
  if (!row) return "";
  if (row.gp != null) return `${row.gp} gp`;
  if (row.sp != null) return `${row.sp} sp`;
  if (row.cp != null) return `${row.cp} cp`;
  return "";
}

function emit(file, banner, typeName, typeBody, constName, rows) {
  const body = `// GENERATED FILE — do not edit by hand.
// ${banner}
// Regenerate with: node scripts/extract-game-data.mjs

export type ${typeName} = ${typeBody};

export const ${constName}: ${typeName}[] = ${JSON.stringify(rows, null, 2)};
`;
  writeFileSync(join(OUT_DIR, file), body, "utf8");
  return rows.length;
}

const gmScreen = readFileSync(join(TEMPLATES, "gm_screen.html"), "utf8");
const sdSheet = readFileSync(join(TEMPLATES, "sd_character_sheet.html"), "utf8");
// The bestiary's canonical source: a static file both the GM Screen and the
// session-prep builder load via <script src="/tools-data/sd-monsters.js">
// (they used to each carry an inline copy, mirrored by this script).
const monstersJs = readFileSync(join(ROOT, "public", "tools-data", "sd-monsters.js"), "utf8");

const monsters = extractArray(monstersJs, "SD_MONSTERS", "public/tools-data/sd-monsters.js");
const spells = extractArray(sdSheet, "SD_SPELLS", "sd_character_sheet.html");

mkdirSync(OUT_DIR, { recursive: true });

const monsterCount = emit(
  "monsters.ts",
  "Source: tools/templates/gm_screen.html (SD_MONSTERS)",
  "Monster",
  `{
  name: string;
  ac: string;
  hp: string;
  atk: string;
  mv: string;
  lv: string;
  al: string;
  s: string;
  d: string;
  c: string;
  i: string;
  w: string;
  ch: string;
  notes: string;
}`,
  "MONSTERS",
  monsters.map((m) => ({
    name: String(m.name ?? ""),
    ac: String(m.ac ?? ""),
    hp: String(m.hp ?? ""),
    atk: String(m.atk ?? ""),
    mv: String(m.mv ?? ""),
    lv: String(m.lv ?? ""),
    al: String(m.al ?? ""),
    s: String(m.s ?? ""),
    d: String(m.d ?? ""),
    c: String(m.c ?? ""),
    i: String(m.i ?? ""),
    w: String(m.w ?? ""),
    ch: String(m.ch ?? ""),
    notes: String(m.notes ?? ""),
  })),
);

const spellCount = emit(
  "spells.ts",
  "Source: tools/templates/sd_character_sheet.html (SD_SPELLS)",
  "Spell",
  `{
  name: string;
  tier: string;
  caster: string;
  range: string;
  duration: string;
  damage: string;
  heal?: string;
  desc: string;
}`,
  "SPELLS",
  spells.map((s) => {
    const row = {
      name: String(s.name ?? ""),
      tier: String(s.tier ?? ""),
      caster: String(s.caster ?? ""),
      range: String(s.range ?? ""),
      duration: String(s.duration ?? ""),
      damage: String(s.damage ?? ""),
      desc: String(s.desc ?? ""),
    };
    if (s.heal) row.heal = String(s.heal);
    return row;
  }),
);

// ── Creature types ──────────────────────────────────────────────────────────
// The name→type mapping is editorial and lives beside SD_MONSTERS in the GM
// screen, so there's a single copy: the GM screen's Type filter reads it
// directly, and the /bestiary filter reads this generated module.
const monsterTypeList = extractArray(gmScreen, "SD_MONSTER_TYPE_LIST", "gm_screen.html");
const monsterTypeMap = extractObject(gmScreen, "SD_MONSTER_TYPES", "gm_screen.html");

{
  const known = new Set(monsterTypeList);
  const bad = Object.entries(monsterTypeMap).filter(([, t]) => !known.has(t));
  if (bad.length) {
    throw new Error(`SD_MONSTER_TYPES uses types missing from SD_MONSTER_TYPE_LIST: ${bad
      .slice(0, 5)
      .map(([n, t]) => `${n}=${t}`)
      .join(", ")}`);
  }
  const missing = monsters.map((m) => String(m.name ?? "")).filter((n) => !monsterTypeMap[n]);
  if (missing.length) {
    console.warn(
      `extract-game-data: ${missing.length} monster(s) have no creature type and will fall back to "Monster": ${missing
        .slice(0, 5)
        .join(", ")}`,
    );
  }
}

const monsterTypesBody = `// GENERATED FILE — do not edit by hand.
// Source: tools/templates/gm_screen.html (SD_MONSTER_TYPE_LIST, SD_MONSTER_TYPES)
// Regenerate with: node scripts/extract-game-data.mjs
//
// Shadowdark stat blocks carry no creature type; this mapping is a curated
// editorial call. Edit it in the GM screen, next to SD_MONSTERS, and re-run the
// generator — both the GM screen's Type filter and /bestiary read from there.

export const MONSTER_TYPES = ${JSON.stringify(monsterTypeList, null, 2)} as const;

export type MonsterType = (typeof MONSTER_TYPES)[number];

export const MONSTER_TYPE_BY_NAME: Record<string, MonsterType> = ${JSON.stringify(
  monsterTypeMap,
  null,
  2,
)};

// Anything not classified above still shows up in the list and in search — it
// just falls into the catch-all rather than vanishing.
export function typeOf(name: string): MonsterType {
  return MONSTER_TYPE_BY_NAME[name] ?? "Monster";
}
`;
writeFileSync(join(OUT_DIR, "monster-types.ts"), monsterTypesBody, "utf8");
const monsterTypeCount = Object.keys(monsterTypeMap).length;

// ── Gear ────────────────────────────────────────────────────────────────────
// One flat catalog with a `category` field (basic / weapon / armor / magic) so
// the Gear page can filter on it. Weapons keep their full stats from SD_WEAPONS
// and pick up a price from the shop list; magic items are flattened out of the
// SHOP_MAGIC groups, keeping the group name as `magicType`.
const sdWeapons = extractArray(sdSheet, "SD_WEAPONS", "sd_character_sheet.html");
const shopWeapons = extractArray(sdSheet, "SHOP_WEAPONS", "sd_character_sheet.html");
const shopArmor = extractArray(sdSheet, "SHOP_ARMOR", "sd_character_sheet.html");
const shopBasic = extractArray(sdSheet, "SHOP_BASIC", "sd_character_sheet.html");
const shopMagic = extractObject(sdSheet, "SHOP_MAGIC", "sd_character_sheet.html");
// The sheet's own list of book ammo, so the Gear page's Ammo filter stays in
// step with what a weapon can actually spend.
const bookAmmo = extractInlineArray(sdSheet, "BOOK_AMMO", "sd_character_sheet.html");
const ammoNames = new Set(bookAmmo.map((n) => String(n).toLowerCase()));

const weaponPrice = new Map(shopWeapons.map((w) => [w.name, w]));
const gear = [];

for (const b of shopBasic) {
  const name = String(b.name ?? "");
  const row = {
    name,
    category: ammoNames.has(name.toLowerCase()) ? "ammo" : "basic",
    cost: costOf(b),
    desc: String(b.note ?? ""),
  };
  if (b.qty != null) row.qty = String(b.qty);
  gear.push(row);
}

for (const w of sdWeapons) {
  gear.push({
    name: String(w.name ?? ""),
    category: "weapon",
    cost: costOf(weaponPrice.get(w.name)),
    weaponType: String(w.type ?? ""),
    range: String(w.range ?? ""),
    damage: String(w.damage ?? ""),
    props: String(w.props ?? ""),
    desc: "",
  });
}

for (const a of shopArmor) {
  gear.push({ name: String(a.name ?? ""), category: "armor", cost: costOf(a), desc: String(a.note ?? "") });
}

for (const [group, items] of Object.entries(shopMagic)) {
  for (const m of items) {
    gear.push({
      name: String(m.name ?? ""),
      category: "magic",
      cost: "",
      magicType: String(group),
      desc: String(m.full ?? m.note ?? ""),
    });
  }
}

const gearCount = emit(
  "gear.ts",
  "Source: tools/templates/sd_character_sheet.html (SD_WEAPONS, SHOP_WEAPONS, SHOP_ARMOR, SHOP_BASIC, SHOP_MAGIC)",
  "GearItem",
  `{
  name: string;
  category: "basic" | "weapon" | "armor" | "magic" | "ammo";
  cost: string;
  qty?: string;
  weaponType?: string;
  range?: string;
  damage?: string;
  props?: string;
  magicType?: string;
  desc: string;
}`,
  "GEAR",
  gear,
);

// ── Classes / Ancestries / Backgrounds (Shadowdark character creation) ───────
// The creation wizard's book data. Classes must be evaluated as one contiguous
// scope because RC_CLASS_INFO's Ranger features spread SD_REMEDIES/remedyLine,
// so run the whole block and read the pieces back out. The sheet stays the
// single source of truth; these files are generated from it (never hand-edited).
function extractClassScope(html, sourceLabel) {
  const start = html.indexOf("const RC_CLASSES = [");
  if (start === -1) throw new Error(`RC_CLASSES not found in ${sourceLabel}`);
  const tStart = html.indexOf("const RC_TITLES = {", start);
  if (tStart === -1) throw new Error(`RC_TITLES not found in ${sourceLabel}`);
  const end = html.indexOf("\n};", tStart);
  if (end === -1) throw new Error(`RC_TITLES in ${sourceLabel} is not terminated by "\\n};"`);
  const block = html.slice(start, end + 3);
  return runInNewContext(
    `${block}\n;({ RC_CLASSES, RC_CLASS_INFO, RC_TITLES });`,
    Object.create(null),
    { timeout: 5000 },
  );
}

const cls = extractClassScope(sdSheet, "sd_character_sheet.html");
// Optional (non-core) content lists. Empty arrays are allowed here.
function optSet(name) {
  try { return new Set(extractArray(sdSheet, name, "sd_character_sheet.html").map(String)); }
  catch { return new Set(); }
}
const optClasses = optSet("RC_OPTIONAL_CLASSES");
const optAncestries = optSet("RC_OPTIONAL_ANCESTRIES");
const optBackgrounds = optSet("RC_OPTIONAL_BACKGROUNDS");
const classRows = cls.RC_CLASSES.map((name) => {
  const info = cls.RC_CLASS_INFO[name] || {};
  const titles = cls.RC_TITLES[name] || null;
  const features = Array.isArray(info.features) ? info.features.map(String) : [];
  return {
    name,
    hd: String(info.hd ?? ""),
    weapons: String(info.weapons ?? ""),
    armor: String(info.armor ?? ""),
    talent: Array.isArray(info.talent) ? info.talent.map(String) : [],
    talentBands: Array.isArray(info.talentBands) ? info.talentBands : null,
    features,
    // Mirror the character sheet's _ccwIsCaster: a class casts if a feature
    // mentions Spellcasting, if it carries a _caster config (homebrew-style
    // casters like Knight of St. Ydris / Seer / Necromancer), or if it's the
    // Bard, who uses scrolls and wands via Magical Dabbler.
    caster: features.some((f) => /Spellcasting/i.test(f)) || !!info._caster || name === "Bard",
    optional: optClasses.has(name),
    titles: titles
      ? {
          Lawful: (titles.Lawful || []).map(String),
          Chaotic: (titles.Chaotic || []).map(String),
          Neutral: (titles.Neutral || []).map(String),
        }
      : null,
  };
});
const classCount = emit(
  "classes.ts",
  "Source: tools/templates/sd_character_sheet.html (RC_CLASSES, RC_CLASS_INFO, RC_TITLES)",
  "SdClass",
  `{
  name: string;
  hd: string;
  weapons: string;
  armor: string;
  talent: string[];
  talentBands: [number, number][] | null;
  features: string[];
  caster: boolean;
  optional: boolean;
  titles: { Lawful: string[]; Chaotic: string[]; Neutral: string[] } | null;
}`,
  "SD_CLASSES",
  classRows,
);

const anc = extractObject(sdSheet, "RC_ANCESTRY", "sd_character_sheet.html");
const ancestryRows = (anc.table || []).map((t) => ({
  name: String(t.v),
  trait: String((anc.ability || {})[t.v] ?? ""),
  languages: String((anc.languages || {})[t.v] ?? ""),
  optional: optAncestries.has(String(t.v)),
}));
const ancestryCount = emit(
  "ancestries.ts",
  "Source: tools/templates/sd_character_sheet.html (RC_ANCESTRY)",
  "SdAncestry",
  `{ name: string; trait: string; languages: string; optional: boolean }`,
  "SD_ANCESTRIES",
  ancestryRows,
);

const bgDesc = extractObject(sdSheet, "CCW_BG_DESC", "sd_character_sheet.html");
const backgroundRows = extractArray(sdSheet, "RC_BACKGROUNDS", "sd_character_sheet.html").map(
  (name) => ({ name: String(name), desc: String(bgDesc[String(name)] || ""), optional: optBackgrounds.has(String(name)) }),
);
const backgroundCount = emit(
  "backgrounds.ts",
  "Source: tools/templates/sd_character_sheet.html (RC_BACKGROUNDS + CCW_BG_DESC)",
  "SdBackground",
  `{ name: string; desc: string; optional: boolean }`,
  "SD_BACKGROUNDS",
  backgroundRows,
);

// ── Sheet mirror: HB_TALENT_LABEL ───────────────────────────────────────────
// The character sheet can't import TypeScript, so it keeps a JS mirror of the
// effect-label map (HB_TALENT_LABEL, read by _hbEffOne's fallback branch). Keep
// it from drifting by regenerating it here from lib/effects.ts's TALENT_TARGETS
// — the single source of truth — and rewriting the block in the template.
function syncSheetLabelMap() {
  const effSrc = readFileSync(join(ROOT, "lib", "effects.ts"), "utf8");
  // Pull the TALENT_TARGETS array literal out of the TS source and evaluate it.
  const decl = "export const TALENT_TARGETS: [string, string][] = [";
  const start = effSrc.indexOf(decl);
  if (start === -1) throw new Error("TALENT_TARGETS not found in lib/effects.ts");
  const open = start + decl.length - 1; // at '['
  const end = effSrc.indexOf("\n];", open);
  if (end === -1) throw new Error("TALENT_TARGETS in lib/effects.ts not terminated by '\\n];'");
  const pairs = runInNewContext(effSrc.slice(open, end + 2), Object.create(null), { timeout: 5000 });

  const entries = pairs.map(([k, v]) => `${k}:${JSON.stringify(v)}`).join(", ");
  const generated =
    "const HB_TALENT_LABEL = {\n" +
    "  // GENERATED from lib/effects.ts (TALENT_TARGETS) by scripts/extract-game-data.mjs.\n" +
    "  // Edit lib/effects.ts, then re-run the extract — do not hand-edit this block.\n" +
    `  ${entries}\n` +
    "};";

  const sheetPath = join(TEMPLATES, "sd_character_sheet.html");
  let sheet = readFileSync(sheetPath, "utf8");
  const re = /const HB_TALENT_LABEL = \{[\s\S]*?\n\};/;
  if (!re.test(sheet)) throw new Error("HB_TALENT_LABEL block not found in sd_character_sheet.html");
  const next = sheet.replace(re, generated);
  if (next !== sheet) writeFileSync(sheetPath, next, "utf8");
  return pairs.length;
}
const labelCount = syncSheetLabelMap();

// (The old SD_MONSTERS template-mirror step is gone: both the GM Screen and
// the session-prep builder now load the bestiary from the same static file,
// public/tools-data/sd-monsters.js, so there is nothing to copy.)

console.log(
  `extract-game-data: ${monsterCount} monsters (${monsterTypeCount} typed), ${spellCount} spells, ${gearCount} gear, ${classCount} classes, ${ancestryCount} ancestries, ${backgroundCount} backgrounds, ${labelCount} effect labels → lib/data/ + mirrors (sheet labels)`,
);
