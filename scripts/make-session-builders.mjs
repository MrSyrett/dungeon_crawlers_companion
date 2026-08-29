// Generates the ACE!, Kids on Bikes, Nimble and Star Wars Session Prep Builders from the
// Dungeon Crawler Carl builder, which is system-neutral apart from its theme
// (palette, "Floor"/"Mob" labels, storage keys). Re-run after changing the DCC
// builder so the clones pick up fixes:
//   node scripts/make-session-builders.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "tools", "templates", "dcc_session_prep_builder.html");
const base = readFileSync(SRC, "utf8");

const SYSTEMS = [
  {
    file: "ace_session_prep_builder.html", key: "ace_session", ls: "ace_builder_v1",
    name: "ACE!", title: "Session Prep Builder — ACE! (Awfully Cheerful Engine)",
    accent: "#2b93c9", accentDark: "#1d6f9a", red: "#c0251e", redDark: "#8a1f14", highlight: "#f4d84a", boxBg: "#d6e9f3",
    chapter: "Adventure", chapterPh: "Spirits of Manhattan", session: "Session", mobs: "Extras", mobsHeading: "Extras &amp; Villains",
    mob: "Extra", boss: "Villain", npc: "NPC", typePh: "MOOK // SMARTS 2 MOVES 2 STYLE 2 BRAWN 2", titlePh: "e.g. Ghosts of the Ninth Precinct", subtitlePh: "e.g. A one-session ACE! adventure",
  },
  {
    file: "kob_session_prep_builder.html", key: "kob_session", ls: "kob_builder_v1",
    name: "Kids on Bikes", title: "Session Prep Builder — Kids on Bikes",
    accent: "#7c4dbd", accentDark: "#5c3596", red: "#c0392b", redDark: "#8a1f14", highlight: "#f4d84a", boxBg: "#e3d6f5",
    chapter: "Episode", chapterPh: "01", session: "Session", mobs: "NPCs/Threats", mobsHeading: "NPCs &amp; Threats",
    mob: "Threat", boss: "Powered", npc: "NPC", typePh: "ADULT // Brains d12 Brawn d8 …", titlePh: "e.g. The Lights Over Perkins", subtitlePh: "e.g. A Kids on Bikes mystery",
  },
  {
    file: "nimble_session_prep_builder.html", key: "nimble_session", ls: "nimble_builder_v1",
    name: "Nimble", title: "Session Prep Builder — Nimble",
    accent: "#2f9b63", accentDark: "#1f6f46", red: "#c0392b", redDark: "#8a1f14", highlight: "#f4d84a", boxBg: "#d8efe2",
    chapter: "Level", chapterPh: "Level 3 heroes", session: "Session", mobs: "Monsters/NPCs", mobsHeading: "Monsters &amp; NPCs",
    mob: "Monster", boss: "Legendary", npc: "NPC", typePh: "LVL 2 // MEDIUM // 15 HP // M ARMOR", titlePh: "e.g. Goblins of the Crystal Crag", subtitlePh: "e.g. A Nimble one-shot for level 2 heroes",
  },
  {
    file: "sw_session_prep_builder.html", key: "sw_session", ls: "sw_builder_v1",
    name: "Star Wars", title: "Session Prep Builder — Star Wars: The Roleplaying Game",
    accent: "#c9a227", accentDark: "#7a5f0e", red: "#b82018", redDark: "#7a1510", highlight: "#f0c020", boxBg: "#efe6c4",
    chapter: "Episode", chapterPh: "IV", session: "Session", mobs: "Imperials/NPCs", mobsHeading: "Imperials, Aliens &amp; NPCs",
    mob: "Trooper", boss: "Villain", npc: "NPC", typePh: "STORMTROOPER // DEX 2D // BLASTER 4D", titlePh: "e.g. Rebel Breakout", subtitlePh: "e.g. A Star Wars adventure for 4–6 Rebels",
  },
];

function rep(s, a, b, all = true) {
  if (!s.includes(a)) throw new Error("pattern not found: " + a.slice(0, 60));
  return all ? s.split(a).join(b) : s.replace(a, b);
}

for (const S of SYSTEMS) {
  let s = base;
  s = rep(s, "<title>Session Prep Builder — Dungeon Crawler Carl RPG</title>", `<title>${S.title}</title>`);
  s = s.replace(/<!-- BUILD: [^>]*-->/, `<!-- BUILD: ${S.name} Session Prep Builder (generated from the DCC builder) -->`);
  s = s.replace(/window\.__BUILD__="[^"]*"/, `window.__BUILD__="${S.name} Session Prep Builder"`);
  // palette
  s = rep(s, "--accent: #F7941D; --accent-dark: #C4700A;", `--accent: ${S.accent}; --accent-dark: ${S.accentDark};`);
  s = rep(s, "--accent-red: #C0392B; --accent-red-dark: #8a1f14;", `--accent-red: ${S.red}; --accent-red-dark: ${S.redDark};`);
  s = rep(s, "--box-bg: #b5c4b1;", `--box-bg: ${S.boxBg};`);
  s = rep(s, "--highlight: #FFE600;", `--highlight: ${S.highlight};`);
  s = rep(s, "--ui-accent: #F7941D; --ui-highlight: #FFE600;", `--ui-accent: ${S.accent}; --ui-highlight: ${S.highlight};`);
  s = rep(s, "--section-hdr: #C0392B;", `--section-hdr: ${S.red};`);
  // storage keys (server blob key + standalone localStorage key)
  s = rep(s, "'dcc_session'", `'${S.key}'`);
  s = rep(s, "'dcw_builder_v5'", `'${S.ls}'`);
  s = rep(s, '"dcw_builder_v5"', `"${S.ls}"`);
  // labels
  s = rep(s, '<label class="field-label">Floor</label><input type="text" id="f-floor" placeholder="01 OF 06"', `<label class="field-label">${S.chapter}</label><input type="text" id="f-floor" placeholder="${S.chapterPh}"`);
  s = rep(s, "'FLOOR: '+state.floor", `'${S.chapter.toUpperCase()}: '+state.floor`);
  s = rep(s, 'placeholder="e.g. Crawler\'s First Steps"', `placeholder="${S.titlePh}"`);
  s = rep(s, 'placeholder="e.g. A One-Session Adventure..."', `placeholder="${S.subtitlePh}"`);
  s = rep(s, ">NPCs/Mobs</button>", `>${S.mobs}</button>`);
  s = rep(s, "NPCs &amp; Mobs</div>", `${S.mobsHeading}</div>`);
  s = rep(s, "onchange=\"updateSbCardColor(this);autosave()\"> Mob\n", `onchange="updateSbCardColor(this);autosave()"> ${S.mob}\n`);
  s = rep(s, "onchange=\"updateSbCardColor(this);autosave()\"> Boss\n", `onchange="updateSbCardColor(this);autosave()"> ${S.boss}\n`);
  s = rep(s, 'placeholder="MOB // PETITE (3) // HUMANOID"', `placeholder="${S.typePh}"`);
  s = s.split("Dungeon Crawler Carl").join(S.name);
  s = s.replace("<head>", "<head>\n<!-- GENERATED by scripts/make-session-builders.mjs from dcc_session_prep_builder.html - edit the DCC builder, then re-run. -->");
  writeFileSync(join(ROOT, "tools", "templates", S.file), s, "utf8");
  console.log("wrote", S.file, (s.length / 1024).toFixed(0) + " KB");
}
