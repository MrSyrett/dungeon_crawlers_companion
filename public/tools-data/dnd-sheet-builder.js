/* D&D 2024 Character Builder — window.DNDB.
   A step wizard: Class → Subclass → Species → Background → Ability Scores →
   Skills → Class Choices → Spells → Equipment → Review. Assembles a starting
   character and hands it to the sheet through applySheet()/saveSheet(). Uses
   the same window.DND_* data + the sheet's own .ov/.modal CSS classes. */
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const sgn = (n) => (n >= 0 ? "+" : "") + n;
  const mod = (s) => Math.floor((s - 10) / 2);
  const ABIL = ["STR","DEX","CON","INT","WIS","CHA"];
  const ABIL_NAME = { STR:"Strength", DEX:"Dexterity", CON:"Constitution", INT:"Intelligence", WIS:"Wisdom", CHA:"Charisma" };
  const ALIGNMENTS = ["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil","Unaligned"];
  const D = {
    classes: () => window.DND_CLASSES || [], species: () => window.DND_SPECIES || [],
    backgrounds: () => window.DND_BACKGROUNDS || [], skills: () => window.DND_SKILLS || [],
    feats: () => window.DND_FEATS || [], spells: () => window.DND_SPELLS || [],
    weapons: () => window.DND_WEAPONS || [], armor: () => window.DND_ARMOR || [],
    gear: () => window.DND_GEAR || [], magicItems: () => window.DND_MAGIC_ITEMS || [],
    tables: () => window.DND_TABLES || null,
  };
  // The catalog name a token resolves to (canonical), or "" if it isn't in the catalog.
  function canonRef(name){
    const names = [].concat(D.weapons(), D.armor(), D.gear(), D.magicItems()).map((x) => x.name);
    const n = String(name).trim().toLowerCase();
    let hit = names.find((x) => x.toLowerCase() === n) || names.find((x) => x.toLowerCase() === n.replace(/s$/, ""));
    if(!hit){ const s = n.replace(/\s+armor$/, ""); if(s !== n) hit = names.find((x) => x.toLowerCase() === s); }
    return hit || "";
  }
  // Turn a starting-equipment token into an inventory item {name, ref}. A ref keeps
  // it equippable even when renamed. "Arcane Focus (Quarterstaff)" → the item is a
  // Quarterstaff, shown as "Quarterstaff (Arcane Focus)".
  function resolveItem(raw){
    const t = String(raw).trim();
    const paren = t.match(/^(.+?)\s*\((.+)\)$/);
    if(paren){ const ref = canonRef(paren[2]); if(ref) return { name: ref + " (" + paren[1].trim() + ")", ref }; }
    const ref = canonRef(t);
    return ref ? { name: ref, ref } : { name: t, ref: "" };
  }
  const STEPS = ["Class","Subclass","Species","Background","Abilities","Skills","Choices","Advancement","Spells","Equipment","Review"];
  // Level-1 (and level-gated) class decisions the builder can offer from data.
  const CLASS_CHOICES = {
    Fighter: [{ kind:"style", level:1 }],
    Paladin: [{ kind:"style", level:2 }],
    Ranger:  [{ kind:"expertise", level:1, count:1, note:"Deft Explorer" }, { kind:"style", level:2 }],
    Rogue:   [{ kind:"expertise", level:1, count:2 }],
    Bard:    [{ kind:"expertise", level:2, count:2 }],
    Cleric:  [{ kind:"pick", level:1, name:"Divine Order", options:[
                { name:"Protector", desc:"Training with Martial weapons and Heavy armor.", prof:"Martial weapons, Heavy armor" },
                { name:"Thaumaturge", desc:"You know one extra Cleric cantrip, and you add your Wisdom modifier to Intelligence (Arcana or Religion) checks.", extraCantrip:true } ]}],
    Druid:   [{ kind:"pick", level:1, name:"Primal Order", options:[
                { name:"Magician", desc:"You know one extra Druid cantrip, and you add your Wisdom modifier to Intelligence (Arcana or Nature) checks.", extraCantrip:true },
                { name:"Warden", desc:"Training with Martial weapons and Medium armor.", prof:"Martial weapons, Medium armor" } ]}],
  };
  let st = null, step = 0;

  function fresh() {
    return { cls:"", level:1, subclass:"", species:"", lineage:"", background:"",
             method:"array", base:{ STR:8,DEX:8,CON:8,INT:8,WIS:8,CHA:8 }, arrayPick:{},
             bg2:"", bg1:"", classSkills:[], multiclass:[],
             name:"", alignment:"",
             fightingStyle:"", expertise:[], orders:{}, advances:[],
             pickedCantrips:[], pickedSpells:[], equipChoice:"gear" };
  }
  function clsData() { return D.classes().find((c) => c.name === st.cls) || null; }
  function spData() { return D.species().find((s) => s.name === st.species) || null; }
  function bgData() { return D.backgrounds().find((b) => b.name === st.background) || null; }
  // Multiclass: secondary classes take some of the total level; the primary keeps the rest.
  function secondaryTotal() { return (st.multiclass || []).reduce((s, m) => s + (num(m.level) || 0), 0); }
  function primaryLevel() { return Math.max(1, (num(st.level) || 1) - secondaryTotal()); }
  function classBreakdown() { return [{ cls: st.cls, subclass: st.subclass, level: primaryLevel() }].concat((st.multiclass || []).map((m) => ({ cls: m.cls, subclass: "", level: num(m.level) }))); }
  function num(v) { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; }
  // Hit-dice pool string from the class breakdown, e.g. Fighter3/Wizard2 → "3d10 + 2d6".
  function hitDiceString() {
    const byDie = {};
    classBreakdown().forEach((cl) => { const cc = D.classes().find((x) => x.name === cl.cls); const hd = cc ? cc.hitDie : 8; byDie[hd] = (byDie[hd] || 0) + num(cl.level); });
    return Object.keys(byDie).map(Number).sort((a,b) => b-a).map((d) => byDie[d] + "d" + d).join(" + ");
  }
  // Number of ASI/feat choices earned by this build's levels (B1), summed per class.
  function asiSlots() { let n = 0; classBreakdown().forEach((cl) => { n += window.DNDCALC.asiLevelsUpTo(cl.cls, cl.level).length; }); return n; }

  // ── casting helpers ────────────────────────────────────────────────────
  function isCaster() { const c = clsData(); return !!(c && c.spellcasting && c.spellcasting !== "none"); }
  function tableRow(L) { const c = clsData(); if (!c || !c.table) return null; return c.table.find((r) => Number(r.level) === Number(L)) || null; }
  function colNum(name) { const r = tableRow(primaryLevel()); if (!r || !r.columns) return 0; const n = parseInt(r.columns[name], 10); return isNaN(n) ? 0 : n; }
  function orderCantripBonus() { let b = 0; classChoices().forEach((ch) => { if (ch.kind === "pick") { const opt = (ch.options || []).find((o) => o.name === (st.orders || {})[ch.name]); if (opt && opt.extraCantrip) b++; } }); return b; }
  function cantripCount() { const r = tableRow(primaryLevel()); const base = Math.max(colNum("Cantrips"), r && r.cantripsKnown != null ? Number(r.cantripsKnown) : 0); return base + orderCantripBonus(); }
  function preparedCount() { return colNum("Prepared Spells") || colNum("Spells Known"); }
  function maxSpellLevel() {
    const c = clsData(); if (!c) return 0; const T = D.tables(); if (!T) return 1;
    const L = primaryLevel(), ct = c.spellcasting;
    if (ct === "pact") { const row = (T.pactMagic || [])[L-1]; return row ? row.level : 1; }
    const map = { full:"fullCasterSlots", half:"halfCasterSlots", third:"thirdCasterSlots", artificer:"artificerSlots" };
    const arr = (T[map[ct]] || [])[L-1] || [];
    let m = 0; arr.forEach((n, i) => { if (n && String(n) !== "0") m = i + 1; });
    if (m < 1 && preparedCount() > 0) m = 1;   // half-casters prepare 1st-level spells at level 1
    return m;
  }
  function spellsFor(minL, maxL) {
    const nm = st.cls;
    return D.spells().filter((s) => s.level >= minL && s.level <= maxL && (s.classes || []).includes(nm))
      .sort((a, b) => (a.level - b.level) || a.name.localeCompare(b.name));
  }
  function fightingStyles() { return D.feats().filter((f) => (f.category || "") === "Fighting Style"); }
  function classChoices() { return (CLASS_CHOICES[st.cls] || []).filter((ch) => primaryLevel() >= (ch.level || 1)); }
  function proficientSkills() { const b = bgData(); const bg = b ? (b.skillProficiencies || []) : []; const out = []; bg.concat(st.classSkills).forEach((s) => { const r = matchSkill(s); if (r && out.indexOf(r) < 0) out.push(r); }); return out; }

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

  function stepSkipped(name) {
    if (name === "Subclass") return !hasSubclass();
    if (name === "Choices") return classChoices().length === 0;
    if (name === "Advancement") return asiSlots() === 0;
    if (name === "Spells") return !isCaster();
    return false;
  }
  function nextEnabled(from) { let s = from; while (s < STEPS.length - 1) { s++; if (!stepSkipped(STEPS[s])) return s; } return STEPS.length - 1; }
  function prevEnabled(from) { let s = from; while (s > 0) { s--; if (!stepSkipped(STEPS[s])) return s; } return 0; }
  function next() { if (!canProceed()) return; if (STEPS[step] === "Review") { apply(); return; } step = nextEnabled(step); render(); }
  function back() { if (step === 0) return; step = prevEnabled(step); render(); }
  function hasSubclass() { const c = clsData(); return !!(c && primaryLevel() >= (c.subclassLevel || 3)); }

  // How many real (non-skipped) steps precede Review, for the "Step X of Y" label.
  function stepLabel() {
    if (step === 0) return "";
    let idx = 0, total = 0;
    for (let i = 1; i < STEPS.length; i++) { if (stepSkipped(STEPS[i])) continue; total++; if (i === step) idx = total; }
    return "Step " + idx + " of " + total + " — " + STEPS[step];
  }

  function render() {
    ensureModal();
    $("dndb-step").textContent = stepLabel();
    $("dndb-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("dndb-next").textContent = STEPS[step] === "Review" ? "Build character ✓" : "Next →";
    const fn = { Class:rClass, Subclass:rSubclass, Species:rSpecies, Background:rBackground, Abilities:rAbilities, Skills:rSkills, Choices:rChoices, Advancement:rAdvancement, Spells:rSpells, Equipment:rEquipment, Review:rReview }[STEPS[step]];
    const body = $("dndb-body");
    // Keep the scroll position on in-step re-renders (e.g. picking a spell); reset only on a step change.
    const sameStep = render._step === step, prevScroll = body.scrollTop;
    body.innerHTML = fn();
    body.scrollTop = sameStep ? prevScroll : 0;
    render._step = step;
    wire();
  }

  const card = (attr, on, title, sub) =>
    '<div class="dndb-card' + (on ? " on" : "") + '" ' + attr + '>' +
      '<div class="dc-title">' + esc(title) + '</div>' + (sub ? '<div class="dc-sub">' + esc(sub) + '</div>' : "") + '</div>';

  // ── steps ──────────────────────────────────────────────────────────────
  function rClass() {
    let h = '<p class="m-hint">Name your hero, then pick a class and starting level. The sheet fills in its features, saving throws, and (for casters) spellcasting.</p>';
    h += '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin-bottom:12px;">' +
         '<label style="flex:1 1 220px;"><span class="m-lbl">Character name</span><input type="text" id="dndb-name" class="m-input" placeholder="Aelric Thornwood" value="' + esc(st.name) + '"></label>' +
         '<label><span class="m-lbl">Level</span> <input type="number" id="dndb-level" class="m-input" style="width:80px;" min="1" max="20" value="' + st.level + '"></label>' +
         '</div>';
    h += '<div class="dndb-grid">';
    D.classes().forEach((c) => {
      const cast = c.spellcasting && c.spellcasting !== "none" ? c.spellcasting + " caster" : "martial";
      h += card('data-cls="' + esc(c.name) + '"', st.cls === c.name, c.name, "d" + c.hitDie + " · " + (c.primaryAbility||[]).join("/") + " · " + cast);
    });
    h += "</div>";
    const c = clsData();
    if (c) h += '<div class="dndb-note">' + esc(c.flavor || "") + '</div>';
    // Multiclass allocator (only meaningful above level 1)
    if (st.cls && num(st.level) > 1) h += rMulticlass();
    return h;
  }
  function rMulticlass(){
    let h = '<span class="m-lbl">Multiclass (optional)</span><p class="m-hint" style="margin:2px 0 6px;">Give some of your levels to other classes. Your primary <b>' + esc(st.cls) + '</b> keeps the remaining <b style="color:#8ad4ff;">' + primaryLevel() + '</b>.</p>';
    h += '<div class="dndb-mc-rows">';
    (st.multiclass || []).forEach((m, i) => {
      h += '<div class="dndb-mc-row"><span class="dndb-mc-name">' + esc(m.cls) + '</span>' +
        '<button class="dndb-pm" data-mc="' + i + '" data-d="-1">−</button><span class="dar-val" style="min-width:22px;">' + num(m.level) + '</span><button class="dndb-pm" data-mc="' + i + '" data-d="1">+</button>' +
        '<button class="dndb-mc-x" data-mcx="' + i + '" title="Remove">✕</button></div>';
    });
    h += '</div>';
    const taken = new Set([norm(st.cls)].concat((st.multiclass || []).map((m) => norm(m.cls))));
    const others = D.classes().filter((c) => !taken.has(norm(c.name)));
    if (others.length && secondaryTotal() < num(st.level) - 1){
      h += '<select id="dndb-mc-add" class="m-input" style="margin-top:6px;"><option value="">+ Add a class…</option>' +
        others.map((c) => '<option value="' + esc(c.name) + '">' + esc(c.name) + '</option>').join("") + '</select>';
    }
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
  function rChoices() {
    // keep expertise picks valid if the player changed their skills
    st.expertise = st.expertise.filter((s) => proficientSkills().includes(s));
    const chs = classChoices();
    let h = '<p class="m-hint">Level-' + st.level + ' choices for your ' + esc(st.cls) + '.</p>';
    chs.forEach((ch) => {
      if (ch.kind === "style") {
        h += '<span class="m-lbl">Fighting Style' + (ch.level > 1 ? ' (gained at level ' + ch.level + ')' : '') + '</span><div class="dndb-grid">';
        fightingStyles().forEach((f) => h += card('data-style="' + esc(f.name) + '"', st.fightingStyle === f.name, f.name, ""));
        h += "</div>";
        const f = fightingStyles().find((x) => x.name === st.fightingStyle);
        if (f) h += '<div class="dndb-note">' + esc((f.benefits || []).join(" ") || f.description || "") + '</div>';
      } else if (ch.kind === "expertise") {
        const prof = proficientSkills();
        h += '<span class="m-lbl">Expertise — choose ' + ch.count + (ch.note ? ' (' + esc(ch.note) + ')' : '') + ' <span style="color:#8ad4ff;">(' + st.expertise.length + '/' + ch.count + ')</span></span>';
        h += '<p class="m-hint" style="margin:2px 0 6px;">Expertise doubles your proficiency bonus on the chosen skills.</p>';
        if (!prof.length) h += '<div class="dndb-note">Choose your skills on the previous step first.</div>';
        h += '<div class="dndb-grid">';
        prof.forEach((s) => h += '<div class="dndb-card small' + (st.expertise.includes(s) ? " on" : "") + '" data-exp="' + esc(s) + '" data-max="' + ch.count + '"><div class="dc-title">' + esc(s) + '</div></div>');
        h += "</div>";
      } else if (ch.kind === "pick") {
        h += '<span class="m-lbl">' + esc(ch.name) + '</span><div class="dndb-grid">';
        (ch.options || []).forEach((o) => h += card('data-order="' + esc(ch.name) + '" data-opt="' + esc(o.name) + '"', (st.orders || {})[ch.name] === o.name, o.name, ""));
        h += "</div>";
        const opt = (ch.options || []).find((o) => o.name === (st.orders || {})[ch.name]);
        if (opt) h += '<div class="dndb-note">' + esc(opt.desc || "") + '</div>';
      }
    });
    return h;
  }
  // B1: characters built above level 1 allocate the ASIs / feats their levels earned.
  function rAdvancement() {
    const n = asiSlots();
    while (st.advances.length < n) st.advances.push({ mode:"asi", asi:{}, feat:"" });
    st.advances.length = n;
    const base = finalScores();
    let h = '<p class="m-hint">Your levels grant <b>' + n + '</b> Ability Score Improvement' + (n>1?"s":"") + ' (each can be a feat instead). Allocate them below.</p>';
    st.advances.forEach((av, i) => {
      h += '<div style="border:1px solid #443c38;border-radius:6px;padding:8px 10px;margin-bottom:8px;">';
      h += '<span class="m-lbl">Improvement ' + (i+1) + '</span>';
      h += '<div class="dndb-seg" style="margin:4px 0 8px;"><button class="dndb-seg-btn' + (av.mode!=="feat"?" on":"") + '" data-advmode="asi" data-i="' + i + '">Ability Scores</button><button class="dndb-seg-btn' + (av.mode==="feat"?" on":"") + '" data-advmode="feat" data-i="' + i + '">Feat</button></div>';
      if (av.mode === "feat") {
        h += '<select class="m-input dndb-adv-feat" data-i="' + i + '"><option value="">Select a feat…</option>' +
          D.feats().filter((f) => (f.category||"") !== "Fighting Style").slice().sort((a,b)=>a.name.localeCompare(b.name)).map((f) => '<option value="' + esc(f.name) + '"' + (av.feat===f.name?" selected":"") + '>' + esc(f.name) + " — " + esc(f.category) + '</option>').join("") + '</select>';
        const f = D.feats().find((x) => x.name === av.feat);
        if (f) h += '<div class="dndb-note">' + esc((f.benefits||[]).join(" ") || "") + '</div>';
      } else {
        const total = ABIL.reduce((s,a) => s + (av.asi[a]||0), 0);
        h += '<p class="m-hint" style="margin:0 0 6px;">+2 to one score, or +1 to two (max 20). <b style="color:#8ad4ff;">' + total + '/2</b></p><div class="dndb-abil-rows">';
        ABIL.forEach((a) => { const add = av.asi[a]||0; h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + ' <small style="color:#a99e90;">' + base[a] + (add?" +"+add:"") + '</small></span><button class="dndb-pm" data-advasi="' + a + '" data-i="' + i + '" data-d="-1">−</button><span class="dar-val">' + add + '</span><button class="dndb-pm" data-advasi="' + a + '" data-i="' + i + '" data-d="1">+</button></div>'; });
        h += "</div>";
      }
      h += "</div>";
    });
    return h;
  }
  function rSpells() {
    if (!isCaster()) return '<p class="m-hint">This class doesn\'t cast spells at this level.</p>';
    const cCount = cantripCount(), sCount = preparedCount(), maxL = maxSpellLevel();
    let h = '<p class="m-hint">Choose your starting spells for the ' + esc(st.cls) + '. You can change these on the sheet anytime.</p>';
    if (cCount > 0) {
      const cs = spellsFor(0, 0);
      h += '<span class="m-lbl">Cantrips — choose ' + cCount + ' <span style="color:#8ad4ff;">(' + st.pickedCantrips.length + '/' + cCount + ')</span></span><div class="dndb-grid">';
      cs.forEach((s) => h += spellCard(s, "cantrip", cCount));
      h += "</div>";
    }
    if (sCount > 0 && maxL >= 1) {
      const ss = spellsFor(1, maxL);
      h += '<span class="m-lbl">Spells — choose ' + sCount + ' (up to level ' + maxL + ') <span style="color:#8ad4ff;">(' + st.pickedSpells.length + '/' + sCount + ')</span></span><div class="dndb-grid">';
      ss.forEach((s) => h += spellCard(s, "spell", sCount));
      h += "</div>";
    }
    return h;
  }
  // Card markup is shared with the level-up wizard (window.DNDCALC).
  function spellCard(s, kind, max) {
    const arr = kind === "cantrip" ? st.pickedCantrips : st.pickedSpells;
    return window.DNDCALC.spellCard(s, kind, max, arr.includes(s.name));
  }
  function rEquipment() {
    const c = clsData();
    const eq = c && c.startingEquipment ? c.startingEquipment : [];
    const gear = eq[0] || "";
    const goldN = (String(eq[1] || "").match(/(\d+)\s*GP/i) || [])[1];
    let h = '<p class="m-hint">Take your class\'s starting equipment package, or start with gold to buy your own gear.</p><div class="dndb-grid" style="grid-template-columns:1fr;">';
    h += '<div class="dndb-card' + (st.equipChoice === "gear" ? " on" : "") + '" data-equip="gear"><div class="dc-title">Equipment Package</div><div class="dc-sub dc-plain">' + esc(gear || "—") + '</div></div>';
    if (goldN) h += '<div class="dndb-card' + (st.equipChoice === "gold" ? " on" : "") + '" data-equip="gold"><div class="dc-title">Starting Gold</div><div class="dc-sub dc-plain">' + esc(goldN) + ' GP to spend on your own gear</div></div>';
    h += "</div>";
    return h;
  }
  function rReview() {
    const sc = finalScores(), c = clsData(), b = bgData();
    const bgSkills = b ? (b.skillProficiencies || []) : [];
    let h = '<p class="m-hint">Here\'s your character. Building applies it to the sheet (replacing the current contents).</p>';
    h += '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">' +
         '<label style="flex:1 1 220px;"><span class="m-lbl">Character name</span><input type="text" id="dndb-name" class="m-input" placeholder="Aelric Thornwood" value="' + esc(st.name) + '"></label>' +
         '<label><span class="m-lbl">Alignment</span><select id="dndb-align" class="m-input" style="width:auto;">' +
           '<option value="">—</option>' + ALIGNMENTS.map((a) => '<option value="' + a + '"' + (st.alignment === a ? " selected" : "") + '>' + a + '</option>').join("") + '</select></label>' +
         '</div>';
    h += '<div class="dndb-review">';
    const clsLabel = (st.multiclass && st.multiclass.length) ? classBreakdown().map((cl) => cl.cls + " " + cl.level).join(" / ") : (esc(st.cls || "—") + " " + st.level + (st.subclass ? " · " + esc(st.subclass) : ""));
    h += '<div class="dr-line"><b>' + esc(st.name || "Unnamed") + '</b> — ' + esc(st.species || "—") + (st.lineage ? " (" + esc(st.lineage) + ")" : "") + ' ' + clsLabel + ' · ' + esc(st.background || "—") + (st.alignment ? " · " + esc(st.alignment) : "") + '</div>';
    h += '<div class="dr-scores">' + ABIL.map((a) => '<div class="drs"><span class="drs-a">' + a + '</span><span class="drs-v">' + sc[a] + '</span><span class="drs-m">' + sgn(mod(sc[a])) + '</span></div>').join("") + '</div>';
    if (c) h += '<div class="dr-line">Saves: <b>' + esc((c.savingThrows||[]).join(", ")) + '</b> · Hit Die d' + c.hitDie + '</div>';
    h += '<div class="dr-line">Skills: <b>' + esc(bgSkills.concat(st.classSkills).join(", ") || "—") + '</b>' + (st.expertise.length ? ' · Expertise: <b>' + esc(st.expertise.join(", ")) + '</b>' : "") + '</div>';
    if (st.fightingStyle) h += '<div class="dr-line">Fighting Style: <b>' + esc(st.fightingStyle) + '</b></div>';
    Object.keys(st.orders || {}).forEach((k) => { if (st.orders[k]) h += '<div class="dr-line">' + esc(k) + ': <b>' + esc(st.orders[k]) + '</b></div>'; });
    if (b) h += '<div class="dr-line">Origin feat: <b>' + esc(b.feat) + '</b></div>';
    if (st.advances && st.advances.length) {
      const advTxt = st.advances.map((av) => av.mode === "feat" ? (av.feat || "—") : ("ASI " + ABIL.filter((a)=>av.asi[a]).map((a)=>a+" +"+av.asi[a]).join(" ")) ).filter(Boolean).join(" · ");
      if (advTxt) h += '<div class="dr-line">Advancement: <b>' + esc(advTxt) + '</b></div>';
    }
    if (isCaster()) {
      const spells = st.pickedCantrips.concat(st.pickedSpells);
      h += '<div class="dr-line">Spells: <b>' + esc(spells.join(", ") || "none chosen") + '</b></div>';
    }
    const c2 = clsData(); const eq = c2 && c2.startingEquipment ? c2.startingEquipment : [];
    h += '<div class="dr-line">Starting gear: <b>' + esc(st.equipChoice === "gold" ? ((String(eq[1] || "").match(/(\d+)\s*GP/i) || [])[1] || "0") + " GP" : "Equipment package") + '</b></div>';
    h += "</div>";
    return h;
  }

  // ── wiring ─────────────────────────────────────────────────────────────
  function wire() {
    const body = $("dndb-body");
    const lvl = $("dndb-level"); if (lvl) lvl.addEventListener("input", () => { st.level = Math.max(1, Math.min(20, parseInt(lvl.value,10) || 1)); while (secondaryTotal() > st.level - 1 && st.multiclass.length) st.multiclass.pop(); render(); });
    const nm = $("dndb-name"); if (nm) nm.addEventListener("input", () => { st.name = nm.value; });
    const al = $("dndb-align"); if (al) al.addEventListener("change", () => { st.alignment = al.value; });
    body.querySelectorAll("[data-cls]").forEach((el) => el.addEventListener("click", () => { st.cls = el.dataset.cls; st.subclass = ""; st.multiclass = []; st.fightingStyle = ""; st.expertise = []; st.orders = {}; st.pickedCantrips = []; st.pickedSpells = []; render(); }));
    body.querySelectorAll("[data-mc]").forEach((el) => el.addEventListener("click", () => { const i = num(el.dataset.mc), d = num(el.dataset.d); const m = st.multiclass[i]; if(!m) return; const nv = num(m.level) + d; if(nv < 1){ st.multiclass.splice(i,1); } else if(secondaryTotal() - num(m.level) + nv <= num(st.level) - 1){ m.level = nv; } render(); }));
    body.querySelectorAll("[data-mcx]").forEach((el) => el.addEventListener("click", () => { st.multiclass.splice(num(el.dataset.mcx),1); render(); }));
    const mca = $("dndb-mc-add"); if (mca) mca.addEventListener("change", () => { if(mca.value){ st.multiclass.push({ cls: mca.value, level: 1 }); render(); } });
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
    // class choices
    body.querySelectorAll("[data-style]").forEach((el) => el.addEventListener("click", () => { st.fightingStyle = st.fightingStyle === el.dataset.style ? "" : el.dataset.style; render(); }));
    body.querySelectorAll("[data-exp]").forEach((el) => el.addEventListener("click", () => {
      const s = el.dataset.exp, max = parseInt(el.dataset.max,10);
      const i = st.expertise.indexOf(s);
      if (i >= 0) st.expertise.splice(i,1); else { if (st.expertise.length >= max) st.expertise.shift(); st.expertise.push(s); }
      render();
    }));
    body.querySelectorAll("[data-order]").forEach((el) => el.addEventListener("click", () => { st.orders = st.orders || {}; st.orders[el.dataset.order] = el.dataset.opt; render(); }));
    // Advancement (B1): ASI/feat mode toggle, ASI +/- (2-pt budget, cap 20), feat pick
    body.querySelectorAll("[data-advmode]").forEach((el) => el.addEventListener("click", () => { const i = num(el.dataset.i); st.advances[i].mode = el.dataset.advmode; if (el.dataset.advmode === "asi") st.advances[i].feat = ""; else st.advances[i].asi = {}; render(); }));
    body.querySelectorAll("[data-advasi]").forEach((el) => el.addEventListener("click", () => {
      const i = num(el.dataset.i), a = el.dataset.advasi, d = num(el.dataset.d), av = st.advances[i];
      const cur = av.asi[a]||0, total = ABIL.reduce((s,x)=>s+(av.asi[x]||0),0), base = finalScores()[a], nv = cur + d;
      if (nv < 0 || nv > 2) return;
      if (d > 0 && total >= 2) return;
      if (d > 0 && base + nv > 20) return;
      av.asi[a] = nv; if (!nv) delete av.asi[a]; render();
    }));
    body.querySelectorAll(".dndb-adv-feat").forEach((el) => el.addEventListener("change", () => { st.advances[num(el.dataset.i)].feat = el.value; render(); }));
    // spells: ⓘ toggles the inline description without selecting the card
    body.querySelectorAll("[data-info]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); const c = el.closest("[data-spell]"); const d = c && c.querySelector(".sp-pick-desc"); if(d) d.hidden = !d.hidden; }));
    body.querySelectorAll("[data-spell]").forEach((el) => el.addEventListener("click", () => {
      const n = el.dataset.spell, kind = el.dataset.kind, max = parseInt(el.dataset.max,10);
      const arr = kind === "cantrip" ? st.pickedCantrips : st.pickedSpells;
      const i = arr.indexOf(n);
      if (i >= 0) arr.splice(i,1); else { if (arr.length >= max) arr.shift(); arr.push(n); }
      render();
    }));
    // equipment
    body.querySelectorAll("[data-equip]").forEach((el) => el.addEventListener("click", () => { st.equipChoice = el.dataset.equip; render(); }));
    updTotals(); updSkillCount();
  }
  function pbAdjust(a, d) {
    const costs = (D.tables() && D.tables().pointBuyCosts) || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};
    const budget = (D.tables() && D.tables().pointBuyBudget) || 27;
    const nx = st.base[a] + d;
    if (nx < 8 || nx > 15) return;
    let spent = 0; ABIL.forEach((x) => spent += (costs[x===a?nx:st.base[x]] || 0));
    if (spent > budget) return;
    st.base[a] = nx;
    const cell = $("dndb-pb-" + a); if (cell) cell.textContent = nx;
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
      case "Choices": {
        for (const ch of classChoices()) {
          if (ch.kind === "style" && !st.fightingStyle) return false;
          if (ch.kind === "expertise" && st.expertise.length < ch.count && proficientSkills().length >= ch.count) return false;
          if (ch.kind === "pick" && !(st.orders || {})[ch.name]) return false;
        }
        return true;
      }
      case "Advancement": {
        const n = asiSlots();
        for (let i = 0; i < n; i++) { const av = st.advances[i] || {}; if (av.mode === "feat") { if (!av.feat) return false; } else { if (ABIL.reduce((s,a)=>s+((av.asi||{})[a]||0),0) !== 2) return false; } }
        return true;
      }
      case "Spells": {
        if (!isCaster()) return true;
        if (st.pickedCantrips.length < cantripCount()) return false;
        const sc = preparedCount(); if (sc > 0 && maxSpellLevel() >= 1 && st.pickedSpells.length < sc) return false;
        return true;
      }
      default: return true;
    }
  }

  // ── apply ──────────────────────────────────────────────────────────────
  function apply() {
    const sc = finalScores(), c = clsData(), b = bgData(), sp = spData();
    const saveProf = {}; if (c) (c.savingThrows || []).forEach((s) => saveProf[s] = true);
    const skillProf = {};
    if (b) (b.skillProficiencies || []).forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 1; });
    st.classSkills.forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 1; });
    st.expertise.forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 2; });
    // ── feats: background origin feat + fighting style + advancement (B1) ──
    const addedFeats = [];
    if (b && b.feat) addedFeats.push(b.feat);
    if (st.fightingStyle) addedFeats.push(st.fightingStyle);
    (st.advances || []).forEach((av) => { if (av.mode === "feat" && av.feat) addedFeats.push(av.feat); });
    // Advancement ASIs (B1) then feat ability increases (B4) — applied to scores
    // BEFORE HP/AC so their Con/Dex changes count.
    (st.advances || []).forEach((av) => { if (av.mode !== "feat" && av.asi) ABIL.forEach((a) => { if (av.asi[a]) sc[a] = Math.min(20, (sc[a] || 10) + av.asi[a]); }); });
    let featHP = 0;
    addedFeats.forEach((fn) => { const fe = window.DNDCALC.featEffects(fn, num(st.level)); featHP += fe.hpBonus; ABIL.forEach((a) => { if (fe.abil[a]) sc[a] = Math.min(20, (sc[a] || 10) + fe.abil[a]); }); });
    // HP: very first level = max die; every level after = its own class's average. (+ feat HP, e.g. Tough)
    let hp = 0; const conMod = mod(sc.CON); let firstLvl = true;
    classBreakdown().forEach((cl) => { const cc = D.classes().find((x) => x.name === cl.cls); const hd = cc ? cc.hitDie : 8; for (let L=1; L<=cl.level; L++){ hp += (firstLvl ? hd : Math.floor(hd/2)+1) + conMod; firstLvl = false; } });
    hp = Math.max(1, hp + featHP);
    const speed = sp ? sp.speed : 30;
    const ac = 10 + mod(sc.DEX);
    // proficiency text
    const profBits = [];
    if (c && c.proficiencies) { ["armor","weapons","tools"].forEach((k) => { if (c.proficiencies[k] && c.proficiencies[k].length) profBits.push(c.proficiencies[k].join(", ")); }); }
    if (b && b.toolProficiencies && b.toolProficiencies.length) profBits.push(b.toolProficiencies.join(", "));
    // B3: multiclass secondary classes contribute their armor/weapon proficiencies.
    (st.multiclass || []).forEach((m) => { const mc = D.classes().find((x) => x.name === m.cls); if (mc && mc.proficiencies) ["armor","weapons"].forEach((k) => { if (mc.proficiencies[k] && mc.proficiencies[k].length) profBits.push(m.cls + ": " + mc.proficiencies[k].join(", ")); }); });
    // Species + lineage traits (B2) are populated by the sheet's autoFeatures()
    // from the saved species/lineage, so the builder doesn't duplicate them here.
    const customFeatures = [];
    // order grants (extra weapon/armor training)
    classChoices().forEach((ch) => {
      if (ch.kind === "pick") {
        const opt = (ch.options || []).find((o) => o.name === (st.orders || {})[ch.name]);
        if (opt) { customFeatures.push({ name: ch.name + ": " + opt.name, desc: opt.desc || "", meta: "Class Feature" }); if (opt.prof) profBits.push(opt.prof); }
      }
    });
    // starting equipment vs gold
    let inv = [], gp = 0;
    if (st.equipChoice === "gold" && c && c.startingEquipment) {
      const g = (String(c.startingEquipment[1] || "").match(/(\d+)\s*GP/i) || [])[1];
      gp = g ? parseInt(g, 10) : 0;
    } else if (c && c.startingEquipment && c.startingEquipment[0]) {
      c.startingEquipment[0].split(/,\s*/).forEach((x) => {
        const t = x.trim();
        const gold = t.match(/^(\d+)\s*GP$/i); if(gold){ gp += parseInt(gold[1], 10); return; }   // gold → coins, not an item
        const m = t.match(/^(\d+)\s+(.*)/);
        const item = resolveItem(m ? m[2] : t);
        inv.push({ name: item.name, ref: item.ref, qty: m ? parseInt(m[1], 10) : 1 });
      });
    }
    // spells
    const spellsKnown = st.pickedCantrips.map((n) => ({ name:n, prepared:true }))
      .concat(st.pickedSpells.map((n) => ({ name:n, prepared:true })));
    const spellcasts = isCaster();
    const data = {
      system:"DND", v:1, name: st.name, cls: st.cls, level: st.level, subclass: st.subclass,
      classLevels: classBreakdown(),
      species: st.species, background: st.background, alignment: st.alignment,
      scores: sc, saveProf, skillProf,
      speed: String(speed), ac: String(ac), hpCur: hp, hpMax: hp, hpTemp:0,
      hitdice: hitDiceString(),
      attacks: [], inventory: inv, gp: gp, sp:0, cp:0,
      proficiencies: profBits.join(" · "), notes:"",
      customFeatures, addedFeats, spellsKnown, slotUsed:{},
      forceSpells: false, spellAbility: (spellcasts && c.spellcastingAbility) ? c.spellcastingAbility : "",
      lineage: st.lineage,
    };
    if (typeof window.applySheet === "function") window.applySheet(data);
    if (document.getElementById("f-lineage")) document.getElementById("f-lineage").value = st.lineage || "";
    if (typeof window.renderFeatures === "function") window.renderFeatures();
    if (typeof window.renderSpells === "function") window.renderSpells();
    if (typeof window.saveSheet === "function") window.saveSheet(true);
    if (typeof window.addLog === "function") window.addLog("Character Built", "✨", (st.name || st.cls || "Character") + " — " + (st.cls || "") + " " + st.level, "normal");
    close();
  }
  function norm(s) { return String(s == null ? "" : s).trim().toLowerCase(); }
  function matchSkill(name) { const n = norm(name); const s = D.skills().find((x) => norm(x.name) === n); return s ? s.name : null; }

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
    ".dc-sub.dc-plain{text-transform:none;letter-spacing:0;font-size:12px;color:#cdc3b6;line-height:1.4;}" +
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
    ".dndb-review .dr-line{font-size:13px;color:#cdc3b6;line-height:1.6;margin-top:6px;}.dndb-review b{color:#f0e0d6;}" +
    ".dndb-card.spellpick .sp-pick-hd{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;}" +
    ".sp-pick-i{background:transparent;border:none;color:#8ad4ff;font-size:14px;cursor:pointer;padding:0 2px;line-height:1;flex-shrink:0;}" +
    ".sp-pick-i:hover{color:#c8e8ff;}" +
    ".sp-pick-desc{font-size:11px;color:#cdc3b6;line-height:1.45;margin-top:5px;border-top:1px solid #3a2f2a;padding-top:5px;}" +
    ".dndb-mc-rows{display:flex;flex-direction:column;gap:6px;margin:6px 0;}" +
    ".dndb-mc-row{display:flex;align-items:center;gap:8px;}" +
    ".dndb-mc-name{flex:1;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#ece3d6;}" +
    ".dndb-mc-x{background:transparent;border:none;color:#a99e90;cursor:pointer;font-size:13px;}.dndb-mc-x:hover{color:#e08a70;}";
  document.head.appendChild(css);
})();
