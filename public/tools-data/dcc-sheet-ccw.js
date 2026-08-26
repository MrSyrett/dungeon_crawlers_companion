// Dungeon Crawler Carl — Character Creation Wizard
// Loaded by tools/templates/dcc_character_sheet.html as <script src>.
//
// Produces a complete `data` object in the shape collectSheet() emits and hands
// it to the sheet via applySheet(data) + saveSheet(). Reads the DCC data layer
// globals (DCC_RACES, DCC_SKILLS, DCC_BACKGROUNDS, DCC_SPELLS, DCC_TABLES) that
// the sheet also loads from /tools-data/dcc-*.js.
//
// Scope: the tutorial-floor "First Steps" path — a Level-1 crawler. Guided only
// (this system has no random character generator). The "Third Floor & Beyond"
// fast-forward is a later increment; the path fork is present with a note.
//
// Rules refs (Core Rulebook): character creation pp. 100-115; stat mods Table 2
// (p. 57); background tables 12-15 (pp. 104-106); combat training pp. 108-109.
//
// IMPORTANT: the sheet's skill/attack stat <select> options are LOWERCASE
// (str/int/con/dex/cha). Always write the linked stat lowercased or it silently
// fails to set. Size -> combat.drSize (the "Size" box); AI Favor -> combat.drAiFavor.

(function () {
  "use strict";

  // ── data-layer availability ────────────────────────────────────────────────
  function haveData() {
    return typeof DCC_RACES !== "undefined" && typeof DCC_SKILLS !== "undefined" &&
      typeof DCC_BACKGROUNDS !== "undefined" && typeof DCC_TABLES !== "undefined";
  }

  // ── constants ────────────────────────────────────────────────────────────────
  const ERAS = ["Childhood", "Adolescence", "Career", "Hobby"];
  const STAT_IDS = ["str", "int", "con", "dex", "cha"];
  const STAT_ABBR = { str: "STR", int: "INT", con: "CON", dex: "DEX", cha: "CHA" };
  const STAT_NAME_TO_ID = { strength: "str", intelligence: "int", constitution: "con", dexterity: "dex", charisma: "cha" };
  const STANDARD_ARRAY = [6, 5, 4, 3, 2];
  const ERA_RANK = { Childhood: 1, Adolescence: 1, Career: 3, Hobby: 2 };
  // The basic attack spells a Level-1 crawler may start with (Core p.108-109).
  const BASIC_SPELLS = ["Dirt Clod", "Fire Fingers", "Frost Scar", "Shock Treatment", "Soul Collector"];
  const SIZE_NAME = { 1: "Tiny", 2: "Small", 3: "Petite", 4: "Medium", 5: "Large", 6: "Huge", 7: "Colossal", 8: "Gargantuan" };

  // ── Third-Floor+ fast-forward (Core pp.115-118) ─────────────────────────────
  // level, total stat points to distribute, and number of Experiences by floor.
  const FLOOR_CFG = { 3: { level: 10, statPoints: 27, experiences: 6 }, 4: { level: 20, statPoints: 57, experiences: 8 }, 5: { level: 30, statPoints: 87, experiences: 10 } };
  // Table 25 starting-loot rows: each gives a Weapon / Armor / Item / Consumable at a tier.
  const LOOT_ROWS = [
    { row: 1, weapon: "Platinum", armor: "Gold", item: "Silver", consumable: "Bronze" },
    { row: 2, weapon: "Bronze", armor: "Platinum", item: "Gold", consumable: "Silver" },
    { row: 3, weapon: "Silver", armor: "Bronze", item: "Platinum", consumable: "Gold" },
    { row: 4, weapon: "Gold", armor: "Silver", item: "Bronze", consumable: "Platinum" },
  ];
  const TIER_DR = { Bronze: 1, Silver: 2, Gold: 3, Platinum: 4 };            // armor DR by tier
  const TIER_WEAPON_SKILL = { Bronze: 0, Silver: 1, Gold: 1, Platinum: 2 };  // primary-weapon rank bonus by tier
  const LOOT_WEAPON = { Bronze: "a funny d6 non-magical weapon (AI Favor 2 vs Bosses)", Silver: "+1 Weapon Skill and a +1 damage buff", Gold: "+1 Weapon Skill and a Scroll of Upgrade", Platinum: "+2 Weapon Skill, +3 STR or DEX, and a Scroll of Upgrade" };
  const LOOT_ARMOR = { Bronze: "mundane armor: +1 DR", Silver: "+2 DR and Anti-Piercing", Gold: "+3 DR and resistance to an uncommon damage type", Platinum: "+4 DR, +5 CON, +3 Catcher or Taunt" };
  const LOOT_ITEM = { Bronze: "50 ft rope / bicycle / canoe / hang glider", Silver: "Friendship Bracelet of a Race kind", Gold: "accessory: +3 to a stat + skill pairing", Platinum: "+3 Skill Potion (permanent)" };
  const LOOT_CONS = { Bronze: "10 Healing Potions / Bandages / Torches, or 1 dynamite", Silver: "2 Antidotes, a Good Healing Potion, or Goblin Dynamite", Gold: "a Rank-5 Spell Scroll or a Gold Healing Potion", Platinum: "a Scratcher ticket (p.218)" };

  function classByName(n) { return (typeof DCC_CLASSES !== "undefined" ? DCC_CLASSES : []).find((c) => c.name === n) || null; }
  function availExperiences() { return (typeof DCC_EXPERIENCES !== "undefined" ? DCC_EXPERIENCES : []).filter((e) => e.floor <= (W.floor - 1)); }
  function statPointsSpent() { return STAT_IDS.reduce((n, k) => n + (parseInt(W.statPoints[k], 10) || 0), 0); }
  // "Third-floor rules apply": true for the fast-forward path AND the upgrade flow —
  // both grant racial/class bonuses and distribute stat points.
  function isThird() { return W.mode === "upgrade" || W.path === "thirdfloor"; }
  function isUpgrade() { return W.mode === "upgrade"; }
  // Base (pre-mod) stat: the assigned value when creating; the existing Unenhanced
  // score when upgrading.
  function baseStatVal(k) {
    if (isUpgrade()) { const s = W.existing && W.existing.stats && W.existing.stats[k]; return parseInt(s ? s.unenh : 0, 10) || 0; }
    return parseInt(W.statVals[k], 10) || 0;
  }

  // ── helpers ────────────────────────────────────────────────────────────────
  const d = (n) => Math.floor(Math.random() * n) + 1;
  function rollStat() { let r = d(6); while (r === 1) r = d(6); return r; } // reroll 1s
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const attr = (s) => esc(s).replace(/'/g, "&#39;"); // safe inside single-quoted onclick args

  // Stat modifier from a stat SCORE (Core Table 2, p.57). The score determines
  // the mod; they are never summed.
  function statMod(v) {
    v = parseInt(v, 10) || 0;
    if (v <= 0) return 0;
    if (v <= 2) return 1; if (v <= 5) return 2; if (v <= 9) return 3; if (v <= 19) return 4;
    if (v <= 49) return 5; if (v <= 99) return 6; if (v <= 149) return 7; if (v <= 199) return 8;
    if (v <= 299) return 9; return 10;
  }

  // Parse a race's grant bullets into per-stat modifiers.
  function raceStatMods(race) {
    const mods = { str: 0, int: 0, con: 0, dex: 0, cha: 0 };
    (race && race.grants || []).forEach((g) => {
      const m = String(g).match(/^\s*([+-]\d+)\s+(.+)$/);
      if (!m) return;
      const amt = parseInt(m[1], 10);
      const rest = m[2];
      if (/to all stats|^all stats/i.test(rest)) { STAT_IDS.forEach((k) => (mods[k] += amt)); return; }
      Object.keys(STAT_NAME_TO_ID).forEach((nm) => {
        if (new RegExp("\\b" + nm + "\\b", "i").test(rest)) mods[STAT_NAME_TO_ID[nm]] += amt;
      });
    });
    return mods;
  }

  function raceByName(n) { return (typeof DCC_RACES !== "undefined" ? DCC_RACES : []).find((r) => r.name === n) || null; }
  function skillByName(n) {
    if (typeof DCC_SKILLS === "undefined") return null;
    const t = String(n).toLowerCase();
    return DCC_SKILLS.find((s) => s.name.toLowerCase() === t) ||
      DCC_SKILLS.find((s) => s.name.toLowerCase().replace(/[^a-z]/g, "") === t.replace(/[^a-z]/g, "")) || null;
  }
  // Governing stat for a skill, lowercased for the sheet's selects; "" if none.
  function skillStatLc(name) { const sd = skillByName(name); return sd && sd.stat ? String(sd.stat).toLowerCase() : ""; }
  function attackSkills() { return (typeof DCC_SKILLS !== "undefined" ? DCC_SKILLS : []).filter((s) => s.category === "attack" && s.group !== "Damage Effect" && s.group !== "Animal/Pet Strike"); }
  function basicSpells() {
    const all = (typeof DCC_SPELLS !== "undefined" ? DCC_SPELLS : []);
    return BASIC_SPELLS.map((n) => all.find((s) => s.name === n)).filter(Boolean);
  }
  function bgByEra(era) { return (typeof DCC_BACKGROUNDS !== "undefined" ? DCC_BACKGROUNDS : []).filter((b) => b.era === era); }
  // Every distinct skill offered anywhere in an era's table (for Custom picks).
  function eraSkillPool(era) {
    const set = [];
    bgByEra(era).forEach((b) => (b.skills || []).forEach((s) => { if (!set.includes(s)) set.push(s); }));
    return set.sort((a, b) => a.localeCompare(b));
  }

  // ── wizard state ────────────────────────────────────────────────────────────
  let W = null;
  function freshState() {
    return {
      step: 0,
      mode: "create",   // 'create' | 'upgrade' (upgrade an existing crawler to Floor 3)
      existing: null,   // upgrade: the sheet state read at launch (collectSheet())
      path: "tutorial", // create: 'tutorial' | 'thirdfloor'
      floor: 3,         // fast-forward / upgrade target floor
      basics: { name: "", gender: "", crawler: String(500000 + Math.floor(Math.random() * 12400000)) },
      race: "Human",
      class: "",        // thirdfloor only
      statMethod: "array", // 'array' | 'roll'
      statVals: { str: "", int: "", con: "", dex: "", cha: "" }, // pre-race base
      statPoints: { str: 0, int: 0, con: 0, dex: 0, cha: 0 },     // thirdfloor distribution
      bg: {}, // era -> { base: string|null, custom: bool, name: string, skills: [] }
      info: {}, // skillName -> bool (show its description)
      combat: { type: "weapon", weapon: "", weaponName: "", spell: "", spellName: "" },
      experiences: [],  // thirdfloor: [{ exp: name, skills: [] }]
      loot: "",         // thirdfloor: Table-25 row "1".."4"
      story: { trauma: "", loose: "", regret: "" },
      gear: { clothes: "", useful: "", junk: "", weapon: "", extra: "" },
      gearInit: false,
    };
  }

  // Step list depends on the path. The Third-Floor fast-forward inserts Class,
  // Experiences, Stat Points, and Loot between the base steps.
  const STEP_DEFS = {
    intro: "Upgrade", basics: "Basics", race: "Race", class: "Class", stats: "Stats", background: "Background",
    combat: "Combat", experiences: "Experiences", statpoints: "Stat Points", loot: "Loot",
    story: "Story", gear: "Gear", review: "Review",
  };
  function steps() {
    let keys;
    if (isUpgrade()) keys = ["intro", "race", "class", "statpoints", "experiences", "loot", "review"];
    else if (W.path === "thirdfloor") keys = ["basics", "race", "class", "stats", "background", "combat", "experiences", "statpoints", "loot", "story", "gear", "review"];
    else keys = ["basics", "race", "stats", "background", "combat", "story", "gear", "review"];
    return keys.map((k) => ({ key: k, title: STEP_DEFS[k] }));
  }
  function clampStep() { const n = steps().length; if (W.step > n - 1) W.step = n - 1; }

  // ── CSS ────────────────────────────────────────────────────────────────────
  function injectCss() {
    if (document.getElementById("dccw-css")) return;
    const st = document.createElement("style");
    st.id = "dccw-css";
    st.textContent = `
    .dccw-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto;}
    .dccw-modal{background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:740px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:inherit;}
    .dccw-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid #2a2a2e;}
    .dccw-title{font-weight:800;font-size:18px;letter-spacing:.02em;text-transform:uppercase;color:#fff;margin:0;}
    .dccw-x{background:transparent;border:1px solid #333;color:#888;border-radius:6px;width:30px;height:30px;cursor:pointer;font-size:16px;line-height:1;}
    .dccw-x:hover{border-color:#b82018;color:#f0a8a3;}
    .dccw-steps{display:flex;flex-wrap:wrap;gap:6px;padding:12px 20px;border-bottom:1px solid #2a2a2e;}
    .dccw-pip{font-size:10px;text-transform:uppercase;letter-spacing:.08em;padding:4px 8px;border-radius:5px;border:1px solid #2a2a2e;color:#8a8a93;}
    .dccw-pip.on{border-color:#b82018;color:#f0a8a3;background:#1c1516;}
    .dccw-pip.done{color:#ece9e1;}
    .dccw-body{padding:20px;min-height:240px;}
    .dccw-body h3{margin:0 0 4px;font-size:15px;color:#fff;text-transform:uppercase;letter-spacing:.03em;}
    .dccw-hint{color:#8a8a93;font-size:12px;margin:0 0 14px;line-height:1.5;}
    .dccw-row{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;}
    .dccw-field{display:flex;flex-direction:column;gap:4px;flex:1;min-width:150px;}
    .dccw-field label{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#8a8a93;}
    .dccw-modal input[type=text], .dccw-modal select, .dccw-modal textarea{background:#0e0e10;border:1px solid #2a2a2e;border-radius:6px;color:#ece9e1;padding:8px 10px;font-size:13px;font-family:inherit;width:100%;}
    .dccw-modal input:focus, .dccw-modal select:focus, .dccw-modal textarea:focus{outline:none;border-color:#b82018;}
    .dccw-seg{display:inline-flex;border:1px solid #2a2a2e;border-radius:7px;overflow:hidden;}
    .dccw-seg button{background:transparent;border:none;color:#8a8a93;padding:7px 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;cursor:pointer;}
    .dccw-seg button.on{background:#1c1516;color:#f0a8a3;}
    .dccw-chip{display:inline-flex;align-items:center;gap:5px;border:1px solid #2a2a2e;border-radius:20px;padding:4px 6px 4px 12px;font-size:12px;color:#8a8a93;cursor:pointer;margin:0 6px 6px 0;}
    .dccw-chip.on{border-color:#b82018;color:#f0a8a3;background:#1c1516;}
    .dccw-i{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;border:1px solid #3a3a40;color:#8a8a93;font-size:10px;font-style:italic;cursor:pointer;}
    .dccw-i:hover{border-color:#b82018;color:#f0a8a3;}
    .dccw-desc{border-left:2px solid #b82018;background:#0e0e10;border-radius:4px;padding:8px 10px;margin:2px 0 8px;font-size:12px;color:#c9c9cf;line-height:1.5;}
    .dccw-desc b{color:#f0a8a3;}
    .dccw-card{border:1px solid #2a2a2e;border-radius:8px;padding:12px;margin-bottom:10px;}
    .dccw-statgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;text-align:center;}
    .dccw-statbox{border:1px solid #2a2a2e;border-radius:7px;padding:8px 4px;}
    .dccw-statbox .k{font-size:10px;letter-spacing:.1em;color:#8a8a93;text-transform:uppercase;}
    .dccw-statbox .v{font-size:20px;font-weight:800;color:#fff;line-height:1.1;}
    .dccw-statbox .m{font-size:11px;color:#8a8a93;}
    .dccw-statbox .brk{font-size:9px;color:#6d6d75;margin-top:2px;}
    .dccw-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 20px;border-top:1px solid #2a2a2e;}
    .dccw-btn{background:#0e0e10;border:1px solid #2a2a2e;color:#ece9e1;border-radius:7px;padding:9px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;cursor:pointer;}
    .dccw-btn:hover{border-color:#555;}
    .dccw-btn.primary{background:#b82018;border-color:#b82018;color:#fff;}
    .dccw-btn.primary:hover{background:#d0281e;}
    .dccw-btn:disabled{opacity:.4;cursor:not-allowed;}
    .dccw-warn{color:#e9b24c;font-size:12px;margin-top:8px;}
    .dccw-sub{color:#8a8a93;font-size:11px;}
    .dccw-list{margin:6px 0 0;padding-left:16px;color:#c9c9cf;font-size:13px;line-height:1.6;}
    .dccw-grants{margin:8px 0 0;padding:0;list-style:none;display:grid;gap:6px;}
    .dccw-grants li{position:relative;padding-left:16px;font-size:13px;color:#c9c9cf;line-height:1.5;}
    .dccw-grants li::before{content:"▸";position:absolute;left:0;color:#b82018;}
    `;
    document.head.appendChild(st);
  }

  // ── open / close ────────────────────────────────────────────────────────────
  function open() {
    injectCss();
    if (!haveData()) {
      alert("The Character Wizard needs the DCC data files (races, skills, backgrounds). Open this sheet from the app so /tools-data/dcc-*.js can load.");
      return;
    }
    W = freshState();
    let ov = document.getElementById("dccw-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "dccw-overlay";
      ov.className = "dccw-overlay";
      ov.addEventListener("mousedown", (e) => { if (e.target === ov) close(); });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    render();
  }
  function ensureOverlay() {
    let ov = document.getElementById("dccw-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "dccw-overlay";
      ov.className = "dccw-overlay";
      ov.addEventListener("mousedown", (e) => { if (e.target === ov) close(); });
      document.body.appendChild(ov);
    }
    ov.style.display = "flex";
    return ov;
  }
  // Upgrade an EXISTING crawler to the Third Floor: read the current sheet, then
  // add race, class, +27 stat points, skill boosts, experiences and loot on top.
  function openUpgrade() {
    injectCss();
    if (!haveData()) { alert("The wizard needs the DCC data files (races, classes, skills, experiences). Open this sheet from the app so /tools-data/dcc-*.js can load."); return; }
    if (typeof collectSheet !== "function") { alert("Couldn't read the current sheet to upgrade it. Try reloading."); return; }
    W = freshState();
    W.mode = "upgrade";
    W.path = "thirdfloor";
    W.floor = 3;
    W.existing = collectSheet();
    const exRace = W.existing.header && W.existing.header["f-race"];
    W.race = exRace && raceByName(exRace) ? exRace : "Human"; // seed with the existing race if it's a real one
    W.class = (W.existing.header && W.existing.header["f-class"]) || "";
    ensureOverlay();
    render();
  }
  function close() { const ov = document.getElementById("dccw-overlay"); if (ov) ov.style.display = "none"; W = null; }

  // ── step: upgrade intro ─────────────────────────────────────────────────────
  function renderUpgradeIntro() {
    const ex = W.existing || {};
    const name = (ex.header && ex.header["f-name"]) || "This crawler";
    const lvl = (ex.header && ex.header["f-level"]) || "1";
    const statLine = STAT_IDS.map((k) => `${STAT_ABBR[k]} ${ex.stats && ex.stats[k] ? ex.stats[k].unenh || "—" : "—"}`).join(" · ");
    const nSkills = (ex.skills || []).filter((s) => s.name).length;
    const nAtk = (ex.attacks || []).filter((a) => a.name).length;
    return `
      <h3>Upgrade to the Third Floor</h3>
      <p class="dccw-hint">This keeps <b>${esc(name)}</b> as-is and layers on everything a crawler gains reaching Floor 3 (Level 10). Nothing you've written is erased — stats, skills and gear are kept and boosted.</p>
      <div class="dccw-card">
        <div style="margin-bottom:6px;"><b style="color:#f0a8a3;">${esc(name)}</b> <span class="dccw-sub">· currently Level ${esc(lvl)} · ${nAtk} attack(s), ${nSkills} skill(s)</span></div>
        <div class="dccw-sub">Unenhanced stats: ${esc(statLine)}</div>
      </div>
      <p class="dccw-hint" style="margin-top:12px;">Next you'll <b>choose a Race and Class</b> (their bonuses now apply), <b>distribute 27 stat points</b>, add <b>6 Experiences</b>, and pick your <b>starting loot</b>. On finish it sets Level 10, applies your racial Size, rolls AI Favor, sets Popularity, and boosts your skills (primary attack +2d4, everything else +1d4).</p>
      <p class="dccw-sub">Tip: export the sheet first if you want a backup of the Level-1 version.</p>`;
  }

  // ── render shell ──────────────────────────────────────────────────────────────
  function render() {
    const ov = document.getElementById("dccw-overlay");
    if (!ov || !W) return;
    clampStep();
    const STEPS = steps();
    const key = STEPS[W.step].key;
    const body = ({
      intro: renderUpgradeIntro, basics: renderBasics, race: renderRace, class: renderClass, stats: renderStats, background: renderBackground,
      combat: renderCombat, experiences: renderExperiences, statpoints: renderStatPoints, loot: renderLoot,
      story: renderStory, gear: renderGear, review: renderReview,
    })[key]();
    const pips = STEPS.map((st, i) =>
      `<span class="dccw-pip ${i === W.step ? "on" : i < W.step ? "done" : ""}">${i + 1}. ${st.title}</span>`
    ).join("");
    const last = W.step === STEPS.length - 1;
    ov.innerHTML = `
      <div class="dccw-modal" role="dialog" aria-label="Character Creation Wizard">
        <div class="dccw-head"><h2 class="dccw-title">Crawler Creation</h2>
          <button class="dccw-x" onclick="DCCW.close()" aria-label="Close">✕</button></div>
        <div class="dccw-steps">${pips}</div>
        <div class="dccw-body">${body}</div>
        <div class="dccw-foot">
          <button class="dccw-btn" onclick="DCCW.back()" ${W.step === 0 ? "disabled" : ""}>← Back</button>
          ${last
        ? `<button class="dccw-btn primary" onclick="DCCW.finish()">✓ Create Character</button>`
        : `<button class="dccw-btn primary" onclick="DCCW.next()">Next →</button>`}
        </div>
      </div>`;
  }

  // ── step: basics ──────────────────────────────────────────────────────────────
  function renderBasics() {
    return `
      <h3>Who's the crawler?</h3>
      <p class="dccw-hint">Just the basics. You'll pick a race, roll stats, and choose skills over the next few steps.</p>
      <div class="dccw-row">
        <div class="dccw-field"><label>Name</label><input type="text" value="${esc(W.basics.name)}" oninput="DCCW.setBasic('name',this.value)" placeholder="Crawler name"></div>
        <div class="dccw-field"><label>Gender / Pronouns (optional)</label><input type="text" value="${esc(W.basics.gender)}" oninput="DCCW.setBasic('gender',this.value)" placeholder="optional"></div>
      </div>
      <div class="dccw-row">
        <div class="dccw-field"><label>Crawler #</label>
          <div style="display:flex;gap:6px;"><input type="text" value="${esc(W.basics.crawler)}" oninput="DCCW.setBasic('crawler',this.value)"><button class="dccw-btn" onclick="DCCW.rollCrawler()" title="New number">🎲</button></div>
        </div>
        <div class="dccw-field"><label>Starting point</label>
          <div class="dccw-seg">
            <button class="${W.path === "tutorial" ? "on" : ""}" onclick="DCCW.setPath('tutorial')">Tutorial (Lvl 1)</button>
            <button class="${W.path === "thirdfloor" ? "on" : ""}" onclick="DCCW.setPath('thirdfloor')">Third Floor+</button>
          </div>
        </div>
      </div>
      ${isThird() ? `
      <div class="dccw-row"><div class="dccw-field"><label>Starting floor</label><div class="dccw-seg">
        ${[3, 4, 5].map((f) => `<button class="${W.floor === f ? "on" : ""}" onclick="DCCW.setFloor(${f})">Floor ${f} · Lvl ${FLOOR_CFG[f].level}</button>`).join("")}
      </div></div></div>
      <p class="dccw-sub">Fast-forward: you'll build the crawler's foundation, then jump to <b>Level ${FLOOR_CFG[W.floor].level}</b> — add a Class, ${FLOOR_CFG[W.floor].experiences} Experiences, ${FLOOR_CFG[W.floor].statPoints} stat points, and starting loot. Skills and your attack get their fast-forward rank boosts automatically.</p>` : ""}`;
  }

  // ── step: race ────────────────────────────────────────────────────────────────
  function renderRace() {
    if (!isThird()) {
      // Tutorial floors: racial benefits/stat bonuses don't kick in until Floor 3,
      // so race is just a flavor label (Human by default). No mods, Size stays Medium.
      return `
        <h3>Race</h3>
        <p class="dccw-hint">On the tutorial floors your race is flavor only — racial <b>benefits and stat bonuses don't kick in until you reach the Third Floor</b>. Note what you are (Human by default); you'll pick a race with real benefits when you upgrade at Floor 3.</p>
        <div class="dccw-row"><div class="dccw-field"><label>Race</label><input type="text" value="${esc(W.race)}" oninput="DCCW.setRaceText(this.value)" placeholder="Human"></div></div>`;
    }
    const races = DCC_RACES.slice().sort((a, b) => (a.group === b.group ? a.name.localeCompare(b.name) : a.group.localeCompare(b.group)));
    const opts = ["Earth", "Alien"].map((grp) =>
      `<optgroup label="${grp}-based">` + races.filter((r) => r.group === grp).map((r) =>
        `<option value="${attr(r.name)}" ${r.name === W.race ? "selected" : ""}>${esc(r.name)}</option>`).join("") + `</optgroup>`
    ).join("");
    const race = raceByName(W.race);
    const mods = raceStatMods(race);
    const modLine = STAT_IDS.filter((k) => mods[k]).map((k) => `${STAT_ABBR[k]} ${mods[k] > 0 ? "+" : ""}${mods[k]}`).join(", ") || "no stat changes";
    const grants = race ? race.grants : [];
    return `
      <h3>Choose a race</h3>
      <p class="dccw-hint">Each race carries its own benefits — read them before you decide. Your race sets your Size and modifies your stats on the next step.</p>
      <div class="dccw-row"><div class="dccw-field"><label>Race</label><select onchange="DCCW.setRace(this.value)">${opts}</select></div></div>
      ${race ? `
      <div class="dccw-card">
        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;margin-bottom:4px;">
          <b style="color:#f0a8a3;text-transform:uppercase;letter-spacing:.04em;">${esc(race.name)}</b>
          <span class="dccw-sub">${esc(race.group)}-based · Size ${race.size} (${SIZE_NAME[race.size] || "—"}) · Stat mods: ${modLine}</span>
        </div>
        <ul class="dccw-grants">${grants.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
      </div>` : ""}`;
  }

  // ── step: class (Third-Floor+) ──────────────────────────────────────────────
  function renderClass() {
    if (typeof DCC_CLASSES === "undefined") return `<h3>Choose a class</h3><p class="dccw-warn">The class list didn't load. Reopen the sheet from the app so /tools-data/dcc-classes.js is available.</p>`;
    const classes = DCC_CLASSES.slice().sort((a, b) => a.name.localeCompare(b.name));
    const opts = ['<option value="">— choose a class —</option>'].concat(classes.map((c) => `<option value="${attr(c.name)}" ${c.name === W.class ? "selected" : ""}>${esc(c.name)}</option>`)).join("");
    const cls = classByName(W.class);
    const mods = cls ? raceStatMods(cls) : ZERO_MODS;
    const modLine = STAT_IDS.filter((k) => mods[k]).map((k) => `${STAT_ABBR[k]} ${mods[k] > 0 ? "+" : ""}${mods[k]}`).join(", ") || "no stat changes";
    return `
      <h3>Choose a class</h3>
      <p class="dccw-hint">At Floor 3 and beyond your crawler has a Class. Read its benefits — its stat bonuses apply to your sheet on the next step.</p>
      <div class="dccw-row"><div class="dccw-field"><label>Class</label><select onchange="DCCW.setClass(this.value)">${opts}</select></div></div>
      ${cls ? `<div class="dccw-card">
        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;margin-bottom:4px;">
          <b style="color:#f0a8a3;text-transform:uppercase;letter-spacing:.04em;">${esc(cls.name)}</b>
          <span class="dccw-sub">${esc(cls.categories.join(" / "))}${cls.earthClass ? " · Earth Class" : ""} · Stat mods: ${modLine}</span>
        </div>
        ${cls.prerequisites ? `<p class="dccw-sub" style="margin-bottom:6px;">Prerequisite: ${esc(cls.prerequisites)}</p>` : ""}
        <ul class="dccw-grants">${cls.grants.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
      </div>` : `<p class="dccw-warn">Choose a class to continue.</p>`}`;
  }

  // ── step: experiences (Third-Floor+) ────────────────────────────────────────
  function ensureExpSlots() {
    const n = FLOOR_CFG[W.floor].experiences;
    while (W.experiences.length < n) W.experiences.push({ exp: "", skills: [] });
    if (W.experiences.length > n) W.experiences.length = n;
  }
  function renderExperiences() {
    if (typeof DCC_EXPERIENCES === "undefined") return `<h3>Experiences</h3><p class="dccw-warn">The experiences list didn't load. Reopen the sheet from the app so /tools-data/dcc-experiences.js is available.</p>`;
    ensureExpSlots();
    const avail = availExperiences();
    const tables = [...new Set(avail.map((e) => e.table))];
    const n = W.experiences.length;
    let h = `<h3>Experiences</h3><p class="dccw-hint">Pick <b>${n}</b> defining moments from your climb. For each, choose an experience, then take <b>2</b> of its skills — their ranks (1d4 &amp; 1d2) are rolled when you finish. Tap <span class="dccw-i" style="cursor:default;">i</span> to read a skill.</p>`;
    W.experiences.forEach((slot, idx) => {
      const opts = ['<option value="">— choose an experience —</option>'].concat(tables.map((t) =>
        `<optgroup label="${esc(t)}">` + avail.filter((e) => e.table === t).map((e) => `<option value="${attr(e.name)}" ${slot.exp === e.name ? "selected" : ""}>${esc(e.name)}</option>`).join("") + `</optgroup>`)).join("");
      h += `<div class="dccw-card"><div class="dccw-field" style="margin-bottom:6px;"><label>Experience ${idx + 1}</label><select onchange="DCCW.setExp(${idx},this.value)">${opts}</select></div>`;
      const e = avail.find((x) => x.name === slot.exp);
      if (e) {
        if (e.desc) h += `<p class="dccw-sub" style="margin-bottom:6px;">${esc(e.desc)}</p>`;
        h += `<div>` + e.skills.map((sk) => {
          const on = (slot.skills || []).includes(sk);
          return `<span class="dccw-chip ${on ? "on" : ""}"><span onclick="DCCW.toggleExpSkill(${idx},'${attr(sk)}')">${esc(sk)}${on ? " ✓" : ""}</span><span class="dccw-i" title="Skill info" onclick="event.stopPropagation();DCCW.toggleInfo('${attr(sk)}')">i</span></span>`;
        }).join("") + `</div>`;
        h += e.skills.filter((sk) => W.info[sk]).map(skillDesc).join("");
        if ((slot.skills || []).length !== 2) h += `<p class="dccw-warn">Pick exactly 2 skills.</p>`;
      }
      h += `</div>`;
    });
    return h;
  }

  // ── step: stat points (Third-Floor+) ────────────────────────────────────────
  function renderStatPoints() {
    const budget = FLOOR_CFG[W.floor].statPoints;
    const remain = budget - statPointsSpent();
    const fin = finalStats();
    let h = `<h3>Distribute stat points</h3><p class="dccw-hint">Spend <b>${budget}</b> points across your stats (added to your Unenhanced scores). <b>${remain}</b> left.</p>`;
    h += `<div class="dccw-row">` + STAT_IDS.map((k) => {
      const pv = parseInt(W.statPoints[k], 10) || 0;
      return `<div class="dccw-statbox" style="flex:1;min-width:120px;">
        <div class="k">${STAT_ABBR[k]}</div><div class="v">${fin[k]}</div><div class="m">mod ${statMod(fin[k]) >= 0 ? "+" : ""}${statMod(fin[k])}</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:6px;">
          <button class="dccw-btn" style="padding:2px 10px;" onclick="DCCW.pt('${k}',-1)" ${pv <= 0 ? "disabled" : ""}>−</button>
          <span style="min-width:22px;">+${pv}</span>
          <button class="dccw-btn" style="padding:2px 10px;" onclick="DCCW.pt('${k}',1)" ${remain <= 0 ? "disabled" : ""}>+</button>
        </div></div>`;
    }).join("") + `</div>`;
    if (remain !== 0) h += `<p class="dccw-warn">Spend all ${budget} points (${remain} remaining) to continue.</p>`;
    return h;
  }

  // ── step: loot (Third-Floor+) ───────────────────────────────────────────────
  function renderLoot() {
    let h = `<h3>Acquired loot</h3><p class="dccw-hint">On the climb to Floor ${W.floor} you found starting gear. Pick one spread — you get a Weapon, Armor, an Item, and a Consumable at the tiers shown. The headline effects (armor DR, weapon skill bonus) are applied to your sheet; resolve the full options with your GM.</p>`;
    LOOT_ROWS.forEach((r) => {
      const on = String(W.loot) === String(r.row);
      h += `<div class="dccw-card" style="cursor:pointer;border-color:${on ? "#b82018" : "#2a2a2e"};" onclick="DCCW.setLoot('${r.row}')">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="dccw-i" style="border-color:${on ? "#b82018" : "#3a3a40"};color:${on ? "#f0a8a3" : "#8a8a93"};">${on ? "✓" : r.row}</span><b style="color:${on ? "#f0a8a3" : "#ece9e1"};">Spread ${r.row}</b></div>
        <ul class="dccw-list">
          <li><b>${r.weapon} Weapon</b> — ${esc(LOOT_WEAPON[r.weapon])}</li>
          <li><b>${r.armor} Armor</b> — ${esc(LOOT_ARMOR[r.armor])}</li>
          <li><b>${r.item} Item</b> — ${esc(LOOT_ITEM[r.item])}</li>
          <li><b>${r.consumable} Consumable</b> — ${esc(LOOT_CONS[r.consumable])}</li>
        </ul></div>`;
    });
    if (!W.loot) h += `<p class="dccw-warn">Pick a loot spread to continue.</p>`;
    return h;
  }

  // ── step: stats ───────────────────────────────────────────────────────────────
  function statsAssigned() {
    if (W.statMethod === "array") {
      const used = STAT_IDS.map((k) => W.statVals[k]).filter((v) => v !== "");
      return used.length === 5 && new Set(used).size === 5;
    }
    return STAT_IDS.every((k) => W.statVals[k] !== "");
  }
  const ZERO_MODS = { str: 0, int: 0, con: 0, dex: 0, cha: 0 };
  function finalStats() {
    // Racial stat mods only apply from the Third Floor on; on the tutorial floors
    // the crawler's race is flavor and grants nothing.
    const rmods = isThird() ? raceStatMods(raceByName(W.race)) : ZERO_MODS;
    const cmods = isThird() && W.class ? raceStatMods(classByName(W.class)) : ZERO_MODS;
    const pts = isThird() ? W.statPoints : ZERO_MODS;
    const out = {};
    STAT_IDS.forEach((k) => {
      // score = base + race mod + class mod + distributed points; the mod is derived, floor 1.
      out[k] = Math.max(1, baseStatVal(k) + (rmods[k] || 0) + (cmods[k] || 0) + (parseInt(pts[k], 10) || 0));
    });
    return out;
  }
  function renderStats() {
    const mods = isThird() ? raceStatMods(raceByName(W.race)) : ZERO_MODS;
    let assign;
    if (W.statMethod === "array") {
      assign = `<p class="dccw-hint">Assign the Standard Array — <b>6, 5, 4, 3, 2</b>. Pick a number that's already on another stat and the two <b>swap</b> automatically.</p>` +
        `<div class="dccw-row">` + STAT_IDS.map((k) => {
          const opts = ['<option value="">—</option>'].concat(STANDARD_ARRAY.map((v) =>
            `<option value="${v}" ${String(v) === W.statVals[k] ? "selected" : ""}>${v}</option>`)).join("");
          return `<div class="dccw-field" style="min-width:84px;flex:0 0 84px;"><label>${STAT_ABBR[k]}</label><select onchange="DCCW.setStat('${k}',this.value)">${opts}</select></div>`;
        }).join("") + `</div>`;
    } else {
      assign = `<p class="dccw-hint">Roll <b>1d6 per stat</b> (1s are re-rolled). <button class="dccw-btn" onclick="DCCW.rollStats()" style="padding:4px 10px;">🎲 Roll all</button></p>` +
        `<div class="dccw-row">` + STAT_IDS.map((k) =>
          `<div class="dccw-field" style="min-width:84px;flex:0 0 84px;"><label>${STAT_ABBR[k]}</label><input type="text" value="${esc(W.statVals[k])}" oninput="DCCW.setStat('${k}',this.value)" style="text-align:center;"></div>`
        ).join("") + `</div>`;
    }
    const fin = finalStats();
    // Per-stat breakdown makes the score↔mod relationship explicit (score = array + race; the mod is DERIVED from the score, never added to it).
    const grid = `<div class="dccw-statgrid" style="margin-top:8px;">` + STAT_IDS.map((k) => {
      const base = W.statVals[k] === "" ? 0 : parseInt(W.statVals[k], 10);
      const rm = mods[k] || 0;
      const brk = rm ? `${base} ${rm > 0 ? "+" : "−"} ${Math.abs(rm)}` : `${base}`;
      return `<div class="dccw-statbox"><div class="k">${STAT_ABBR[k]}</div><div class="v">${fin[k]}</div><div class="m">mod ${statMod(fin[k]) >= 0 ? "+" : ""}${statMod(fin[k])}</div><div class="brk">${brk}</div></div>`;
    }).join("") + `</div>`;
    return `
      <h3>Roll up your stats</h3>
      <div class="dccw-row"><div class="dccw-field"><label>Method</label><div class="dccw-seg">
        <button class="${W.statMethod === "array" ? "on" : ""}" onclick="DCCW.setStatMethod('array')">Standard Array</button>
        <button class="${W.statMethod === "roll" ? "on" : ""}" onclick="DCCW.setStatMethod('roll')">Roll 1d6</button>
      </div></div></div>
      ${assign}
      <p class="dccw-sub">Big number = your <b>Score</b>${isThird() ? ` (base + ${esc(W.race)} race + class mods, shown small)` : ""}. The <b>mod</b> is derived from the score — they aren't added together.</p>
      ${grid}
      <p class="dccw-sub" style="margin-top:10px;">Derived: <b>Health</b> ${statMod(fin.con) * 10} (10 × CON mod) · <b>Mana</b> ${fin.int} (= INT) · <b>Evade</b> d20 + DEX mod ${statMod(fin.dex)}</p>
      ${!statsAssigned() ? `<p class="dccw-warn">Assign a value to every stat to continue.</p>` : ""}`;
  }

  // ── step: background ──────────────────────────────────────────────────────────
  function skillChip(era, sk, on) {
    return `<span class="dccw-chip ${on ? "on" : ""}"><span onclick="DCCW.toggleBgSkill('${era}','${attr(sk)}')">${esc(sk)}${on ? " ✓" : ""}</span>` +
      `<span class="dccw-i" title="What does this skill do?" onclick="event.stopPropagation();DCCW.toggleInfo('${attr(sk)}')">i</span></span>`;
  }
  function skillDesc(sk) {
    const sd = skillByName(sk);
    const meta = sd ? [sd.category === "attack" ? "Attack" : "Utility", sd.stat || null, sd.passive ? "Passive" : null].filter(Boolean).join(" · ") : "";
    return `<div class="dccw-desc"><b>${esc(sk)}</b>${meta ? ` <span class="dccw-sub">(${esc(meta)})</span>` : ""}<br>${esc(sd ? sd.desc : "No description on file.")}</div>`;
  }
  function renderBackground() {
    let h = `<h3>Life before the Dungeon</h3><p class="dccw-hint">Four life stages. For each, pick a background (or write your own), then take <b>2</b> of its skills. Tap <span class="dccw-i" style="cursor:default;">i</span> to read a skill. Childhood &amp; Adolescence grant Rank 1, Hobby Rank 2, Career Rank 3.</p>`;
    ERAS.forEach((era) => {
      const list = bgByEra(era);
      const chosen = W.bg[era];
      const isCustom = chosen && chosen.custom;
      const sel = chosen ? (isCustom ? "__custom__" : chosen.base) : "";
      const bgOpts = ['<option value="">— choose —</option>']
        .concat(list.map((b) => `<option value="${attr(b.name)}" ${sel === b.name ? "selected" : ""}>${esc(b.name)}</option>`))
        .concat([`<option value="__custom__" ${sel === "__custom__" ? "selected" : ""}>✎ Custom…</option>`]).join("");
      h += `<div class="dccw-card"><div class="dccw-row" style="margin-bottom:6px;align-items:flex-end;">
        <div class="dccw-field"><label>${era} · Rank ${ERA_RANK[era]}</label><select onchange="DCCW.setBg('${era}',this.value)">${bgOpts}</select></div>`;
      if (chosen) {
        h += `<div class="dccw-field"><label>${isCustom ? "Custom name" : "Rename (optional)"}</label><input type="text" value="${esc(chosen.name)}" oninput="DCCW.setBgName('${era}',this.value)" placeholder="${isCustom ? "e.g. Feral Street Prophet" : esc(chosen.base)}"></div>`;
      }
      h += `</div>`;
      if (chosen) {
        const pool = isCustom ? eraSkillPool(era) : ((list.find((b) => b.name === chosen.base) || {}).skills || []);
        if (isCustom) h += `<p class="dccw-sub" style="margin-bottom:6px;">Pick any 2 skills from this life stage:</p>`;
        h += `<div>` + pool.map((sk) => skillChip(era, sk, (chosen.skills || []).includes(sk))).join("") + `</div>`;
        // descriptions for any skills toggled open that belong to this pool
        h += pool.filter((sk) => W.info[sk]).map(skillDesc).join("");
        if ((chosen.skills || []).length !== 2) h += `<p class="dccw-warn">Pick exactly 2 skills.</p>`;
      }
      h += `</div>`;
    });
    return h;
  }

  // ── step: combat ──────────────────────────────────────────────────────────────
  function renderCombat() {
    const fin = finalStats();
    const canSpell = fin.int >= 4;
    let h = `<h3>Combat training</h3><p class="dccw-hint">Every crawler starts with <b>Unarmed Combat at Rank 3</b>. Then choose one specialty at Rank 3. You can rename your pick for flavor.</p>`;
    h += `<div class="dccw-row"><div class="dccw-field"><label>Specialty</label><div class="dccw-seg">
      <button class="${W.combat.type === "weapon" ? "on" : ""}" onclick="DCCW.setCombatType('weapon')">Weapon Skill</button>
      <button class="${W.combat.type === "spell" ? "on" : ""}" onclick="DCCW.setCombatType('spell')">Attack Spell</button>
    </div></div></div>`;
    if (W.combat.type === "weapon") {
      const weapons = attackSkills();
      const groups = [...new Set(weapons.map((w) => w.group))];
      const wopts = ['<option value="">— choose a weapon skill —</option>'].concat(groups.map((g) =>
        `<optgroup label="${g}">` + weapons.filter((w) => w.group === g).map((w) =>
          `<option value="${attr(w.name)}" ${W.combat.weapon === w.name ? "selected" : ""}>${esc(w.name)} (${w.stat}, ${w.damage || "—"})</option>`).join("") + `</optgroup>`)).join("");
      h += `<div class="dccw-row">
        <div class="dccw-field"><label>Weapon Skill (Rank 3)</label><select onchange="DCCW.setCombat('weapon',this.value)">${wopts}</select></div>
        <div class="dccw-field"><label>Rename (optional)</label><input type="text" value="${esc(W.combat.weaponName)}" oninput="DCCW.setCombat('weaponName',this.value)" placeholder="${W.combat.weapon ? esc(W.combat.weapon) : "e.g. Grandpa's Axe"}"></div>
      </div>`;
      if (!W.combat.weapon) h += `<p class="dccw-warn">Choose a weapon skill to continue.</p>`;
    } else {
      const spells = basicSpells();
      const sopts = ['<option value="">— choose an attack spell —</option>'].concat(spells.map((s) =>
        `<option value="${attr(s.name)}" ${W.combat.spell === s.name ? "selected" : ""}>${esc(s.name)} (${s.mana} Mana, ${s.stat})</option>`)).join("");
      h += `<div class="dccw-row">
        <div class="dccw-field"><label>Attack Spell (Rank 3)</label><select onchange="DCCW.setCombat('spell',this.value)">${sopts}</select></div>
        <div class="dccw-field"><label>Rename (optional)</label><input type="text" value="${esc(W.combat.spellName)}" oninput="DCCW.setCombat('spellName',this.value)" placeholder="${W.combat.spell ? esc(W.combat.spell) : "e.g. Finger Guns"}"></div>
      </div>`;
      const chosen = spells.find((s) => s.name === W.combat.spell);
      if (chosen) h += `<div class="dccw-desc"><b>${esc(chosen.name)}</b> <span class="dccw-sub">(${chosen.mana} Mana · ${chosen.stat})</span><br>${esc(chosen.desc)}</div>`;
      h += `<p class="dccw-sub">A starting attack spell needs INT 4+ (you have ${fin.int}) and grants 5 Mana Potions. Basic options only at Level 1.</p>`;
      if (!canSpell) h += `<p class="dccw-warn">Your INT is under 4 — pick the Weapon Skill option instead, or raise INT.</p>`;
      else if (!W.combat.spell) h += `<p class="dccw-warn">Choose an attack spell to continue.</p>`;
    }
    h += `<p class="dccw-sub" style="margin-top:8px;">You also automatically know the <b>Heal</b> spell (Rank 1, 2 Mana, heals 2 Health Bar slots, usable as an Interrupt).</p>`;
    return h;
  }

  // ── step: story ───────────────────────────────────────────────────────────────
  function renderStory() {
    return `<h3>Baggage</h3><p class="dccw-hint">The dungeon loves a sob story. Jot a <b>Past Trauma</b>, a <b>Loose End</b>, and a <b>Regret</b> — a sentence each, or leave blank.</p>
      <div class="dccw-field" style="margin-bottom:12px;"><label>Past Trauma</label><textarea rows="2" oninput="DCCW.setStory('trauma',this.value)">${esc(W.story.trauma)}</textarea></div>
      <div class="dccw-field" style="margin-bottom:12px;"><label>Loose End</label><textarea rows="2" oninput="DCCW.setStory('loose',this.value)">${esc(W.story.loose)}</textarea></div>
      <div class="dccw-field"><label>Regret</label><textarea rows="2" oninput="DCCW.setStory('regret',this.value)">${esc(W.story.regret)}</textarea></div>`;
  }

  // ── step: gear ────────────────────────────────────────────────────────────────
  function initGear() {
    if (W.gearInit) return;
    if (!W.gear.clothes) W.gear.clothes = "The clothes on your back";
    if (!W.gear.weapon) W.gear.weapon = W.combat.type === "spell" ? "5 Mana Potions" : (combatDisplayName() || "Starting weapon");
    W.gearInit = true;
  }
  function renderGear() {
    initGear();
    return `<h3>What you walked in with</h3><p class="dccw-hint">Your starting kit: clothes, one genuinely useful item, some weird junk, and either your weapon or (for casters) 5 Mana Potions. The last box is for anything else your GM lets you start with — one item per line.</p>
      <div class="dccw-row">
        <div class="dccw-field"><label>Clothes</label><input type="text" value="${esc(W.gear.clothes)}" oninput="DCCW.setGear('clothes',this.value)"></div>
        <div class="dccw-field"><label>${W.combat.type === "spell" ? "Mana Potions" : "Starting weapon"}</label><input type="text" value="${esc(W.gear.weapon)}" oninput="DCCW.setGear('weapon',this.value)"></div>
      </div>
      <div class="dccw-row">
        <div class="dccw-field"><label>Useful item</label><input type="text" value="${esc(W.gear.useful)}" oninput="DCCW.setGear('useful',this.value)" placeholder="something handy"></div>
        <div class="dccw-field"><label>Weird junk</label><input type="text" value="${esc(W.gear.junk)}" oninput="DCCW.setGear('junk',this.value)" placeholder="whatever was in your pockets"></div>
      </div>
      <div class="dccw-field"><label>Additional items (GM-allowed, one per line)</label><textarea rows="4" oninput="DCCW.setGear('extra',this.value)" placeholder="one item per line">${esc(W.gear.extra)}</textarea></div>`;
  }

  // ── assembly ────────────────────────────────────────────────────────────────
  function combatDisplayName() {
    if (W.combat.type === "weapon") return (W.combat.weaponName || W.combat.weapon || "").trim();
    return (W.combat.spellName || W.combat.spell || "").trim();
  }
  function bgDisplayName(era) {
    const c = W.bg[era];
    if (!c) return era;
    return (c.name || c.base || (c.custom ? "Custom Background" : era)).trim();
  }
  function assembledSkills() {
    const rows = [];
    ERAS.forEach((era) => {
      const c = W.bg[era];
      if (!c) return;
      (c.skills || []).forEach((name) => {
        const sd = skillByName(name);
        rows.push({
          name, rank: String(ERA_RANK[era]),
          stat: skillStatLc(name),                                  // lowercase for the sheet select
          checkType: sd && sd.passive ? "Passive" : "Active",
          notes: era + " — " + bgDisplayName(era), checked: false,
        });
      });
    });
    rows.push({ name: "Heal", rank: "1", stat: "int", checkType: "Interrupt", notes: "Spell · heals 2 HB slots, 2 Mana", checked: false });
    return rows;
  }
  function assembledAttacks() {
    const atks = [{ name: "Unarmed Combat", rank: "3", dice: "1d4", stat: "str", effects: "" }];
    if (W.combat.type === "weapon" && W.combat.weapon) {
      const sd = skillByName(W.combat.weapon);
      const disp = combatDisplayName() || W.combat.weapon;
      const eff = disp !== W.combat.weapon ? W.combat.weapon + " skill" : "";
      atks.push({ name: disp, rank: "3", dice: sd && sd.damage ? sd.damage : "", stat: (sd && sd.stat ? String(sd.stat).toLowerCase() : "str"), effects: eff });
    } else if (W.combat.type === "spell" && W.combat.spell) {
      const sp = basicSpells().find((s) => s.name === W.combat.spell);
      const disp = combatDisplayName() || W.combat.spell;
      const eff = [sp ? sp.mana + " Mana" : "", disp !== W.combat.spell ? W.combat.spell : ""].filter(Boolean).join(" · ");
      atks.push({ name: disp + " (Spell)", rank: "3", dice: "", stat: (sp ? String(sp.stat).toLowerCase() : "int"), effects: eff });
    }
    return atks;
  }
  function gearItems() {
    const items = [];
    const add = (v) => { const t = String(v || "").trim(); if (t) items.push(t); };
    add(W.gear.clothes); add(W.gear.weapon); add(W.gear.useful); add(W.gear.junk);
    String(W.gear.extra || "").split("\n").forEach(add);
    return items;
  }

  // Skills + attacks with fast-forward rank boosts applied (Third-Floor+ only).
  // Rolls happen here, so only call at finish (never during render — it'd flicker).
  function buildSkillsAndAttacks() {
    const third = isThird();
    const b1 = () => (third ? d(4) : 0);           // +1d4
    const bP = () => (third ? d(4) + d(4) : 0);    // +2d4 to the primary attack
    const skillRank = {}; // key -> { name, rank, stat, checkType, notes }
    function addSkill(name, rank, note) {
      const key = String(name).toLowerCase();
      if (!skillRank[key]) {
        const sd = skillByName(name);
        skillRank[key] = { name, rank: 0, stat: skillStatLc(name), checkType: sd && sd.passive ? "Passive" : "Active", notes: "" };
      }
      skillRank[key].rank = Math.min(10, skillRank[key].rank + rank);
      if (note && skillRank[key].notes.indexOf(note) === -1) skillRank[key].notes = skillRank[key].notes ? skillRank[key].notes + "; " + note : note;
    }
    ERAS.forEach((era) => { const c = W.bg[era]; if (!c) return; (c.skills || []).forEach((name) => addSkill(name, ERA_RANK[era] + b1(), bgDisplayName(era))); });
    addSkill("Heal", 1, "Spell · heals 2 HB slots, 2 Mana");
    if (third) W.experiences.forEach((slot) => { const p = slot.skills || []; if (p[0]) addSkill(p[0], d(4), "Experience"); if (p[1]) addSkill(p[1], d(2), "Experience"); });
    const skills = Object.values(skillRank).map((s) => ({ name: s.name, rank: String(s.rank), stat: s.stat, checkType: s.checkType, notes: s.notes, checked: false }));

    const atks = [{ name: "Unarmed Combat", rank: String(Math.min(10, 3 + b1())), dice: "1d4", stat: "str", effects: "" }];
    if (W.combat.type === "weapon" && W.combat.weapon) {
      const sd = skillByName(W.combat.weapon), disp = combatDisplayName() || W.combat.weapon;
      atks.push({ name: disp, rank: String(Math.min(10, 3 + bP())), dice: sd && sd.damage ? sd.damage : "", stat: (sd && sd.stat ? String(sd.stat).toLowerCase() : "str"), effects: (disp !== W.combat.weapon ? W.combat.weapon + " skill" : "") });
    } else if (W.combat.type === "spell" && W.combat.spell) {
      const sp = basicSpells().find((s) => s.name === W.combat.spell), disp = combatDisplayName() || W.combat.spell;
      atks.push({ name: disp + " (Spell)", rank: String(Math.min(10, 3 + bP())), dice: "", stat: (sp ? String(sp.stat).toLowerCase() : "int"), effects: [sp ? sp.mana + " Mana" : "", disp !== W.combat.spell ? W.combat.spell : ""].filter(Boolean).join(" · ") });
    }
    // Loot: the tiered weapon adds Weapon-Skill ranks to the primary attack.
    if (third && W.loot && atks[1]) {
      const lr = LOOT_ROWS.find((r) => String(r.row) === String(W.loot));
      const bonus = lr ? (TIER_WEAPON_SKILL[lr.weapon] || 0) : 0;
      if (bonus) atks[1].rank = String(Math.min(10, (parseInt(atks[1].rank, 10) || 0) + bonus));
    }
    return { skills, atks };
  }

  // ── step: review ──────────────────────────────────────────────────────────────
  function renderReview() {
    const fin = finalStats();
    if (isUpgrade()) {
      const ex = W.existing || {};
      const name = (ex.header && ex.header["f-name"]) || "(unnamed)";
      const chosen = W.experiences.filter((s) => s.exp).map((s) => s.exp);
      const race = raceByName(W.race);
      return `<h3>Confirm the upgrade</h3>
        <div class="dccw-card"><b>${esc(name)}</b> → ${esc(W.race)}${W.class ? " " + esc(W.class) : ""} · Size ${race ? race.size + " (" + (SIZE_NAME[race.size] || "") + ")" : "—"} · <b>Level 10</b></div>
        <div class="dccw-statgrid">${STAT_IDS.map((k) => `<div class="dccw-statbox"><div class="k">${STAT_ABBR[k]}</div><div class="v">${fin[k]}</div><div class="m">mod ${statMod(fin[k]) >= 0 ? "+" : ""}${statMod(fin[k])}</div></div>`).join("")}</div>
        <p class="dccw-sub" style="margin-top:8px;">Health ${statMod(fin.con) * 10} · Mana ${fin.int} · Popularity ${statMod(fin.cha) * 2} · AI Favor 1d2 (rolled)</p>
        <div class="dccw-card" style="margin-top:12px;"><b>Layered on when you finish:</b><ul class="dccw-list">
          <li>Race + Class bonuses and 27 stat points (already in the scores above)</li>
          <li>${chosen.length} Experiences: ${esc(chosen.join(", ") || "—")}</li>
          <li>Loot spread ${esc(String(W.loot || "—"))} — armor DR, weapon skill, and items</li>
          <li>Skill boosts: primary attack +2d4, every other skill +1d4 (capped at Rank 10)</li>
        </ul></div>
        <p class="dccw-hint" style="margin-top:12px;">Your existing name, skills, gear and story are kept — this updates the sheet in place.</p>`;
    }
    const race = raceByName(W.race);
    const skills = assembledSkills(), atks = assembledAttacks();
    const dupWarn = (() => {
      const names = skills.map((s) => s.name.toLowerCase());
      const dups = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
      return dups.length ? `<p class="dccw-warn">Duplicate skills (${dups.join(", ")}) — that's allowed; the ranks stack.</p>` : "";
    })();
    const third = isThird();
    const cfg = third ? FLOOR_CFG[W.floor] : null;
    const level = third ? cfg.level : 1;
    let extra = "";
    if (third) {
      const chosen = W.experiences.filter((s) => s.exp).map((s) => s.exp);
      extra = `<div class="dccw-card"><b>Fast-forward — Floor ${W.floor}:</b><ul class="dccw-list">
        <li>Class: ${esc(W.class || "—")}</li>
        <li>${W.experiences.length} Experiences: ${esc(chosen.join(", ") || "—")}</li>
        <li>${cfg.statPoints} stat points distributed · Popularity ${statMod(fin.cha) * (W.floor - 1)}</li>
        <li>Loot spread ${esc(String(W.loot || "—"))}</li>
        <li>Skill &amp; attack ranks get their boosts on create (primary +2d4, others +1d4, plus Experience ranks).</li>
        ${W.floor > 3 ? `<li style="color:#e9b24c;">Then apply the Floor ${W.floor} extra boosts on the sheet (choose ${W.floor === 4 ? 6 : 8} skills, +2d2/+1d2).</li>` : ""}
      </ul></div>`;
    }
    return `<h3>Meet your crawler</h3>
      <div class="dccw-card"><b>${esc(W.basics.name || "(unnamed)")}</b> · ${esc(W.race)}${third && W.class ? " " + esc(W.class) : ""} · Size ${(() => { const sn = third ? (race ? race.size : 4) : 4; return sn + " (" + (SIZE_NAME[sn] || "") + ")"; })()} · Level ${level} · Crawler #${esc(W.basics.crawler)}${W.basics.gender ? " · " + esc(W.basics.gender) : ""}</div>
      <div class="dccw-statgrid">${STAT_IDS.map((k) => `<div class="dccw-statbox"><div class="k">${STAT_ABBR[k]}</div><div class="v">${fin[k]}</div><div class="m">mod ${statMod(fin[k]) >= 0 ? "+" : ""}${statMod(fin[k])}</div></div>`).join("")}</div>
      <p class="dccw-sub" style="margin-top:8px;">Health ${statMod(fin.con) * 10} · Mana ${fin.int} · Evade d20+${statMod(fin.dex)} · AI Favor ${third ? "1d2 (rolled)" : "1"}</p>
      ${extra}
      <div class="dccw-card" style="margin-top:12px;"><b>Attacks:</b><ul class="dccw-list">${atks.map((a) => `<li>${esc(a.name)} — ${esc(a.dice || "—")} ${a.stat ? esc(a.stat.toUpperCase()) : ""}${third ? "" : " · Rank " + esc(a.rank)}</li>`).join("")}</ul></div>
      <div class="dccw-card"><b>Skills${third ? " (before boosts)" : ""}:</b><ul class="dccw-list">${skills.map((s) => `<li>${esc(s.name)} — Rank ${esc(s.rank)}${s.stat ? " (" + esc(s.stat.toUpperCase()) + ")" : ""}</li>`).join("")}</ul></div>
      ${dupWarn}
      <p class="dccw-hint" style="margin-top:12px;">Creating will <b>overwrite the current sheet</b>. Export first if you want to keep it.</p>`;
  }

  // ── validation ────────────────────────────────────────────────────────────────
  function canAdvance() {
    const key = steps()[W.step].key;
    if (key === "race") return isThird() ? !!W.race : true;
    if (key === "class") return !!W.class;
    if (key === "stats") return statsAssigned();
    if (key === "background") return ERAS.every((e) => W.bg[e] && (W.bg[e].skills || []).length === 2);
    if (key === "combat") return W.combat.type === "weapon" ? !!W.combat.weapon : (finalStats().int >= 4 && !!W.combat.spell);
    if (key === "experiences") { ensureExpSlots(); return W.experiences.every((s) => s.exp && (s.skills || []).length === 2); }
    if (key === "statpoints") return statPointsSpent() === FLOOR_CFG[W.floor].statPoints;
    if (key === "loot") return !!W.loot;
    return true;
  }

  // ── build final data + apply ────────────────────────────────────────────────────
  function buildData() {
    initGear(); // ensure clothes + weapon boxes have their defaults even if never rendered
    const third = isThird();
    const cfg = third ? FLOOR_CFG[W.floor] : null;
    const fin = finalStats();
    const race = raceByName(W.race);
    const { skills, atks } = buildSkillsAndAttacks();
    const data = {};
    data.header = { "f-name": W.basics.name, "f-race": W.race, "f-gender": W.basics.gender, "f-level": third ? String(cfg.level) : "1", "f-crawler": W.basics.crawler, "f-class": third ? W.class : "" };
    data.stats = {};
    STAT_IDS.forEach((k) => { data.stats[k] = { enh: String(fin[k]), unenh: String(fin[k]) }; });
    // AI Favor: 1 fresh; 1d2 (+weapon/spell AI-Favor bonus) on the fast-forward.
    let aiFavor = 1;
    if (third) {
      aiFavor = d(2);
      if (W.combat.type === "spell") { const sp = basicSpells().find((s) => s.name === W.combat.spell); const rt = sp && sp.aiFavor ? sp.aiFavor : 0; if (rt === 1) aiFavor += d(2); else if (rt === 2) aiFavor += d(2) + d(2); }
    }
    // Armor DR from the chosen loot spread.
    let drArmor = "";
    if (third && W.loot) { const lr = LOOT_ROWS.find((r) => String(r.row) === String(W.loot)); if (lr) drArmor = String(TIER_DR[lr.armor] || ""); }
    data.combat = {
      evadeBuffs: "", evadeMove: "20", evadeStep: "10", drArmor: drArmor, drBuffs: "",
      drAiFavor: String(aiFavor),                    // AI Favor -> its own box, not notes
      drSize: third ? (race ? String(race.size) : "4") : "4", // race Size at Floor 3+; tutorial = Medium (4)
      manaCurrentVal: String(fin.int), debuffs: "",
    };
    data.hpPips = new Array(10).fill("true");
    data.attacks = atks;
    const hot = ["Heal — 2 Mana: heal 2 HB slots (Interrupt)"];
    if (W.combat.type === "spell" && W.combat.spell) hot.push(combatDisplayName() + " — attack spell", "Mana Potion ×5");
    data.hotlist = hot;
    data.extBuffs = [];
    data.gear = [];
    data.accessories = [];
    data.skills = skills;
    // Inventory: the gear boxes, plus the four loot items on the fast-forward.
    const inv = gearItems().map((item) => ({ item, qty: "1", notes: "" }));
    if (third && W.loot) {
      const lr = LOOT_ROWS.find((r) => String(r.row) === String(W.loot));
      if (lr) {
        inv.push({ item: lr.weapon + " Weapon", qty: "1", notes: LOOT_WEAPON[lr.weapon] });
        inv.push({ item: lr.armor + " Armor", qty: "1", notes: LOOT_ARMOR[lr.armor] });
        inv.push({ item: lr.item + " Item", qty: "1", notes: LOOT_ITEM[lr.item] });
        inv.push({ item: lr.consumable + " Consumable", qty: "1", notes: LOOT_CONS[lr.consumable] });
      }
    }
    data.inventory = inv;
    const popularity = third ? String(statMod(fin.cha) * (W.floor - 1)) : "";
    const notes = third
      ? `Created with the Crawler Wizard — Floor ${W.floor}, Level ${cfg.level}, Class ${W.class}. Skill ranks include the fast-forward boosts (primary +2d4, others +1d4) and Experience ranks.` +
        (W.floor > 3 ? ` Still to apply on the sheet: the Floor ${W.floor} extra skill boosts (choose ${W.floor === 4 ? 6 : 8} skills, +2d2 if Rank ≤4 else +1d2).` : "") +
        (W.combat.type === "spell" ? " Started with an attack spell (+5 Mana Potions)." : "")
      : `Created with the Crawler Wizard. Knows Heal (Rank 1, 2 Mana, heal 2 slots, Interrupt).` +
        (W.combat.type === "spell" ? " Started with an attack spell (+5 Mana Potions)." : "");
    data.background = [popularity, W.story.trauma, W.story.loose, W.story.regret, notes];  // [Popularity, Trauma, Loose, Regret, Notes]
    data.campaign = (typeof _campaign !== "undefined" && _campaign) ? { id: _campaign.id, code: _campaign.code, name: _campaign.name } : null;
    return data;
  }

  // Upgrade an existing crawler to Floor 3: keep everything, layer on race/class
  // bonuses, +27 points, skill boosts, experiences and loot.
  function buildUpgradeData() {
    const ex = W.existing || {};
    const fin = finalStats(); // existing Unenhanced + race + class + points
    const race = raceByName(W.race);
    const data = {
      header: Object.assign({}, ex.header || {}),
      stats: {},
      globalModSource: ex.globalModSource,
      combat: Object.assign({}, ex.combat || {}),
      hpPips: (ex.hpPips || new Array(10).fill("true")).slice(),
      attacks: (ex.attacks || []).map((a) => Object.assign({}, a)),
      hotlist: (ex.hotlist || []).slice(),
      extBuffs: (ex.extBuffs || []).slice(),
      gear: (ex.gear || []).slice(),
      accessories: (ex.accessories || []).slice(),
      skills: (ex.skills || []).map((s) => Object.assign({}, s)),
      inventory: (ex.inventory || []).map((i) => Object.assign({}, i)),
      background: (ex.background || ["", "", "", "", ""]).slice(),
      campaign: ex.campaign || null,
      darkMode: ex.darkMode,
    };
    data.header["f-level"] = "10";
    data.header["f-race"] = W.race;
    data.header["f-class"] = W.class;
    // stats: unenh = new score; enh preserves any existing gear/buff delta.
    STAT_IDS.forEach((k) => {
      const oe = parseInt(ex.stats && ex.stats[k] ? ex.stats[k].enh : 0, 10) || 0;
      const ou = parseInt(ex.stats && ex.stats[k] ? ex.stats[k].unenh : 0, 10) || 0;
      data.stats[k] = { unenh: String(fin[k]), enh: String(fin[k] + (oe - ou)) };
    });
    if (race) data.combat.drSize = String(race.size);
    data.combat.manaCurrentVal = String(fin.int);
    data.combat.drAiFavor = String(d(2)); // 1d2 at Floor 3 (weapon/spell bonus is left for the player)
    const lr = W.loot ? LOOT_ROWS.find((r) => String(r.row) === String(W.loot)) : null;
    if (lr) data.combat.drArmor = String(((parseInt(ex.combat && ex.combat.drArmor, 10) || 0)) + (TIER_DR[lr.armor] || 0));

    // Attacks: the first non-Unarmed attack is the primary (+2d4); Unarmed and any
    // others get +1d4. All capped at Rank 10.
    let primaryDone = false;
    data.attacks = data.attacks.map((a) => {
      const unarmed = /unarmed/i.test(a.name || "");
      let boost;
      if (!unarmed && !primaryDone) { boost = d(4) + d(4); primaryDone = true; } else boost = d(4);
      return Object.assign({}, a, { rank: String(Math.min(10, (parseInt(a.rank, 10) || 0) + boost)) });
    });
    if (lr) { const pi = data.attacks.findIndex((a) => !/unarmed/i.test(a.name || "")); if (pi >= 0) { const b = TIER_WEAPON_SKILL[lr.weapon] || 0; if (b) data.attacks[pi].rank = String(Math.min(10, (parseInt(data.attacks[pi].rank, 10) || 0) + b)); } }

    // Skills: every existing skill +1d4; then fold in the Experience skills.
    data.skills = data.skills.map((s) => Object.assign({}, s, { rank: String(Math.min(10, (parseInt(s.rank, 10) || 0) + d(4))) }));
    const skMap = {};
    data.skills.forEach((s, i) => { if (s.name) skMap[s.name.toLowerCase()] = i; });
    W.experiences.forEach((slot) => {
      (slot.skills || []).forEach((name, idx) => {
        if (!name) return;
        const add = idx === 0 ? d(4) : d(2);
        const key = name.toLowerCase();
        if (skMap[key] !== undefined) {
          const row = data.skills[skMap[key]];
          row.rank = String(Math.min(10, (parseInt(row.rank, 10) || 0) + add));
        } else {
          const sd = skillByName(name);
          data.skills.push({ name, rank: String(Math.min(10, add)), stat: skillStatLc(name), checkType: sd && sd.passive ? "Passive" : "Active", notes: "Experience", checked: false });
          skMap[key] = data.skills.length - 1;
        }
      });
    });
    if (lr) {
      data.inventory.push({ item: lr.weapon + " Weapon", qty: "1", notes: LOOT_WEAPON[lr.weapon] });
      data.inventory.push({ item: lr.armor + " Armor", qty: "1", notes: LOOT_ARMOR[lr.armor] });
      data.inventory.push({ item: lr.item + " Item", qty: "1", notes: LOOT_ITEM[lr.item] });
      data.inventory.push({ item: lr.consumable + " Consumable", qty: "1", notes: LOOT_CONS[lr.consumable] });
    }
    data.background[0] = String(statMod(fin.cha) * 2); // Popularity = CHA mod × 2 at Floor 3
    const note = `Upgraded to Floor 3 (Level 10): race ${W.race}, class ${W.class}, +27 stat points, +${W.experiences.length} experiences, loot, skill boosts (primary +2d4, others +1d4).`;
    data.background[4] = data.background[4] ? data.background[4] + " | " + note : note;
    return data;
  }

  function finish() {
    if (typeof applySheet !== "function" || typeof saveSheet !== "function") {
      alert("Couldn't reach the sheet to apply the character. Try reloading.");
      return;
    }
    const upgrade = isUpgrade();
    applySheet(upgrade ? buildUpgradeData() : buildData());
    saveSheet();
    try {
      if (typeof addLog === "function") {
        if (upgrade) addLog("Level Up", "⬆ Floor 3", ((W.existing && W.existing.header && W.existing.header["f-name"]) || "Crawler") + " → Lvl 10", "normal");
        else addLog("New Character", "✨ Wizard", (W.basics.name || "Crawler") + " · " + W.race, "normal");
      }
    } catch (e) {}
    close();
  }

  // ── public API ────────────────────────────────────────────────────────────────
  const API = {
    open, openUpgrade, close, finish,
    back() { if (W.step > 0) { W.step--; render(); } },
    next() { if (!canAdvance()) { render(); return; } W.step++; render(); },
    set(key, val) { W[key] = val; render(); },
    setBasic(k, v) { W.basics[k] = v; },
    rollCrawler() { W.basics.crawler = String(500000 + Math.floor(Math.random() * 12400000)); render(); },
    setRace(v) { W.race = v; render(); },
    setRaceText(v) { W.race = v; }, // tutorial free-text race — no re-render (keeps input focus)
    setStatMethod(m) { W.statMethod = m; STAT_IDS.forEach((k) => (W.statVals[k] = "")); if (m === "roll") STAT_IDS.forEach((k) => (W.statVals[k] = String(rollStat()))); render(); },
    setStat(k, v) {
      if (W.statMethod === "array" && v !== "") {
        // swap: if another stat already holds v, give it whatever k had
        const other = STAT_IDS.find((o) => o !== k && W.statVals[o] === v);
        if (other) W.statVals[other] = W.statVals[k];
      }
      W.statVals[k] = v;
      render();
    },
    rollStats() { STAT_IDS.forEach((k) => (W.statVals[k] = String(rollStat()))); render(); },
    setBg(era, v) {
      if (!v) { delete W.bg[era]; }
      else if (v === "__custom__") { W.bg[era] = { base: null, custom: true, name: "", skills: [] }; }
      else { W.bg[era] = { base: v, custom: false, name: v, skills: [] }; }
      render();
    },
    setBgName(era, v) { if (W.bg[era]) W.bg[era].name = v; },
    toggleBgSkill(era, sk) {
      const c = W.bg[era]; if (!c) return;
      c.skills = c.skills || [];
      const i = c.skills.indexOf(sk);
      if (i >= 0) c.skills.splice(i, 1);
      else if (c.skills.length < 2) c.skills.push(sk);
      render();
    },
    toggleInfo(sk) { W.info[sk] = !W.info[sk]; render(); },
    setCombatType(t) { W.combat.type = t; render(); },
    setCombat(k, v) { W.combat[k] = v; if (k === "weapon" || k === "spell") render(); },
    setStory(k, v) { W.story[k] = v; },
    setGear(k, v) { W.gear[k] = v; },
    // Third-Floor+ ------------------------------------------------------------
    setPath(p) { W.path = p; clampStep(); render(); },
    setFloor(f) { W.floor = f; W.experiences = []; render(); },
    setClass(v) { W.class = v; render(); },
    setExp(idx, name) { if (W.experiences[idx]) { W.experiences[idx] = { exp: name, skills: [] }; render(); } },
    toggleExpSkill(idx, sk) {
      const slot = W.experiences[idx]; if (!slot) return;
      slot.skills = slot.skills || [];
      const i = slot.skills.indexOf(sk);
      if (i >= 0) slot.skills.splice(i, 1);
      else if (slot.skills.length < 2) slot.skills.push(sk);
      render();
    },
    pt(k, delta) {
      const budget = FLOOR_CFG[W.floor].statPoints;
      const cur = parseInt(W.statPoints[k], 10) || 0;
      let nv = cur + delta;
      if (nv < 0) nv = 0;
      const others = statPointsSpent() - cur;
      if (others + nv > budget) nv = budget - others;
      W.statPoints[k] = nv;
      render();
    },
    setLoot(row) { W.loot = String(row); render(); },
  };

  window.DCCW = API;
  window.startCharWizard = open;
})();
