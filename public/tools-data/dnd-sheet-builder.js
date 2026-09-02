/* D&D 2024 Character Builder — window.DNDB.
   A step wizard: Class → Subclass → Species → Background → Ability Scores →
   Skills → Review. Assembles a starting character and hands it to the sheet
   through applySheet()/saveSheet(). Uses the same window.DND_* data + the
   sheet's own .ov/.modal CSS classes. */
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const sgn = (n) => (n >= 0 ? "+" : "") + n;
  const mod = (s) => Math.floor((s - 10) / 2);
  const ABIL = ["STR","DEX","CON","INT","WIS","CHA"];
  const ABIL_NAME = { STR:"Strength", DEX:"Dexterity", CON:"Constitution", INT:"Intelligence", WIS:"Wisdom", CHA:"Charisma" };
  const D = {
    classes: () => window.DND_CLASSES || [], species: () => window.DND_SPECIES || [],
    backgrounds: () => window.DND_BACKGROUNDS || [], skills: () => window.DND_SKILLS || [],
    tables: () => window.DND_TABLES || null,
  };
  const STEPS = ["Class","Subclass","Species","Background","Abilities","Skills","Review"];
  let st = null, step = 0;

  function fresh() {
    return { cls:"", level:1, subclass:"", species:"", lineage:"", background:"",
             method:"array", base:{ STR:8,DEX:8,CON:8,INT:8,WIS:8,CHA:8 }, arrayPick:{},
             bg2:"", bg1:"", classSkills:[] };
  }
  function clsData() { return D.classes().find((c) => c.name === st.cls) || null; }
  function spData() { return D.species().find((s) => s.name === st.species) || null; }
  function bgData() { return D.backgrounds().find((b) => b.name === st.background) || null; }

  // ── modal shell ────────────────────────────────────────────────────────
  function ensureModal() {
    if ($("dndb-overlay")) return;
    const ov = document.createElement("div");
    ov.className = "ov"; ov.id = "dndb-overlay";
    ov.innerHTML =
      '<div class="modal wide" style="max-width:720px;">' +
        '<div class="modal-hd"><div class="ttl">✨ Character Builder <span id="dndb-step" style="color:#8ad4ff;font-size:12px;letter-spacing:.08em;margin-left:8px;"></span></div><button class="x" onclick="DNDB.close()">✕</button></div>' +
        '<div class="modal-bd" id="dndb-body"></div>' +
        '<div class="modal-ft"><div><button class="m-btn ghost" id="dndb-back" onclick="DNDB.back()">← Back</button></div>' +
        '<div style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="DNDB.close()">Cancel</button><button class="m-btn" id="dndb-next" onclick="DNDB.next()">Next →</button></div></div>' +
      '</div>';
    ov.addEventListener("click", (e) => { if (e.target === ov) DNDB.close(); });
    document.body.appendChild(ov);
  }
  function launch() { ensureModal(); st = fresh(); step = 0; $("dndb-overlay").classList.add("open"); render(); }
  function close() { const ov = $("dndb-overlay"); if (ov) ov.classList.remove("open"); }
  function next() { if (!canProceed()) return; if (STEPS[step] === "Review") { apply(); return; } step = Math.min(STEPS.length - 1, step + 1); if (STEPS[step] === "Subclass" && !hasSubclass()) step = Math.min(STEPS.length - 1, step + 1); render(); }
  function back() { if (step === 0) return; step -= 1; if (STEPS[step] === "Subclass" && !hasSubclass()) step -= 1; render(); }
  function hasSubclass() { const c = clsData(); return !!(c && st.level >= (c.subclassLevel || 3)); }

  function render() {
    ensureModal();
    $("dndb-step").textContent = step === 0 ? "" : "Step " + step + " of " + (STEPS.length - 1) + " — " + STEPS[step];
    $("dndb-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("dndb-next").textContent = STEPS[step] === "Review" ? "Build character ✓" : "Next →";
    const fn = { Class:rClass, Subclass:rSubclass, Species:rSpecies, Background:rBackground, Abilities:rAbilities, Skills:rSkills, Review:rReview }[STEPS[step]];
    $("dndb-body").innerHTML = fn();
    wire();
  }

  const card = (attr, on, title, sub) =>
    '<div class="dndb-card' + (on ? " on" : "") + '" ' + attr + '>' +
      '<div class="dc-title">' + esc(title) + '</div>' + (sub ? '<div class="dc-sub">' + esc(sub) + '</div>' : "") + '</div>';

  // ── steps ──────────────────────────────────────────────────────────────
  function rClass() {
    let h = '<p class="m-hint">Pick a class and starting level. The sheet fills in its features, saving throws, and (for casters) spellcasting.</p>';
    h += '<div style="margin-bottom:12px;"><span class="m-lbl">Level</span> <input type="number" id="dndb-level" class="m-input" style="width:80px;display:inline-block;" min="1" max="20" value="' + st.level + '"></div>';
    h += '<div class="dndb-grid">';
    D.classes().forEach((c) => {
      const cast = c.spellcasting && c.spellcasting !== "none" ? c.spellcasting + " caster" : "martial";
      h += card('data-cls="' + esc(c.name) + '"', st.cls === c.name, c.name, "d" + c.hitDie + " · " + (c.primaryAbility||[]).join("/") + " · " + cast);
    });
    h += "</div>";
    const c = clsData();
    if (c) h += '<div class="dndb-note">' + esc(c.flavor || "") + '</div>';
    return h;
  }
  function rSubclass() {
    const c = clsData(); if (!c) return "<p>Pick a class first.</p>";
    let h = '<p class="m-hint">Your ' + esc(c.name) + ' chooses a ' + esc(c.subclassLabel || "subclass") + ' at level ' + (c.subclassLevel||3) + '.</p><div class="dndb-grid">';
    (c.subclasses || []).forEach((s) => h += card('data-sub="' + esc(s.name) + '"', st.subclass === s.name, s.name, s.source === "srd" ? "SRD" : (s.source||"").toUpperCase()));
    h += "</div>";
    const sub = (c.subclasses||[]).find((s) => s.name === st.subclass);
    if (sub) h += '<div class="dndb-note">' + esc(sub.flavor || "") + '</div>';
    return h;
  }
  function rSpecies() {
    let h = '<p class="m-hint">Choose a species. Some have a lineage to pick as well.</p><div class="dndb-grid">';
    D.species().forEach((s) => h += card('data-sp="' + esc(s.name) + '"', st.species === s.name, s.name, "Speed " + s.speed + (s.darkvision ? " · Darkvision " + s.darkvision : "")));
    h += "</div>";
    const sp = spData();
    if (sp && sp.lineages && sp.lineages.length) {
      h += '<span class="m-lbl">Lineage</span><div class="dndb-grid">';
      sp.lineages.forEach((l) => h += card('data-lin="' + esc(l.name) + '"', st.lineage === l.name, l.name, ""));
      h += "</div>";
    }
    if (sp) h += '<div class="dndb-note">' + esc(sp.flavor || "") + '</div>';
    return h;
  }
  function rBackground() {
    let h = '<p class="m-hint">Your background grants two skills, a tool, an Origin feat, and three ability scores you can raise.</p><div class="dndb-grid">';
    D.backgrounds().forEach((b) => h += card('data-bg="' + esc(b.name) + '"', st.background === b.name, b.name, (b.abilityScores||[]).join("/") + " · " + b.feat));
    h += "</div>";
    const b = bgData();
    if (b) h += '<div class="dndb-note"><b>' + esc(b.name) + '.</b> ' + esc(b.description || "") + '<br>Skills: <b>' + esc((b.skillProficiencies||[]).join(", ")) + '</b> · Feat: <b>' + esc(b.feat) + '</b></div>';
    return h;
  }
  function rAbilities() {
    const b = bgData();
    let h = '<p class="m-hint">Assign your ability scores, then apply your background\'s bonuses (2024: +2 and +1, among ' + (b ? esc((b.abilityScores||[]).join(", ")) : "your background\'s three abilities") + ').</p>';
    h += '<div class="dndb-seg">' +
      seg("array","Standard Array") + seg("pointbuy","Point Buy") + seg("manual","Manual") + '</div>';
    if (st.method === "array") h += arrayUI();
    else if (st.method === "pointbuy") h += pointBuyUI();
    else h += manualUI();
    // background boosts
    if (b) {
      h += '<span class="m-lbl">Background bonus</span><div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:12px;color:#cdc3b6;">';
      h += '<label>+2 to <select id="dndb-bg2" class="m-input" style="width:auto;display:inline-block;">' + (b.abilityScores||[]).map((a) => '<option value="' + a + '"' + (st.bg2===a?" selected":"") + '>' + ABIL_NAME[a] + '</option>').join("") + '</select></label>';
      h += '<label>+1 to <select id="dndb-bg1" class="m-input" style="width:auto;display:inline-block;">' + (b.abilityScores||[]).map((a) => '<option value="' + a + '"' + (st.bg1===a?" selected":"") + '>' + ABIL_NAME[a] + '</option>').join("") + '</select></label>';
      h += '</div>';
    }
    h += '<div class="dndb-totals" id="dndb-totals"></div>';
    return h;
  }
  function seg(v, label) { return '<button class="dndb-seg-btn' + (st.method===v?" on":"") + '" data-method="' + v + '">' + label + '</button>'; }
  function arrayUI() {
    const arr = (D.tables() && D.tables().standardArray) || [15,14,13,12,10,8];
    let h = '<div class="dndb-abil-rows">';
    ABIL.forEach((a) => {
      h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span><select class="m-input dndb-array" data-abil="' + a + '"><option value="">—</option>' +
        arr.map((n, i) => '<option value="' + i + '"' + (st.arrayPick[a] === i ? " selected" : "") + '>' + n + '</option>').join("") + '</select></div>';
    });
    h += "</div>";
    return h;
  }
  function pointBuyUI() {
    const costs = (D.tables() && D.tables().pointBuyCosts) || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};
    let spent = 0; ABIL.forEach((a) => spent += (costs[st.base[a]] || 0));
    const budget = (D.tables() && D.tables().pointBuyBudget) || 27;
    let h = '<div class="dndb-pb-head">Points: <b id="dndb-pb-spent">' + spent + '</b> / ' + budget + '</div><div class="dndb-abil-rows">';
    ABIL.forEach((a) => {
      h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span>' +
        '<button class="dndb-pm" data-pb="' + a + '" data-d="-1">−</button>' +
        '<span class="dar-val" id="dndb-pb-' + a + '">' + st.base[a] + '</span>' +
        '<button class="dndb-pm" data-pb="' + a + '" data-d="1">+</button></div>';
    });
    h += "</div>";
    return h;
  }
  function manualUI() {
    let h = '<div class="dndb-abil-rows">';
    ABIL.forEach((a) => h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span><input type="number" class="m-input dndb-manual" data-abil="' + a + '" min="1" max="20" value="' + st.base[a] + '" style="width:70px;"></div>');
    h += "</div>";
    return h;
  }
  function finalScores() {
    const out = {};
    if (st.method === "array") {
      const arr = (D.tables() && D.tables().standardArray) || [15,14,13,12,10,8];
      ABIL.forEach((a) => { const i = st.arrayPick[a]; out[a] = (i != null && arr[i] != null) ? arr[i] : 10; });
    } else { ABIL.forEach((a) => out[a] = st.base[a]); }
    if (st.bg2) out[st.bg2] = (out[st.bg2] || 10) + 2;
    if (st.bg1) out[st.bg1] = (out[st.bg1] || 10) + 1;
    return out;
  }
  function rSkills() {
    const c = clsData(), b = bgData();
    const bgSkills = b ? (b.skillProficiencies || []) : [];
    let h = '<p class="m-hint">You are automatically proficient in your background skills. Choose your class skills.</p>';
    if (bgSkills.length) h += '<div class="dndb-note">From ' + esc(b.name) + ': <b>' + esc(bgSkills.join(", ")) + '</b></div>';
    if (c) {
      const from = c.proficiencies && c.proficiencies.skillsFrom ? c.proficiencies.skillsFrom : D.skills().map((s) => s.name);
      const n = c.proficiencies && c.proficiencies.skillsChoose ? c.proficiencies.skillsChoose : 2;
      h += '<span class="m-lbl">Choose ' + n + ' from ' + esc(c.name) + ' <span id="dndb-sk-count" style="color:#8ad4ff;"></span></span><div class="dndb-grid">';
      from.forEach((s) => { const dis = bgSkills.map((x)=>x.toLowerCase()).includes(s.toLowerCase()); h += '<div class="dndb-card small' + (st.classSkills.includes(s) ? " on" : "") + (dis ? " disabled" : "") + '" data-sk="' + esc(s) + '" data-max="' + n + '"><div class="dc-title">' + esc(s) + (dis ? " ✓bg" : "") + '</div></div>'; });
      h += "</div>";
    }
    return h;
  }
  function rReview() {
    const sc = finalScores(), c = clsData(), b = bgData(), sp = spData();
    const bgSkills = b ? (b.skillProficiencies || []) : [];
    let h = '<p class="m-hint">Here\'s your character. Building applies it to the sheet (replacing the current contents).</p>';
    h += '<div class="dndb-review">';
    h += '<div class="dr-line"><b>' + esc(st.species || "—") + (st.lineage ? " (" + esc(st.lineage) + ")" : "") + '</b> ' + esc(st.cls || "—") + ' ' + st.level + (st.subclass ? " · " + esc(st.subclass) : "") + ' · ' + esc(st.background || "—") + '</div>';
    h += '<div class="dr-scores">' + ABIL.map((a) => '<div class="drs"><span class="drs-a">' + a + '</span><span class="drs-v">' + sc[a] + '</span><span class="drs-m">' + sgn(mod(sc[a])) + '</span></div>').join("") + '</div>';
    if (c) h += '<div class="dr-line">Saves: <b>' + esc((c.savingThrows||[]).join(", ")) + '</b> · Hit Die d' + c.hitDie + '</div>';
    h += '<div class="dr-line">Skills: <b>' + esc(bgSkills.concat(st.classSkills).join(", ") || "—") + '</b></div>';
    if (b) h += '<div class="dr-line">Origin feat: <b>' + esc(b.feat) + '</b></div>';
    h += "</div>";
    return h;
  }

  // ── wiring ─────────────────────────────────────────────────────────────
  function wire() {
    const body = $("dndb-body");
    const lvl = $("dndb-level"); if (lvl) lvl.addEventListener("input", () => { st.level = Math.max(1, Math.min(20, parseInt(lvl.value,10) || 1)); });
    body.querySelectorAll("[data-cls]").forEach((el) => el.addEventListener("click", () => { st.cls = el.dataset.cls; st.subclass = ""; render(); }));
    body.querySelectorAll("[data-sub]").forEach((el) => el.addEventListener("click", () => { st.subclass = el.dataset.sub; render(); }));
    body.querySelectorAll("[data-sp]").forEach((el) => el.addEventListener("click", () => { st.species = el.dataset.sp; st.lineage = ""; render(); }));
    body.querySelectorAll("[data-lin]").forEach((el) => el.addEventListener("click", () => { st.lineage = el.dataset.lin; render(); }));
    body.querySelectorAll("[data-bg]").forEach((el) => el.addEventListener("click", () => { const b = D.backgrounds().find((x)=>x.name===el.dataset.bg); st.background = el.dataset.bg; if (b) { st.bg2 = (b.abilityScores||[])[0] || ""; st.bg1 = (b.abilityScores||[])[1] || ""; } render(); }));
    body.querySelectorAll("[data-method]").forEach((el) => el.addEventListener("click", () => { st.method = el.dataset.method; render(); }));
    body.querySelectorAll(".dndb-array").forEach((el) => el.addEventListener("change", () => { const a = el.dataset.abil, v = el.value; ABIL.forEach((x) => { if (x !== a && String(st.arrayPick[x]) === String(v)) delete st.arrayPick[x]; }); if (v === "") delete st.arrayPick[a]; else st.arrayPick[a] = parseInt(v,10); render(); }));
    body.querySelectorAll(".dndb-manual").forEach((el) => el.addEventListener("input", () => { st.base[el.dataset.abil] = Math.max(1, Math.min(20, parseInt(el.value,10) || 8)); updTotals(); }));
    body.querySelectorAll(".dndb-pm").forEach((el) => el.addEventListener("click", () => { pbAdjust(el.dataset.pb, parseInt(el.dataset.d,10)); }));
    const bg2 = $("dndb-bg2"); if (bg2) bg2.addEventListener("change", () => { st.bg2 = bg2.value; updTotals(); });
    const bg1 = $("dndb-bg1"); if (bg1) bg1.addEventListener("change", () => { st.bg1 = bg1.value; updTotals(); });
    body.querySelectorAll("[data-sk]").forEach((el) => el.addEventListener("click", () => {
      if (el.classList.contains("disabled")) return;
      const s = el.dataset.sk, max = parseInt(el.dataset.max,10);
      const i = st.classSkills.indexOf(s);
      if (i >= 0) st.classSkills.splice(i,1); else { if (st.classSkills.length >= max) st.classSkills.shift(); st.classSkills.push(s); }
      render();
    }));
    updTotals(); updSkillCount();
  }
  function pbAdjust(a, d) {
    const costs = (D.tables() && D.tables().pointBuyCosts) || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};
    const budget = (D.tables() && D.tables().pointBuyBudget) || 27;
    const next = st.base[a] + d;
    if (next < 8 || next > 15) return;
    let spent = 0; ABIL.forEach((x) => spent += (costs[x===a?next:st.base[x]] || 0));
    if (spent > budget) return;
    st.base[a] = next;
    const cell = $("dndb-pb-" + a); if (cell) cell.textContent = next;
    const sp = $("dndb-pb-spent"); if (sp) sp.textContent = spent;
    updTotals();
  }
  function updTotals() {
    const box = $("dndb-totals"); if (!box) return;
    const sc = finalScores();
    box.innerHTML = ABIL.map((a) => '<div class="drs"><span class="drs-a">' + a + '</span><span class="drs-v">' + sc[a] + '</span><span class="drs-m">' + sgn(mod(sc[a])) + '</span></div>').join("");
  }
  function updSkillCount() {
    const el = $("dndb-sk-count"); const c = clsData(); if (!el || !c) return;
    const n = c.proficiencies && c.proficiencies.skillsChoose ? c.proficiencies.skillsChoose : 2;
    el.textContent = "(" + st.classSkills.length + "/" + n + ")";
  }
  function canProceed() {
    switch (STEPS[step]) {
      case "Class": return !!st.cls;
      case "Subclass": return !hasSubclass() || !!st.subclass;
      case "Species": { const sp = spData(); if (!st.species) return false; if (sp && sp.lineages && sp.lineages.length && !st.lineage) return false; return true; }
      case "Background": return !!st.background;
      default: return true;
    }
  }

  // ── apply ──────────────────────────────────────────────────────────────
  function apply() {
    const sc = finalScores(), c = clsData(), b = bgData(), sp = spData(), t = D.tables();
    const saveProf = {}; if (c) (c.savingThrows || []).forEach((s) => saveProf[s] = true);
    const skillProf = {};
    if (b) (b.skillProficiencies || []).forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 1; });
    st.classSkills.forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 1; });
    // HP: max hit die at 1, average after
    let hp = 0; if (c) { const hd = c.hitDie; hp = hd + mod(sc.CON); for (let L=2; L<=st.level; L++) hp += Math.floor(hd/2)+1 + mod(sc.CON); }
    hp = Math.max(1, hp);
    const speed = sp ? sp.speed : 30;
    const ac = 10 + mod(sc.DEX);
    // proficiencies text
    const profBits = [];
    if (c && c.proficiencies) { ["armor","weapons","tools"].forEach((k) => { if (c.proficiencies[k] && c.proficiencies[k].length) profBits.push(c.proficiencies[k].join(", ")); }); }
    if (b && b.toolProficiencies && b.toolProficiencies.length) profBits.push(b.toolProficiencies.join(", "));
    // starting equipment note into inventory
    const inv = [];
    if (c && c.startingEquipment && c.startingEquipment[0]) c.startingEquipment[0].split(/,\s*/).forEach((x) => { const m = x.trim().match(/^(\d+)\s+(.*)/); inv.push(m ? { name:m[2], qty:parseInt(m[1],10) } : { name:x.trim(), qty:1 }); });
    const spellcasts = c && c.spellcasting && c.spellcasting !== "none";
    const data = {
      system:"DND", v:1, name:"", cls: st.cls, level: st.level, subclass: st.subclass,
      species: st.species + (st.lineage ? "" : ""), background: st.background, alignment:"",
      scores: sc, saveProf, skillProf,
      speed: String(speed), ac: String(ac), hpCur: hp, hpMax: hp, hpTemp:0,
      hitdice: st.level + "d" + (c ? c.hitDie : 8),
      attacks: [], inventory: inv, gp:0, sp:0, cp:0,
      proficiencies: profBits.join(" · "), notes:"",
      customFeatures: [], addedFeats: b ? [b.feat] : [], spellsKnown: [], slotUsed:{},
      forceSpells: false, spellAbility: (spellcasts && c.spellcastingAbility) ? c.spellcastingAbility : "",
      lineage: st.lineage,
    };
    if (typeof window.applySheet === "function") window.applySheet(data);
    // lineage select on the sheet has no field; store handled via species traits filter uses f-lineage — set if present
    if (document.getElementById("f-lineage")) document.getElementById("f-lineage").value = st.lineage || "";
    if (typeof window.renderFeatures === "function") window.renderFeatures();
    if (typeof window.saveSheet === "function") window.saveSheet(true);
    if (typeof window.addLog === "function") window.addLog("Character Built", "✨", (st.cls || "Character") + " " + st.level, "normal");
    close();
  }
  function matchSkill(name) { const n = String(name).toLowerCase(); const s = D.skills().find((x) => x.name.toLowerCase() === n); return s ? s.name : null; }

  window.DNDB = { launch, close, next, back };

  // builder-only styles (scoped by dndb- prefix)
  const css = document.createElement("style");
  css.textContent =
    ".dndb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:8px 0;}" +
    ".dndb-card{border:1px solid #443c38;border-radius:6px;background:#241c1a;padding:8px 10px;cursor:pointer;transition:.1s;}" +
    ".dndb-card:hover{border-color:#9b1b22;}" +
    ".dndb-card.on{border-color:#e08a70;background:#3a201a;box-shadow:0 0 0 1px #e08a70 inset;}" +
    ".dndb-card.small{padding:6px 8px;}.dndb-card.disabled{opacity:.5;cursor:default;}" +
    ".dc-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:14px;color:#f0e0d6;letter-spacing:.02em;}" +
    ".dc-sub{font-size:10px;color:#a99e90;margin-top:2px;font-family:'Barlow Condensed',sans-serif;letter-spacing:.03em;text-transform:uppercase;}" +
    ".dndb-note{font-size:12px;color:#cdc3b6;line-height:1.5;margin-top:8px;border-left:3px solid #9b1b22;padding:4px 0 4px 10px;}" +
    ".dndb-seg{display:flex;gap:0;border:1px solid #443c38;border-radius:5px;overflow:hidden;margin-bottom:12px;}" +
    ".dndb-seg-btn{flex:1;padding:8px;background:#1c1614;color:#a99e90;border:none;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:.06em;text-transform:uppercase;}" +
    ".dndb-seg-btn.on{background:#9b1b22;color:#fff;}" +
    ".dndb-abil-rows{display:flex;flex-direction:column;gap:6px;margin:8px 0;}" +
    ".dndb-abil-row{display:flex;align-items:center;gap:10px;}" +
    ".dar-name{flex:1;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#ece3d6;}" +
    ".dar-val{font-family:'Share Tech Mono',monospace;font-size:18px;font-weight:700;color:#e08a70;min-width:28px;text-align:center;}" +
    ".dndb-pm{width:30px;height:30px;background:#9b1b22;color:#fff;border:none;border-radius:4px;font-size:16px;cursor:pointer;}" +
    ".dndb-pb-head{font-size:13px;color:#cdc3b6;margin-bottom:6px;}.dndb-pb-head b{color:#e08a70;}" +
    ".dndb-totals,.dr-scores{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;}" +
    ".drs{border:1px solid #443c38;border-radius:6px;background:#241c1a;padding:5px 8px;text-align:center;min-width:52px;}" +
    ".drs-a{display:block;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;color:#a99e90;letter-spacing:.06em;}" +
    ".drs-v{display:block;font-family:'Share Tech Mono',monospace;font-size:18px;font-weight:700;color:#f0e0d6;}" +
    ".drs-m{display:block;font-family:'Share Tech Mono',monospace;font-size:11px;color:#e08a70;}" +
    ".dndb-review .dr-line{font-size:13px;color:#cdc3b6;line-height:1.6;margin-top:6px;}.dndb-review b{color:#f0e0d6;}";
  document.head.appendChild(css);
})();
