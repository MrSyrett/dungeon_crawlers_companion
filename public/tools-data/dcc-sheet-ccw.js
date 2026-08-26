// Dungeon Crawler Carl — Character Creation Wizard
// Loaded by tools/templates/dcc_character_sheet.html as <script src>.
//
// Produces a complete `data` object in the shape collectSheet() emits and hands
// it to the sheet via applySheet(data) + saveSheet(). Reads the DCC data layer
// globals (DCC_RACES, DCC_SKILLS, DCC_BACKGROUNDS, DCC_SPELLS, DCC_TABLES) that
// the sheet also loads from /tools-data/dcc-*.js.
//
// Scope: the tutorial-floor "First Steps" path — a Level-1 crawler. The
// "Third Floor & Beyond" fast-forward (Level 10/20/30 + Experiences) is the next
// increment; the path fork is present and routes there with a note.
//
// Rules refs (Core Rulebook): character creation pp. 100-115; stat mods Table 2
// (p. 57); background tables 12-15 (pp. 104-106); combat training pp. 108-109.

(function () {
  "use strict";

  // ── data-layer availability ────────────────────────────────────────────────
  function haveData() {
    return typeof DCC_RACES !== "undefined" && typeof DCC_SKILLS !== "undefined" &&
      typeof DCC_BACKGROUNDS !== "undefined" && typeof DCC_TABLES !== "undefined";
  }

  // ── small helpers ──────────────────────────────────────────────────────────
  const ERAS = ["Childhood", "Adolescence", "Career", "Hobby"];
  const STAT_IDS = ["str", "int", "con", "dex", "cha"];
  const STAT_ABBR = { str: "STR", int: "INT", con: "CON", dex: "DEX", cha: "CHA" };
  const STAT_NAME_TO_ID = { strength: "str", intelligence: "int", constitution: "con", dexterity: "dex", charisma: "cha" };
  const STANDARD_ARRAY = [6, 5, 4, 3, 2];

  const d = (n) => Math.floor(Math.random() * n) + 1;
  function rollStat() { let r = d(6); while (r === 1) r = d(6); return r; } // reroll 1s
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const shuffle = (a) => { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  // Stat modifier from a stat score (Core Table 2, p.57).
  function statMod(v) {
    v = parseInt(v, 10) || 0;
    if (v <= 0) return 0;
    if (v <= 2) return 1; if (v <= 5) return 2; if (v <= 9) return 3; if (v <= 19) return 4;
    if (v <= 49) return 5; if (v <= 99) return 6; if (v <= 149) return 7; if (v <= 199) return 8;
    if (v <= 299) return 9; return 10;
  }

  // Parse a race's grant bullets into per-stat modifiers (e.g. "+2 to all Stats",
  // "+3 Dexterity and Charisma", "-3 Strength").
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
  // Weapon-skill choices for a (human) crawler: attack skills minus the passive
  // Damage Effects and the Animal/Pet Strike natural attacks (animal-crawler only).
  function attackSkills() { return (typeof DCC_SKILLS !== "undefined" ? DCC_SKILLS : []).filter((s) => s.category === "attack" && s.group !== "Damage Effect" && s.group !== "Animal/Pet Strike"); }
  function attackSpells() { return (typeof DCC_SPELLS !== "undefined" ? DCC_SPELLS : []).filter((s) => s.type === "attack"); }
  function bgByEra(era) { return (typeof DCC_BACKGROUNDS !== "undefined" ? DCC_BACKGROUNDS : []).filter((b) => b.era === era); }
  const ERA_RANK = { Childhood: 1, Adolescence: 1, Career: 3, Hobby: 2 };

  // ── wizard state ────────────────────────────────────────────────────────────
  let W = null;
  function freshState() {
    return {
      step: 0,
      mode: "guided", // 'guided' | 'random'
      path: "tutorial", // 'tutorial' (First Steps) | 'thirdfloor' (fast-forward, WIP)
      basics: { name: "", gender: "", race: "Human", crawler: String(500000 + Math.floor(Math.random() * 12400000)) },
      statMethod: "array", // 'array' | 'roll'
      statVals: { str: "", int: "", con: "", dex: "", cha: "" }, // base (pre-race)
      bg: {}, // { era: { name, skills:[...] } }
      combat: { type: "weapon", weapon: "", spell: "", effect: "" },
      story: { trauma: "", loose: "", regret: "" },
      gear: "",
    };
  }

  // ── steps (tutorial path) ────────────────────────────────────────────────────
  const STEPS = [
    { key: "basics", title: "Basics" },
    { key: "stats", title: "Stats" },
    { key: "background", title: "Background" },
    { key: "combat", title: "Combat Training" },
    { key: "story", title: "Story" },
    { key: "gear", title: "Gear" },
    { key: "review", title: "Review" },
  ];

  // ── CSS (injected once) ──────────────────────────────────────────────────────
  function injectCss() {
    if (document.getElementById("dccw-css")) return;
    const st = document.createElement("style");
    st.id = "dccw-css";
    st.textContent = `
    .dccw-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto;}
    .dccw-modal{background:#141416;color:#ece9e1;border:1px solid #2a2a2e;border-radius:12px;max-width:720px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.5);font-family:inherit;}
    .dccw-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid #2a2a2e;}
    .dccw-title{font-weight:800;font-size:18px;letter-spacing:.02em;text-transform:uppercase;color:#fff;margin:0;}
    .dccw-x{background:transparent;border:1px solid #333;color:#888;border-radius:6px;width:30px;height:30px;cursor:pointer;font-size:16px;line-height:1;}
    .dccw-x:hover{border-color:#b82018;color:#f0a8a3;}
    .dccw-steps{display:flex;flex-wrap:wrap;gap:6px;padding:12px 20px;border-bottom:1px solid #2a2a2e;}
    .dccw-pip{font-size:10px;text-transform:uppercase;letter-spacing:.1em;padding:4px 8px;border-radius:5px;border:1px solid #2a2a2e;color:#8a8a93;}
    .dccw-pip.on{border-color:#b82018;color:#f0a8a3;background:#1c1516;}
    .dccw-pip.done{color:#ece9e1;}
    .dccw-body{padding:20px;min-height:220px;}
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
    .dccw-chip{display:inline-block;border:1px solid #2a2a2e;border-radius:20px;padding:4px 12px;font-size:12px;color:#8a8a93;cursor:pointer;margin:0 6px 6px 0;}
    .dccw-chip.on{border-color:#b82018;color:#f0a8a3;background:#1c1516;}
    .dccw-card{border:1px solid #2a2a2e;border-radius:8px;padding:12px;margin-bottom:10px;}
    .dccw-statgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;text-align:center;}
    .dccw-statbox{border:1px solid #2a2a2e;border-radius:7px;padding:8px 4px;}
    .dccw-statbox .k{font-size:10px;letter-spacing:.1em;color:#8a8a93;text-transform:uppercase;}
    .dccw-statbox .v{font-size:20px;font-weight:800;color:#fff;}
    .dccw-statbox .m{font-size:11px;color:#8a8a93;}
    .dccw-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 20px;border-top:1px solid #2a2a2e;}
    .dccw-btn{background:#0e0e10;border:1px solid #2a2a2e;color:#ece9e1;border-radius:7px;padding:9px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;cursor:pointer;}
    .dccw-btn:hover{border-color:#555;}
    .dccw-btn.primary{background:#b82018;border-color:#b82018;color:#fff;}
    .dccw-btn.primary:hover{background:#d0281e;}
    .dccw-btn:disabled{opacity:.4;cursor:not-allowed;}
    .dccw-warn{color:#e9b24c;font-size:12px;margin-top:8px;}
    .dccw-sub{color:#8a8a93;font-size:11px;}
    .dccw-list{margin:6px 0 0;padding-left:16px;color:#c9c9cf;font-size:13px;line-height:1.6;}
    .dccw-launch{background:transparent;border:1px solid #b82018;color:#f0a8a3;}
    .dccw-launch:hover{background:#1c1516;}
    `;
    document.head.appendChild(st);
  }

  // ── open / close ──────────────────────────────────────────────────────────────
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
  function close() { const ov = document.getElementById("dccw-overlay"); if (ov) ov.style.display = "none"; W = null; }

  // ── render ────────────────────────────────────────────────────────────────────
  function render() {
    const ov = document.getElementById("dccw-overlay");
    if (!ov || !W) return;
    const s = STEPS[W.step];
    let body = "";
    if (s.key === "basics") body = renderBasics();
    else if (s.key === "stats") body = renderStats();
    else if (s.key === "background") body = renderBackground();
    else if (s.key === "combat") body = renderCombat();
    else if (s.key === "story") body = renderStory();
    else if (s.key === "gear") body = renderGear();
    else if (s.key === "review") body = renderReview();

    const pips = STEPS.map((st, i) =>
      `<span class="dccw-pip ${i === W.step ? "on" : i < W.step ? "done" : ""}">${i + 1}. ${st.title}</span>`
    ).join("");

    const last = W.step === STEPS.length - 1;
    ov.innerHTML = `
      <div class="dccw-modal" role="dialog" aria-label="Character Creation Wizard">
        <div class="dccw-head">
          <h2 class="dccw-title">Crawler Creation</h2>
          <button class="dccw-x" onclick="DCCW.close()" aria-label="Close">✕</button>
        </div>
        <div class="dccw-steps">${pips}</div>
        <div class="dccw-body">${body}</div>
        <div class="dccw-foot">
          <button class="dccw-btn" onclick="DCCW.back()" ${W.step === 0 ? "disabled" : ""}>← Back</button>
          <div style="display:flex;gap:8px;">
            ${last
        ? `<button class="dccw-btn primary" onclick="DCCW.finish()">✓ Create Character</button>`
        : `<button class="dccw-btn primary" onclick="DCCW.next()">Next →</button>`}
          </div>
        </div>
      </div>`;
  }

  // ── step: basics ──────────────────────────────────────────────────────────────
  function renderBasics() {
    const races = DCC_RACES.slice().sort((a, b) => a.name.localeCompare(b.name));
    const opts = races.map((r) => `<option value="${esc(r.name)}" ${r.name === W.basics.race ? "selected" : ""}>${esc(r.name)} (${r.group})</option>`).join("");
    return `
      <h3>Who's the crawler?</h3>
      <p class="dccw-hint">Fill in the basics. <b>Mode</b> sets how the rest of the wizard works: <b>Guided</b> lets you pick everything; <b>Random</b> rolls each step for you (you can still tweak it).</p>
      <div class="dccw-row">
        <div class="dccw-field"><label>Mode</label>
          <div class="dccw-seg">
            <button class="${W.mode === "guided" ? "on" : ""}" onclick="DCCW.set('mode','guided')">Guided</button>
            <button class="${W.mode === "random" ? "on" : ""}" onclick="DCCW.set('mode','random')">Random</button>
          </div>
        </div>
        <div class="dccw-field"><label>Starting point</label>
          <div class="dccw-seg">
            <button class="${W.path === "tutorial" ? "on" : ""}" onclick="DCCW.set('path','tutorial')">Tutorial (Lvl 1)</button>
            <button class="${W.path === "thirdfloor" ? "on" : ""}" onclick="DCCW.set('path','thirdfloor')">Third Floor+</button>
          </div>
        </div>
      </div>
      ${W.path === "thirdfloor" ? `<p class="dccw-warn">The Third-Floor fast-forward (start at Level 10/20/30 with Experiences) is coming in the next update. For now the wizard builds a Level-1 tutorial crawler — you can level it up afterward. Switch back to <b>Tutorial</b> to continue.</p>` : ""}
      <div class="dccw-row" style="margin-top:6px;">
        <div class="dccw-field"><label>Name</label><input type="text" value="${esc(W.basics.name)}" oninput="DCCW.setBasic('name',this.value)" placeholder="Crawler name"></div>
        <div class="dccw-field"><label>Gender / Pronouns (optional)</label><input type="text" value="${esc(W.basics.gender)}" oninput="DCCW.setBasic('gender',this.value)" placeholder="optional"></div>
      </div>
      <div class="dccw-row">
        <div class="dccw-field"><label>Race</label><select onchange="DCCW.setBasic('race',this.value)">${opts}</select></div>
        <div class="dccw-field"><label>Crawler #</label>
          <div style="display:flex;gap:6px;"><input type="text" value="${esc(W.basics.crawler)}" oninput="DCCW.setBasic('crawler',this.value)"><button class="dccw-btn" onclick="DCCW.rollCrawler()" title="Roll a new number">🎲</button></div>
        </div>
      </div>
      <p class="dccw-sub">Race grants (applied to your stats next): ${esc((raceByName(W.basics.race) || { grants: [] }).grants.slice(0, 4).join(" · ")) || "—"}</p>`;
  }

  // ── step: stats ───────────────────────────────────────────────────────────────
  function baseTotalsValid() {
    if (W.statMethod === "array") {
      const used = STAT_IDS.map((k) => W.statVals[k]).filter((v) => v !== "");
      return used.length === 5 && new Set(used).size === 5;
    }
    return STAT_IDS.every((k) => W.statVals[k] !== "");
  }
  function finalStats() {
    const mods = raceStatMods(raceByName(W.basics.race));
    const out = {};
    STAT_IDS.forEach((k) => {
      const base = parseInt(W.statVals[k], 10);
      const val = (isNaN(base) ? 0 : base) + (mods[k] || 0);
      out[k] = Math.max(1, val); // stats floor at 1
    });
    return out;
  }
  function renderStats() {
    const mods = raceStatMods(raceByName(W.basics.race));
    const modLine = STAT_IDS.filter((k) => mods[k]).map((k) => `${STAT_ABBR[k]} ${mods[k] > 0 ? "+" : ""}${mods[k]}`).join(", ") || "none";
    let assign = "";
    if (W.statMethod === "array") {
      assign = `<p class="dccw-hint">Assign the Standard Array — <b>6, 5, 4, 3, 2</b> — one value per stat.</p>` +
        `<div class="dccw-row">` + STAT_IDS.map((k) => {
          const usedElsewhere = STAT_IDS.filter((o) => o !== k).map((o) => W.statVals[o]);
          const opts = ['<option value="">—</option>'].concat(STANDARD_ARRAY.map((v) => {
            const disabled = usedElsewhere.includes(String(v)) ? "disabled" : "";
            return `<option value="${v}" ${String(v) === W.statVals[k] ? "selected" : ""} ${disabled}>${v}</option>`;
          })).join("");
          return `<div class="dccw-field" style="min-width:90px;flex:0 0 90px;"><label>${STAT_ABBR[k]}</label><select onchange="DCCW.setStat('${k}',this.value)">${opts}</select></div>`;
        }).join("") + `</div>`;
    } else {
      assign = `<p class="dccw-hint">Rolled <b>1d6 per stat</b> (1s re-rolled). <button class="dccw-btn" onclick="DCCW.rollStats()" style="padding:4px 10px;">🎲 Re-roll all</button></p>` +
        `<div class="dccw-row">` + STAT_IDS.map((k) =>
          `<div class="dccw-field" style="min-width:90px;flex:0 0 90px;"><label>${STAT_ABBR[k]}</label><input type="text" value="${esc(W.statVals[k])}" oninput="DCCW.setStat('${k}',this.value)" style="text-align:center;"></div>`
        ).join("") + `</div>`;
    }
    const fin = finalStats();
    const preview = `<div class="dccw-statgrid" style="margin-top:8px;">` + STAT_IDS.map((k) =>
      `<div class="dccw-statbox"><div class="k">${STAT_ABBR[k]}</div><div class="v">${fin[k]}</div><div class="m">${statMod(fin[k]) >= 0 ? "+" : ""}${statMod(fin[k])}</div></div>`
    ).join("") + `</div>`;
    const health = statMod(fin.con) * 10, mana = fin.int;
    return `
      <h3>Roll up your stats</h3>
      <div class="dccw-row">
        <div class="dccw-field"><label>Method</label>
          <div class="dccw-seg">
            <button class="${W.statMethod === "array" ? "on" : ""}" onclick="DCCW.setStatMethod('array')">Standard Array</button>
            <button class="${W.statMethod === "roll" ? "on" : ""}" onclick="DCCW.setStatMethod('roll')">Roll 1d6</button>
          </div>
        </div>
      </div>
      ${assign}
      <p class="dccw-sub">Race modifiers (${esc(W.basics.race)}): ${modLine}. Values below are your <b>Unenhanced</b> stats.</p>
      ${preview}
      <p class="dccw-sub" style="margin-top:10px;">Derived: <b>Health</b> ${health} (10 slots × CON mod ${statMod(fin.con)}) · <b>Mana</b> ${mana} (= INT) · <b>Evade</b> d20 + DEX mod ${statMod(fin.dex)}</p>
      ${!baseTotalsValid() ? `<p class="dccw-warn">Assign a value to every stat to continue.</p>` : ""}`;
  }

  // ── step: background ──────────────────────────────────────────────────────────
  function renderBackground() {
    let h = `<h3>Life before the Dungeon</h3><p class="dccw-hint">Four life stages. For each, pick a background, then take <b>2</b> of its skills. Childhood &amp; Adolescence grant Rank 1, Hobby Rank 2, Career Rank 3.</p>`;
    ERAS.forEach((era) => {
      const list = bgByEra(era);
      const chosen = W.bg[era];
      const bgOpts = ['<option value="">— choose —</option>'].concat(list.map((b) =>
        `<option value="${esc(b.name)}" ${chosen && chosen.name === b.name ? "selected" : ""}>${esc(b.name)}</option>`
      )).join("");
      h += `<div class="dccw-card"><div class="dccw-row" style="margin-bottom:6px;align-items:flex-end;">
        <div class="dccw-field"><label>${era} · Rank ${ERA_RANK[era]}</label><select onchange="DCCW.setBg('${era}',this.value)">${bgOpts}</select></div>
      </div>`;
      if (chosen) {
        const bdef = list.find((b) => b.name === chosen.name);
        h += `<div>` + (bdef ? bdef.skills : []).map((sk) => {
          const on = (chosen.skills || []).includes(sk);
          return `<span class="dccw-chip ${on ? "on" : ""}" onclick="DCCW.toggleBgSkill('${era}',${JSON.stringify(sk).replace(/"/g, "&quot;")})">${esc(sk)}${on ? " ✓" : ""}</span>`;
        }).join("") + `</div>`;
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
    const weapons = attackSkills();
    const groups = [...new Set(weapons.map((w) => w.group))];
    const wopts = ['<option value="">— choose a weapon skill —</option>'].concat(groups.flatMap((g) =>
      [`<option disabled>── ${g} ──</option>`].concat(weapons.filter((w) => w.group === g).map((w) =>
        `<option value="${esc(w.name)}" ${W.combat.weapon === w.name ? "selected" : ""}>${esc(w.name)} (${w.stat}, ${w.damage || "—"})</option>`))
    )).join("");
    let h = `<h3>Combat training</h3><p class="dccw-hint">Every crawler starts with <b>Unarmed Combat at Rank 3</b>. Then choose your specialty at Rank 3:</p>`;
    h += `<div class="dccw-row"><div class="dccw-field"><label>Specialty</label><div class="dccw-seg">
      <button class="${W.combat.type === "weapon" ? "on" : ""}" onclick="DCCW.setCombatType('weapon')">Weapon Skill</button>
      <button class="${W.combat.type === "spell" ? "on" : ""}" onclick="DCCW.setCombatType('spell')">Attack Spell</button>
    </div></div></div>`;
    if (W.combat.type === "weapon") {
      h += `<div class="dccw-row"><div class="dccw-field"><label>Weapon Skill (Rank 3)</label><select onchange="DCCW.setCombat('weapon',this.value)">${wopts}</select></div></div>`;
      if (!W.combat.weapon) h += `<p class="dccw-warn">Choose a weapon skill to continue.</p>`;
    } else {
      const spells = attackSpells();
      const sopts = ['<option value="">— choose an attack spell —</option>'].concat(spells.map((s) =>
        `<option value="${esc(s.name)}" ${W.combat.spell === s.name ? "selected" : ""}>${esc(s.name)} (${s.mana} Mana, ${s.stat})</option>`)).join("");
      h += `<div class="dccw-row"><div class="dccw-field"><label>Attack Spell (Rank 3)</label><select onchange="DCCW.setCombat('spell',this.value)">${sopts}</select></div></div>`;
      h += `<p class="dccw-sub">Taking a spell needs INT 4+ (you have ${fin.int}) and grants 5 Mana Potions.</p>`;
      if (!canSpell) h += `<p class="dccw-warn">Your INT is under 4 — pick the Weapon Skill option instead, or raise INT.</p>`;
      else if (!W.combat.spell) h += `<p class="dccw-warn">Choose an attack spell to continue.</p>`;
    }
    h += `<p class="dccw-sub" style="margin-top:8px;">You also automatically know the <b>Heal</b> spell (Rank 1, 2 Mana, heals 2 Health Bar slots, usable as an Interrupt).</p>`;
    return h;
  }

  // ── step: story ───────────────────────────────────────────────────────────────
  function renderStory() {
    return `<h3>Baggage</h3><p class="dccw-hint">The dungeon loves a sob story. Jot a <b>Past Trauma</b>, a <b>Loose End</b>, and a <b>Regret</b> — a sentence each, or leave blank and fill in later.</p>
      <div class="dccw-field" style="margin-bottom:12px;"><label>Past Trauma</label><textarea rows="2" oninput="DCCW.setStory('trauma',this.value)">${esc(W.story.trauma)}</textarea></div>
      <div class="dccw-field" style="margin-bottom:12px;"><label>Loose End</label><textarea rows="2" oninput="DCCW.setStory('loose',this.value)">${esc(W.story.loose)}</textarea></div>
      <div class="dccw-field"><label>Regret</label><textarea rows="2" oninput="DCCW.setStory('regret',this.value)">${esc(W.story.regret)}</textarea></div>`;
  }

  // ── step: gear ────────────────────────────────────────────────────────────────
  function defaultGear() {
    const bits = ["The clothes on your back"];
    if (W.combat.type === "weapon" && W.combat.weapon) bits.push("A weapon for your " + W.combat.weapon + " skill");
    bits.push("One genuinely useful item");
    bits.push("Some weird junk you happened to be carrying");
    if (W.combat.type === "spell" && W.combat.spell) bits.push("5 Mana Potions");
    return bits.join("\n");
  }
  function renderGear() {
    if (!W.gear) W.gear = defaultGear();
    return `<h3>What you walked in with</h3><p class="dccw-hint">Your starting kit: the clothes you were wearing, a weapon for your combat skill, one useful item, and whatever weird stuff was in your pockets. Edit freely — one item per line.</p>
      <div class="dccw-field"><label>Starting gear (one per line)</label><textarea rows="6" oninput="DCCW.setGear(this.value)">${esc(W.gear)}</textarea></div>`;
  }

  // ── step: review ──────────────────────────────────────────────────────────────
  function assembledSkills() {
    // 8 background skills (2 per era) with era rank + governing stat from data.
    const rows = [];
    ERAS.forEach((era) => {
      const c = W.bg[era];
      if (!c) return;
      (c.skills || []).forEach((name) => {
        const sd = skillByName(name);
        rows.push({ name, rank: String(ERA_RANK[era]), stat: sd ? (sd.stat || "") : "", checkType: sd && sd.passive ? "Passive" : "", notes: era, checked: false });
      });
    });
    // Heal spell known by all
    rows.push({ name: "Heal (Spell)", rank: "1", stat: "INT", checkType: "Interrupt", notes: "Heals 2 HB slots, 2 Mana", checked: false });
    return rows;
  }
  function assembledAttacks() {
    const atks = [{ name: "Unarmed Combat", rank: "3", dice: "1d4", stat: "STR", effects: "" }];
    if (W.combat.type === "weapon" && W.combat.weapon) {
      const sd = skillByName(W.combat.weapon);
      atks.push({ name: W.combat.weapon, rank: "3", dice: sd && sd.damage ? sd.damage : "", stat: sd && sd.stat ? sd.stat : "STR", effects: "" });
    } else if (W.combat.type === "spell" && W.combat.spell) {
      const sp = attackSpells().find((s) => s.name === W.combat.spell);
      atks.push({ name: W.combat.spell + " (Spell)", rank: "3", dice: "", stat: sp ? sp.stat : "INT", effects: (sp ? sp.mana + " Mana" : "") });
    }
    return atks;
  }
  function renderReview() {
    const fin = finalStats();
    const skills = assembledSkills();
    const atks = assembledAttacks();
    const dupWarn = (() => {
      const names = skills.map((s) => s.name.toLowerCase());
      const dups = names.filter((n, i) => names.indexOf(n) !== i);
      return dups.length ? `<p class="dccw-warn">Heads up: duplicate skills (${[...new Set(dups)].join(", ")}) — you may want different picks, but it's fine to stack ranks.</p>` : "";
    })();
    return `<h3>Meet your crawler</h3>
      <div class="dccw-card"><b>${esc(W.basics.name || "(unnamed)")}</b> · ${esc(W.basics.race)} · Level 1 · Crawler #${esc(W.basics.crawler)}${W.basics.gender ? " · " + esc(W.basics.gender) : ""}</div>
      <div class="dccw-statgrid">${STAT_IDS.map((k) => `<div class="dccw-statbox"><div class="k">${STAT_ABBR[k]}</div><div class="v">${fin[k]}</div><div class="m">${statMod(fin[k]) >= 0 ? "+" : ""}${statMod(fin[k])}</div></div>`).join("")}</div>
      <p class="dccw-sub" style="margin-top:8px;">Health ${statMod(fin.con) * 10} · Mana ${fin.int} · Evade d20+${statMod(fin.dex)} · DR from armor · AI Favor 1</p>
      <div class="dccw-card" style="margin-top:12px;"><b>Attacks (Rank 3):</b><ul class="dccw-list">${atks.map((a) => `<li>${esc(a.name)} — ${esc(a.dice || "")} ${esc(a.stat)}</li>`).join("")}</ul></div>
      <div class="dccw-card"><b>Skills:</b><ul class="dccw-list">${skills.map((s) => `<li>${esc(s.name)} — Rank ${esc(s.rank)}${s.stat ? " (" + esc(s.stat) + ")" : ""}</li>`).join("")}</ul></div>
      ${dupWarn}
      <p class="dccw-hint" style="margin-top:12px;">Creating will <b>overwrite the current sheet</b>. Export first if you want to keep it.</p>`;
  }

  // ── validation per step ────────────────────────────────────────────────────────
  function canAdvance() {
    const key = STEPS[W.step].key;
    if (key === "basics") return W.path === "tutorial"; // block Next while thirdfloor selected
    if (key === "stats") return baseTotalsValid();
    if (key === "background") return ERAS.every((e) => W.bg[e] && (W.bg[e].skills || []).length === 2);
    if (key === "combat") {
      if (W.combat.type === "weapon") return !!W.combat.weapon;
      return finalStats().int >= 4 && !!W.combat.spell;
    }
    return true;
  }

  // ── build final data + apply ────────────────────────────────────────────────────
  function buildData() {
    const fin = finalStats();
    const data = {};
    data.header = {
      "f-name": W.basics.name, "f-race": W.basics.race, "f-gender": W.basics.gender,
      "f-level": "1", "f-crawler": W.basics.crawler, "f-class": "",
    };
    data.stats = {};
    STAT_IDS.forEach((k) => { data.stats[k] = { enh: String(fin[k]), unenh: String(fin[k]) }; });
    data.combat = { evadeBuffs: "", evadeMove: "20", evadeStep: "10", drArmor: "", drBuffs: "", drAiFavor: "", drSize: "", manaCurrentVal: String(fin.int), debuffs: "" };
    data.hpPips = new Array(10).fill("true");
    data.attacks = assembledAttacks();
    // Hotlist: Heal + a Mana Potion note if spellcaster
    const hot = ["Heal — 2 Mana: heal 2 HB slots (Interrupt)"];
    if (W.combat.type === "spell" && W.combat.spell) hot.push(W.combat.spell + " — attack spell", "Mana Potion ×5");
    data.hotlist = hot;
    data.extBuffs = [];
    data.gear = [];
    data.accessories = [];
    data.skills = assembledSkills();
    // Inventory from the gear textarea
    data.inventory = String(W.gear || defaultGear()).split("\n").map((l) => l.trim()).filter(Boolean).map((item) => ({ item, qty: "1", notes: "" }));
    // Background textareas: [Popularity, Past Trauma, Loose Ends, Regrets, Notes]
    const notes = `Created with the Crawler Wizard. AI Favor: 1. Knows Heal (Rank 1, 2 Mana, heal 2 slots, Interrupt).` +
      (W.combat.type === "spell" ? " Started with an attack spell (+5 Mana Potions)." : "");
    data.background = ["", W.story.trauma, W.story.loose, W.story.regret, notes];
    data.campaign = (typeof _campaign !== "undefined" && _campaign) ? { id: _campaign.id, code: _campaign.code, name: _campaign.name } : null;
    return data;
  }

  function finish() {
    if (typeof applySheet !== "function" || typeof saveSheet !== "function") {
      alert("Couldn't reach the sheet to apply the character. Try reloading.");
      return;
    }
    const data = buildData();
    applySheet(data);
    saveSheet();
    try { if (typeof addLog === "function") addLog("New Character", "✨ Wizard", (W.basics.name || "Crawler") + " · " + W.basics.race, "normal"); } catch (e) {}
    close();
  }

  // ── random autofill ─────────────────────────────────────────────────────────────
  function randomizeFrom(step) {
    // Fill everything from `step` onward with sensible random choices.
    if (step <= 1) {
      if (W.statMethod === "array") { const vals = shuffle(STANDARD_ARRAY); STAT_IDS.forEach((k, i) => (W.statVals[k] = String(vals[i]))); }
      else { STAT_IDS.forEach((k) => (W.statVals[k] = String(rollStat()))); }
    }
    if (step <= 2) {
      W.bg = {};
      ERAS.forEach((era) => {
        const list = bgByEra(era);
        if (!list.length) return;
        const b = pick(list);
        W.bg[era] = { name: b.name, skills: shuffle(b.skills).slice(0, 2) };
      });
    }
    if (step <= 3) {
      const fin = finalStats();
      if (fin.int >= 4 && Math.random() < 0.25 && attackSpells().length) { W.combat.type = "spell"; W.combat.spell = pick(attackSpells()).name; }
      else { W.combat.type = "weapon"; W.combat.weapon = pick(attackSkills()).name; }
    }
    if (step <= 5) { W.gear = defaultGear(); }
  }

  // ── public API (referenced from inline onclick) ─────────────────────────────────
  const API = {
    open, close,
    back() { if (W.step > 0) { W.step--; render(); } },
    next() {
      if (!canAdvance()) { render(); return; }
      W.step++;
      if (W.mode === "random") randomizeFrom(W.step);
      render();
    },
    finish,
    set(key, val) {
      W[key] = val;
      if (key === "mode" && val === "random") randomizeFrom(Math.max(1, W.step + 1));
      render();
    },
    setBasic(k, v) { W.basics[k] = v; if (k === "race") render(); },
    rollCrawler() { W.basics.crawler = String(500000 + Math.floor(Math.random() * 12400000)); render(); },
    setStatMethod(m) { W.statMethod = m; STAT_IDS.forEach((k) => (W.statVals[k] = "")); if (m === "roll") STAT_IDS.forEach((k) => (W.statVals[k] = String(rollStat()))); render(); },
    setStat(k, v) { W.statVals[k] = v; render(); },
    rollStats() { STAT_IDS.forEach((k) => (W.statVals[k] = String(rollStat()))); render(); },
    setBg(era, name) { W.bg[era] = name ? { name, skills: [] } : undefined; render(); },
    toggleBgSkill(era, sk) {
      const c = W.bg[era]; if (!c) return;
      c.skills = c.skills || [];
      const i = c.skills.indexOf(sk);
      if (i >= 0) c.skills.splice(i, 1);
      else if (c.skills.length < 2) c.skills.push(sk);
      render();
    },
    setCombatType(t) { W.combat.type = t; render(); },
    setCombat(k, v) { W.combat[k] = v; render(); },
    setStory(k, v) { W.story[k] = v; },
    setGear(v) { W.gear = v; },
  };

  window.DCCW = API;
  window.startCharWizard = open; // convenience alias
})();
