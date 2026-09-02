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
    file: "ace_session_prep_builder.html", key: "ace_session", ls: "ace_builder_v1", cfg: "ace", random: "Random Extra",
    name: "ACE!", title: "Session Prep Builder — ACE! (Awfully Cheerful Engine)",
    accent: "#2b93c9", accentDark: "#1d6f9a", red: "#c0251e", redDark: "#8a1f14", highlight: "#f4d84a", boxBg: "#d6e9f3",
    chapter: "Adventure", chapterPh: "Spirits of Manhattan", session: "Session", mobs: "Extras", mobsHeading: "Extras &amp; Villains",
    mob: "Extra", boss: "Villain", npc: "NPC", typePh: "MOOK // SMARTS 2 MOVES 2 STYLE 2 BRAWN 2", titlePh: "e.g. Ghosts of the Ninth Precinct", subtitlePh: "e.g. A one-session ACE! adventure",
  },
  {
    file: "kob_session_prep_builder.html", key: "kob_session", ls: "kob_builder_v1", cfg: "kob", random: "Random NPC",
    name: "Kids on Bikes", title: "Session Prep Builder — Kids on Bikes",
    accent: "#7c4dbd", accentDark: "#5c3596", red: "#c0392b", redDark: "#8a1f14", highlight: "#f4d84a", boxBg: "#e3d6f5",
    chapter: "Episode", chapterPh: "01", session: "Session", mobs: "NPCs/Threats", mobsHeading: "NPCs &amp; Threats",
    mob: "Threat", boss: "Powered", npc: "NPC", typePh: "ADULT // Brains d12 Brawn d8 …", titlePh: "e.g. The Lights Over Perkins", subtitlePh: "e.g. A Kids on Bikes mystery",
  },
  {
    file: "nimble_session_prep_builder.html", key: "nimble_session", ls: "nimble_builder_v1", cfg: "nimble", random: "Random Monster",
    name: "Nimble", title: "Session Prep Builder — Nimble",
    accent: "#2f9b63", accentDark: "#1f6f46", red: "#c0392b", redDark: "#8a1f14", highlight: "#f4d84a", boxBg: "#d8efe2",
    chapter: "Level", chapterPh: "Level 3 heroes", session: "Session", mobs: "Monsters/NPCs", mobsHeading: "Monsters &amp; NPCs",
    mob: "Monster", boss: "Legendary", npc: "NPC", typePh: "LVL 2 // MEDIUM // 15 HP // M ARMOR", titlePh: "e.g. Goblins of the Crystal Crag", subtitlePh: "e.g. A Nimble one-shot for level 2 heroes",
  },
  {
    file: "sw_session_prep_builder.html", key: "sw_session", ls: "sw_builder_v1", cfg: "sw", random: "Random NPC",
    name: "Star Wars", title: "Session Prep Builder — Star Wars: The Roleplaying Game",
    accent: "#c9a227", accentDark: "#7a5f0e", red: "#b82018", redDark: "#7a1510", highlight: "#f0c020", boxBg: "#efe6c4",
    chapter: "Episode", chapterPh: "IV", session: "Session", mobs: "Imperials/NPCs", mobsHeading: "Imperials, Aliens &amp; NPCs",
    mob: "Trooper", boss: "Villain", npc: "NPC", typePh: "STORMTROOPER // DEX 2D // BLASTER 4D", titlePh: "e.g. Rebel Breakout", subtitlePh: "e.g. A Star Wars adventure for 4–6 Rebels",
  },
  {
    file: "dnd_session_prep_builder.html", key: "dnd_session", ls: "dnd_builder_v1", cfg: "dnd", random: "Random Monster",
    name: "D&D", title: "Session Prep Builder — D&D 2024",
    accent: "#c8102e", accentDark: "#8a0f1e", red: "#9b1b22", redDark: "#6f1119", highlight: "#f0c020", boxBg: "#f0d9d0",
    chapter: "Chapter", chapterPh: "Chapter 1", session: "Session", mobs: "Monsters/NPCs", mobsHeading: "Monsters &amp; NPCs",
    mob: "Monster", boss: "Boss", npc: "NPC", typePh: "GOBLIN // CR 1/4 // AC 15 // 7 HP", titlePh: "e.g. The Sunless Citadel", subtitlePh: "e.g. A D&D adventure for level 1–3",
  },
];

// Per-system stat-block schema + bestiary adapter. Replaces the block between
// the SB_CONFIG markers in the DCC builder (see "Stat-block schema" there).
const SB_CONFIGS = {
  ace: `const SB_CONFIG = {
  typePlaceholder: 'MOOK // CORE',
  hp: null,
  rows: [
    [{ key:'smarts', label:'SMARTS' }, { key:'moves', label:'MOVES' }, { key:'style', label:'STYLE' }, { key:'brawn', label:'BRAWN' }, { key:'power', label:'POWER' }],
    [{ key:'health', label:'HEALTH' }, { key:'defence', label:'DEFENCE' }, { key:'focuses', label:'FOCUSES' }],
  ],
  abilitiesLabel: 'Attacks & Notes', abilitiesPlaceholder: 'One per line — Attack: dice, damage',
  mobs: { placeholder: 'Search the ACE! Bestiary…', pool: () => (typeof ACE_EXTRAS !== 'undefined' && Array.isArray(ACE_EXTRAS)) ? ACE_EXTRAS : [], toCard: m => ({
    sbtype: /boss|villain|monster/i.test(m.type||'') ? 'boss' : /npc|ally|civilian/i.test(m.type||'') ? 'npc' : 'mob',
    name: m.name || '', type: [String(m.type||'Extra').toUpperCase(), m.setting && m.setting !== 'core' ? String(m.setting).toUpperCase() : ''].filter(Boolean).join(' // '), flavor: m.description || '',
    smarts: String(m.smarts ?? ''), moves: String(m.moves ?? ''), style: String(m.style ?? ''), brawn: String(m.brawn ?? ''), power: m.power != null ? String(m.power) : '',
    health: String(m.health ?? ''), defence: String(m.defence ?? ''), focuses: (m.focuses||[]).join(', '),
    abilities: [...(m.attacks||[]).map(a => a.name + ': ' + [a.dice != null ? a.dice + ' dice' : '', a.damage != null ? a.damage + ' damage' : '', a.note || ''].filter(Boolean).join(', ')), ...(m.notes||[])].join('\\n'),
  }), sub: m => String(m.type||'') + (m.setting && m.setting !== 'core' ? ' · ' + m.setting : '') },
};`,
  kob: `const SB_CONFIG = {
  typePlaceholder: 'ADULT // BRILLIANT MATHLETE',
  hp: null,
  rows: [
    [{ key:'brains', label:'BRAINS', ph:'d8' }, { key:'brawn', label:'BRAWN', ph:'d8' }, { key:'fight', label:'FIGHT', ph:'d8' }, { key:'flight', label:'FLIGHT', ph:'d8' }, { key:'charm', label:'CHARM', ph:'d8' }, { key:'grit', label:'GRIT', ph:'d8' }],
    [{ key:'age', label:'AGE' }, { key:'at', label:'ADVERSITY', th:'Adversity Tokens' }, { key:'fear', label:'FEAR' }],
  ],
  abilitiesLabel: 'Strengths, Flaw & Motivation', abilitiesPlaceholder: 'One per line — Strength: note · Flaw: … · Motivation: …',
  mobs: null,
};`,
  nimble: `const SB_CONFIG = {
  typePlaceholder: 'MINION // KOBOLDS // SMALL',
  hp: null,
  rows: [
    [{ key:'level', label:'LVL', th:'Level' }, { key:'size', label:'SIZE' }, { key:'hp', label:'HP' }, { key:'armor', label:'ARMOR' }, { key:'saves', label:'SAVES' }],
  ],
  abilitiesLabel: 'Abilities', abilitiesPlaceholder: 'One per line — Name: effect',
  mobs: { placeholder: 'Search the Nimble Bestiary…', pool: () => (typeof NIMBLE_MONSTERS !== 'undefined' && Array.isArray(NIMBLE_MONSTERS)) ? NIMBLE_MONSTERS : [], toCard: m => ({
    sbtype: m.legendary ? 'boss' : 'mob', name: m.name || '',
    type: [m.legendary ? 'LEGENDARY' : m.minion ? 'MINION' : 'MONSTER', String(m.family||'').toUpperCase(), String(m.size||'').toUpperCase()].filter(Boolean).join(' // '), flavor: '',
    level: String(m.level ?? ''), size: m.size || '', hp: m.hp != null ? String(m.hp) : (m.minion ? '1' : ''), armor: m.armor || '', saves: m.saves || '',
    abilities: [...(m.abilities||[]).map(a => a.name + ': ' + a.text), m.familyTrait ? 'Family trait: ' + m.familyTrait : ''].filter(Boolean).join('\\n'),
  }), sub: m => (m.family || '') + ' · L' + m.level + (m.legendary ? ' · legendary' : m.minion ? ' · minion' : '') },
};`,
  sw: `const _swCode = p => { p = Math.round(Number(p)||0); const d = Math.floor(p/3), r = p%3; return d ? d + 'D' + (r ? '+' + r : '') : (r ? '+' + r : ''); };
const SB_CONFIG = {
  typePlaceholder: 'IMPERIAL // STORMTROOPER',
  hp: null,
  rows: [
    [{ key:'dex', label:'DEX', th:'Dexterity', ph:'2D' }, { key:'kno', label:'KNOW', th:'Knowledge', ph:'2D' }, { key:'mec', label:'MECH', th:'Mechanical', ph:'2D' }, { key:'per', label:'PERC', th:'Perception', ph:'2D' }, { key:'str', label:'STR', th:'Strength', ph:'2D' }, { key:'tec', label:'TECH', th:'Technical', ph:'2D' }],
    [{ key:'move', label:'MOVE' }, { key:'force', label:'FORCE PTS', th:'Force Points' }, { key:'armor', label:'ARMOR' }],
  ],
  abilitiesLabel: 'Skills, Equipment & Notes', abilitiesPlaceholder: 'One per line — blaster 4D · Stormtrooper armor (+1D)',
  mobs: { placeholder: 'Search the Star Wars Bestiary…', pool: () => (typeof SW_CHARACTERS !== 'undefined' && Array.isArray(SW_CHARACTERS)) ? SW_CHARACTERS : [], toCard: m => { const A = m.attributes || {}; const c = k => A[k] == null ? '' : _swCode(A[k]); return {
    sbtype: /villain/i.test(m.group||'') ? 'boss' : /hero|rebel|civilian|alien/i.test(m.group||'') ? 'npc' : 'mob', name: m.name || '',
    type: [String(m.group||'').toUpperCase(), m.book === 'sourcebook' ? 'SOURCEBOOK' : m.book === 'companion' ? 'RULES COMPANION' : ''].filter(Boolean).join(' // '), flavor: m.description || '',
    dex: c('Dexterity'), kno: c('Knowledge'), mec: c('Mechanical'), per: c('Perception'), str: c('Strength'), tec: c('Technical'),
    move: m.move || '', force: '', armor: ((m.equipment||[]).find(e => /armor/i.test(e)) || '').split(/[:(]/)[0].trim(),
    abilities: [...(m.skills||[]).map(x => 'Skill: ' + x), ...(m.equipment||[]).map(x => 'Gear: ' + x), m.notes ? 'Notes: ' + m.notes : ''].filter(Boolean).join('\\n'),
  }; }, sub: m => String(m.group||'') + (m.book !== 'core' ? ' · ' + m.book : '') },
};`,
  dnd: `const SB_CONFIG = {
  typePlaceholder: 'HUMANOID // CR 1/4',
  hp: null,
  rows: [
    [{ key:'ac', label:'AC' }, { key:'hp', label:'HP' }, { key:'speed', label:'SPEED' }, { key:'cr', label:'CR' }],
    [{ key:'str', label:'STR', ph:'10' }, { key:'dex', label:'DEX', ph:'10' }, { key:'con', label:'CON', ph:'10' }, { key:'int', label:'INT', ph:'10' }, { key:'wis', label:'WIS', ph:'10' }, { key:'cha', label:'CHA', ph:'10' }],
  ],
  abilitiesLabel: 'Traits, Actions & Legendary', abilitiesPlaceholder: 'One per line — Name: effect',
  mobs: { placeholder: 'Search the D&D Bestiary…', pool: () => (typeof DND_MONSTERS !== 'undefined' && Array.isArray(DND_MONSTERS)) ? DND_MONSTERS : [], toCard: m => { const A = m.abilities || {}; return {
    sbtype: (m.legendaryActions && m.legendaryActions.length) ? 'boss' : /commoner|noble|guard|priest|acolyte|mage|knight|scout|spy|bandit|cultist|tribal|veteran|gladiator|druid|archmage|assassin/i.test(m.name||'') ? 'npc' : 'mob',
    name: m.name || '',
    type: [String(m.type||'').toUpperCase(), 'CR ' + m.cr].filter(Boolean).join(' // '), flavor: m.alignment && m.alignment !== 'Unaligned' ? String(m.size) + ' · ' + m.alignment : String(m.size||''),
    ac: String(m.ac ?? ''), hp: m.hp != null ? String(m.hp) : '', speed: (m.speed||'').replace(/ ?ft\\./g, ''), cr: String(m.cr ?? ''),
    str: String(A.STR ?? ''), dex: String(A.DEX ?? ''), con: String(A.CON ?? ''), int: String(A.INT ?? ''), wis: String(A.WIS ?? ''), cha: String(A.CHA ?? ''),
    abilities: [...(m.traits||[]).map(t => t.name + ': ' + t.description), ...(m.actions||[]).map(a => a.name + ': ' + a.description), ...(m.bonusActions||[]).map(a => 'Bonus — ' + a.name + ': ' + a.description), ...(m.reactions||[]).map(a => 'Reaction — ' + a.name + ': ' + a.description), ...(m.legendaryActions||[]).map(a => 'Legendary — ' + a.name + ': ' + a.description)].join('\\n'),
  }; }, sub: m => String(m.type||'') + ' · CR ' + m.cr + (m.legendaryActions && m.legendaryActions.length ? ' · legendary' : '') },
};`,
};
const MOB_DATA = {
  ace: '<script src="/tools-data/ace-extras.js"></script>',
  kob: '',
  nimble: '<script src="/tools-data/nimble-monsters.js"></script>',
  sw: '<script src="/tools-data/sw-characters.js"></script>',
  dnd: '<script src="/tools-data/dnd-monsters.js"></script>',
};

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
  // stat-block schema + bestiary source
  s = s.replace(/\/\* SB_CONFIG_START \*\/[\s\S]*?const _DCC_SIZE_NAMES/, "/* SB_CONFIG_START */\n" + SB_CONFIGS[S.cfg] + "\nconst _DCC_SIZE_NAMES");
  s = s.replace(/<!-- MOB_DATA_START -->[\s\S]*?<!-- MOB_DATA_END -->/, MOB_DATA[S.cfg]);
  s = rep(s, "</svg> Random Mob</button>", `</svg> ${S.random}</button>`);
  s = s.split("Dungeon Crawler Carl").join(S.name);
  s = s.replace("<head>", "<head>\n<!-- GENERATED by scripts/make-session-builders.mjs from dcc_session_prep_builder.html - edit the DCC builder, then re-run. -->");
  writeFileSync(join(ROOT, "tools", "templates", S.file), s, "utf8");
  console.log("wrote", S.file, (s.length / 1024).toFixed(0) + " KB");
}
