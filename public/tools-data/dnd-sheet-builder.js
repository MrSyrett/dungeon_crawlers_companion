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
  const STEPS = ["Options","Class","Subclass","Species","Background","Abilities","Skills","Choices","Advancement","Spells","Equipment","Review"];
  // Level-1 (and level-gated) class decisions the builder can offer from data.
  const CLASS_CHOICES = {
    Fighter: [{ kind:"style", level:1 }],
    Paladin: [{ kind:"style", level:2 }],
    Ranger:  [{ kind:"expertise", level:2, count:1, note:"Deft Explorer" }, { kind:"style", level:2 }],
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
             name:"", alignment:"", eberron:true, au:true,
             fightingStyle:"", expertise:[], orders:{}, advances:[],
             spChoices:{}, bgChoices:{},   // sub-choices: species traits / background Origin feat (window.DNDCH)
             pickedCantrips:[], pickedSpells:[], spellsAvail:true, equipChoice:"gear", equipPkg:0 };
  }
  function clsData() { return D.classes().find((c) => c.name === st.cls) || null; }
  function spData() { return D.species().find((s) => s.name === st.species) || null; }
  function bgData() { return D.backgrounds().find((b) => b.name === st.background) || null; }
  // Expansion gating: hide Eberron / Arcana Unleashed content when its box is off.
  function allowSrc(x) { return (!x || ((x.source !== "eberron" || st.eberron) && (x.source !== "arcana-unleashed" || st.au))); }
  function pruneDisallowed() {
    if (st.cls) { const c = D.classes().find((x) => x.name === st.cls); if (c && !allowSrc(c)) { st.cls = ""; st.subclass = ""; st.multiclass = []; st.fightingStyle = ""; st.expertise = []; st.orders = {}; st.pickedCantrips = []; st.pickedSpells = []; } }
    if (st.subclass) { const c = clsData(); const sub = c && (c.subclasses || []).find((x) => x.name === st.subclass); if (sub && !allowSrc(sub)) st.subclass = ""; }
    if (st.species) { const sp = D.species().find((x) => x.name === st.species); if (sp && !allowSrc(sp)) { st.species = ""; st.lineage = ""; } }
    if (st.background) { const b = D.backgrounds().find((x) => x.name === st.background); if (b && !allowSrc(b)) st.background = ""; }
    st.multiclass = (st.multiclass || []).filter((m) => { const c = D.classes().find((x) => x.name === m.cls); return c && allowSrc(c); });
    (st.advances || []).forEach((av) => { if (av.feat) { const f = D.feats().find((x) => x.name === av.feat); if (f && !allowSrc(f)) av.feat = ""; } });
    (st.pickedSpells || []).forEach((n, i) => {}); st.pickedSpells = (st.pickedSpells || []).filter((n) => { const sp = D.spells().find((x) => x.name === n); return !sp || allowSrc(sp); });
    st.pickedCantrips = (st.pickedCantrips || []).filter((n) => { const sp = D.spells().find((x) => x.name === n); return !sp || allowSrc(sp); });
  }
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
  function spellInList(s, nm) {
    const fn = (window.DNDCALC && window.DNDCALC.spellInList) ? window.DNDCALC.spellInList : (sp, c) => (sp.classes || []).includes(c);
    return fn(s, nm);
  }
  // A spell is pickable only if it's on this class's list (regardless of the
  // "available to me" browse toggle).
  function classEligible(s) { return spellInList(s, st.cls); }
  // The picker's spell list. "available to me" on → only this class's spells;
  // off → every class's spells in range (to browse), with non-eligible ones
  // shown but their +Add disabled.
  function spellsFor(minL, maxL, avail) {
    return D.spells().filter((s) => s.level >= minL && s.level <= maxL && allowSrc(s) && (avail === false ? true : classEligible(s)))
      .sort((a, b) => (a.level - b.level) || a.name.localeCompare(b.name));
  }
  function fightingStyles() { return D.feats().filter((f) => (f.category || "") === "Fighting Style" && allowSrc(f)); }
  function classChoices() { return (CLASS_CHOICES[st.cls] || []).filter((ch) => primaryLevel() >= (ch.level || 1)); }
  function proficientSkills() { const b = bgData(); const bg = b ? (b.skillProficiencies || []) : []; const out = []; bg.concat(st.classSkills).concat(choiceEffects().skills).forEach((s) => { const r = matchSkill(s); if (r && out.indexOf(r) < 0) out.push(r); }); return out; }

  // ── sub-choices (window.DNDCH): species traits, the background's Origin feat,
  //    and every Advancement feat can each ask for further picks ─────────
  const CH = () => window.DNDCH || null;
  // Context for option lists: skills already proficient (so a feat can't re-pick
  // one, and Expertise offers only those), the build level, and expansion gating.
  function chCtx(excludeRoot) {
    const b = bgData(); const prof = [];
    const add = (n) => { const r = matchSkill(n); if (r && prof.indexOf(r) < 0) prof.push(r); };
    (b ? (b.skillProficiencies || []) : []).forEach(add); st.classSkills.forEach(add);
    // skills from OTHER choice roots count as taken; a root never blocks its own picks
    choiceRoots().forEach((r) => { if (r.root !== excludeRoot) r.fx().skills.forEach(add); });
    return { prof, level: num(st.level), allowSrc };
  }
  function speciesSpecs() { return (CH() && st.species) ? CH().speciesSpecs(st.species, st.lineage, { level: num(st.level) }, st.spChoices) : []; }
  function bgFeatSpecs() { const b = bgData(); return (CH() && b && b.feat) ? CH().featSpecs(b.feat, st.bgChoices) : []; }
  function advFeatSpecs(av) { return (CH() && av && av.mode === "feat" && av.feat) ? CH().featSpecs(av.feat, av.choices || (av.choices = {})) : []; }
  // Every choice root: { root, state, fx() } — fx() = its concrete effects.
  function choiceRoots() {
    const out = []; const ch = CH(); if (!ch) return out;
    const b = bgData();
    if (st.species) out.push({ root:"species", state: st.spChoices, fx: () => ch.speciesEffects(st.species, st.lineage, { level: num(st.level) }, st.spChoices) });
    if (b && b.feat) out.push({ root:"bg", state: st.bgChoices, fx: () => ch.featEffects(b.feat, st.bgChoices) });
    (st.advances || []).forEach((av, i) => { if (av.mode === "feat" && av.feat) out.push({ root:"adv:" + i, state: av.choices || (av.choices = {}), fx: () => ch.featEffects(av.feat, av.choices || {}) }); });
    return out;
  }
  function choiceEffects() {
    const out = { abil:{}, skills:[], expertise:[], saves:[], spells:[], profs:[], picks:[] };
    choiceRoots().forEach((r) => { const fx = r.fx(); Object.keys(fx.abil).forEach((k) => out.abil[k] = (out.abil[k] || 0) + fx.abil[k]); ["skills","expertise","saves","spells","profs","picks"].forEach((k) => out[k] = out[k].concat(fx[k])); });
    return out;
  }
  function choiceState(root) { const r = choiceRoots().find((x) => x.root === root); return r ? r.state : null; }
  function choicesHTML(specs, state, root) { return CH() ? CH().renderChoices(specs, state, chCtx(root), root) : ""; }

  // ── modal shell ────────────────────────────────────────────────────────
  function ensureModal() {
    if ($("dndb-overlay")) return;
    const ov = document.createElement("div");
    ov.className = "ov"; ov.id = "dndb-overlay";
    ov.innerHTML =
      '<div class="modal wide" style="max-width:720px;">' +
        '<div class="modal-hd"><div class="ttl">Character Builder <span id="dndb-step" style="color:#8ad4ff;font-size:12px;letter-spacing:.08em;margin-left:8px;"></span></div><button class="x" onclick="DNDB.close()">✕</button></div>' +
        '<div class="modal-bd" id="dndb-body"></div>' +
        '<div class="modal-ft"><div><button class="m-btn ghost" id="dndb-back" onclick="DNDB.back()">← Back</button></div>' +
        '<div style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="DNDB.close()">Cancel</button><button class="m-btn" id="dndb-next" onclick="DNDB.next()">Next →</button></div></div>' +
      '</div>';
    // Backdrop click no longer closes the builder (prevents losing build progress) — use the ✕.
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
    const fn = { Options:rOptions, Class:rClass, Subclass:rSubclass, Species:rSpecies, Background:rBackground, Abilities:rAbilities, Skills:rSkills, Choices:rChoices, Advancement:rAdvancement, Spells:rSpells, Equipment:rEquipment, Review:rReview }[STEPS[step]];
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
  function rOptions() {
    let h = '<p class="m-hint">Name your hero and set a starting level, then choose which content is available as you build.</p>';
    h += '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin-bottom:16px;">' +
         '<label style="flex:1 1 220px;"><span class="m-lbl">Character name</span><input type="text" id="dndb-name" class="m-input" placeholder="Aelric Thornwood" value="' + esc(st.name) + '"></label>' +
         '<label><span class="m-lbl">Starting level</span> <select id="dndb-level" class="m-input" style="width:90px;">' + Array.from({ length: 20 }, (_, i) => '<option value="' + (i+1) + '"' + (num(st.level) === i+1 ? " selected" : "") + '>' + (i+1) + '</option>').join("") + '</select></label>' +
         '</div>';
    h += '<span class="m-lbl">Expansion content</span><p class="m-hint" style="margin:2px 0 8px;">Leave an expansion unchecked to hide its options \u2014 classes, subclasses, species, backgrounds, feats, and spells \u2014 throughout character creation.</p>';
    h += '<div class="dndb-opt' + (st.eberron ? " on" : "") + '" id="dndb-opt-eberron"><div class="dnb-main"><span class="dnb-check">' + (st.eberron ? "\u2713" : "") + '</span><div><div class="dnb-ttl">Eberron: Forge of the Artificer</div><div class="dnb-sub">The Artificer class; Changeling, Kalashtar, Khoravar, Shifter &amp; Warforged species; dragonmark backgrounds &amp; feats; and Eberron magic items.</div></div></div></div>';
    h += '<div class="dndb-opt' + (st.au ? " on" : "") + '" id="dndb-opt-au"><div class="dnb-main"><span class="dnb-check">' + (st.au ? "\u2713" : "") + '</span><div><div class="dnb-ttl">Arcana Unleashed</div><div class="dnb-sub">New subclasses, backgrounds, feats, spells, and magic items from the Arcana Unleashed expansion.</div></div></div></div>';
    return h;
  }
  function rClass() {
    let h = '<p class="m-hint">Pick your class. The sheet fills in its features, saving throws, and (for casters) spellcasting.</p>';
    h += '<div class="dndb-grid">';
    D.classes().filter(allowSrc).forEach((c) => {
      const cast = c.spellcasting && c.spellcasting !== "none" ? c.spellcasting + " caster" : "martial";
      h += card('data-cls="' + esc(c.name) + '"', st.cls === c.name, c.name, "d" + c.hitDie + " · " + (c.primaryAbility||[]).join("/") + " · " + cast);
    });
    h += "</div>";
    const c = clsData();
    if (c) h += CH() ? CH().classDetail(c, primaryLevel()) : '<div class="dndb-note">' + esc(c.flavor || "") + '</div>';
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
    const others = D.classes().filter((c) => !taken.has(norm(c.name)) && allowSrc(c));
    if (others.length && secondaryTotal() < num(st.level) - 1){
      h += '<select id="dndb-mc-add" class="m-input" style="margin-top:6px;"><option value="">+ Add a class…</option>' +
        others.map((c) => '<option value="' + esc(c.name) + '">' + esc(c.name) + '</option>').join("") + '</select>';
    }
    return h;
  }
  function rSubclass() {
    const c = clsData(); if (!c) return "<p>Pick a class first.</p>";
    let h = '<p class="m-hint">Your ' + esc(c.name) + ' chooses a ' + esc(c.subclassLabel || "subclass") + ' at level ' + (c.subclassLevel||3) + '.</p><div class="dndb-grid">';
    (c.subclasses || []).filter(allowSrc).forEach((s) => h += card('data-sub="' + esc(s.name) + '"', st.subclass === s.name, s.name, s.source === "srd" ? "SRD" : (s.source||"").toUpperCase()));
    h += "</div>";
    const sub = (c.subclasses||[]).find((s) => s.name === st.subclass);
    if (sub) h += CH() ? CH().subclassDetail(c, sub, primaryLevel()) : '<div class="dndb-note">' + esc(sub.flavor || "") + '</div>';
    return h;
  }
  function rSpecies() {
    let h = '<p class="m-hint">Choose a species. Some have a lineage to pick as well.</p><div class="dndb-grid">';
    D.species().filter(allowSrc).forEach((s) => h += card('data-species="' + esc(s.name) + '"', st.species === s.name, s.name, "Speed " + s.speed + (s.darkvision ? " · Darkvision " + s.darkvision : "")));
    h += "</div>";
    const sp = spData();
    if (sp) h += CH() ? CH().speciesDetail(sp, "") : '<div class="dndb-note">' + esc(sp.flavor || "") + '</div>';
    if (sp && sp.lineages && sp.lineages.length) {
      h += '<span class="m-lbl">Lineage</span><div class="dndb-grid">';
      sp.lineages.forEach((l) => h += card('data-lin="' + esc(l.name) + '"', st.lineage === l.name, l.name, (l.traits || []).map((t) => t.name).join(" · ")));
      h += "</div>";
      const ln = sp.lineages.find((l) => l.name === st.lineage);
      if (ln && CH()) h += CH().lineageDetail(sp, ln);
    }
    // Trait choices (Human's skill + Origin feat, Keen Senses, Draconic Ancestry, a lineage's spellcasting ability…)
    if (sp) { const specs = speciesSpecs(); if (specs.length) h += '<span class="m-lbl" style="display:block;margin-top:12px;">Species choices</span>' + choicesHTML(specs, st.spChoices, "species"); }
    return h;
  }
  function rBackground() {
    let h = '<p class="m-hint">Your background grants two skills, a tool, an Origin feat, and three ability scores you can raise.</p><div class="dndb-grid">';
    D.backgrounds().filter(allowSrc).forEach((b) => h += card('data-bg="' + esc(b.name) + '"', st.background === b.name, b.name, (b.abilityScores||[]).join("/") + " · " + b.feat));
    h += "</div>";
    const b = bgData();
    if (b) h += CH() ? CH().backgroundDetail(b) : '<div class="dndb-note"><b>' + esc(b.name) + '.</b> ' + esc(b.description || "") + '<br>Skills: <b>' + esc((b.skillProficiencies||[]).join(", ")) + '</b> · Feat: <b>' + esc(b.feat) + '</b></div>';
    // The Origin feat's own picks (Magic Initiate's list + spells, Skilled's three skills, …)
    if (b) { const specs = bgFeatSpecs(); if (specs.length) h += '<span class="m-lbl" style="display:block;margin-top:12px;">' + esc(b.feat) + ' — your choices</span>' + choicesHTML(specs, st.bgChoices, "bg"); }
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
    const bgSkills = (b ? (b.skillProficiencies || []) : []).concat(choiceEffects().skills);
    let h = '<p class="m-hint">You are automatically proficient in your background skills' + (choiceEffects().skills.length ? ' and the skills your species/feat choices granted' : '') + '. Choose your class skills.</p>';
    if (bgSkills.length) h += '<div class="dndb-note">Already proficient: <b>' + esc(bgSkills.join(", ")) + '</b></div>';
    if (c) {
      let from = c.proficiencies && c.proficiencies.skillsFrom && c.proficiencies.skillsFrom.length ? c.proficiencies.skillsFrom : D.skills().map((s) => s.name);
      // "Any" means the class chooses from the full skill list (e.g. Bard). Expand it.
      if (from.some((s) => /^any$/i.test(String(s).trim()))) from = D.skills().map((s) => s.name);
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
      h += '<div style="border:1px solid #3a3a41;border-radius:6px;padding:8px 10px;margin-bottom:8px;">';
      h += '<span class="m-lbl">Improvement ' + (i+1) + '</span>';
      h += '<div class="dndb-seg" style="margin:4px 0 8px;"><button class="dndb-seg-btn' + (av.mode!=="feat"?" on":"") + '" data-advmode="asi" data-i="' + i + '">Ability Scores</button><button class="dndb-seg-btn' + (av.mode==="feat"?" on":"") + '" data-advmode="feat" data-i="' + i + '">Feat</button></div>';
      if (av.mode === "feat") {
        // An ASI slot takes a General feat (Epic Boon only at level 19+). Origin feats come
        // from the background, and Fighting Style feats from the class choice step.
        h += '<select class="m-input dndb-adv-feat" data-i="' + i + '"><option value="">Select a feat…</option>' +
          D.feats().filter((f) => { if (!allowSrc(f)) return false; const cat = f.category || ""; if (cat === "General") return true; if (cat === "Epic Boon") return (st.level || 1) >= 19; return false; }).slice().sort((a,b)=>a.name.localeCompare(b.name)).map((f) => '<option value="' + esc(f.name) + '"' + (av.feat===f.name?" selected":"") + '>' + esc(f.name) + " — " + esc(f.category) + '</option>').join("") + '</select>';
        const f = D.feats().find((x) => x.name === av.feat);
        if (f) { h += CH() ? CH().featDetail(f.name) : '<div class="dndb-note">' + esc((f.benefits||[]).join(" ") || "") + '</div>'; const specs = advFeatSpecs(av); if (specs.length) h += choicesHTML(specs, av.choices, "adv:" + i); }
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
    const avail = st.spellsAvail !== false;
    let h = '<p class="m-hint">Choose your starting spells for the ' + esc(st.cls) + '. You can change these on the sheet anytime.</p>';
    h += '<label class="brow-check spl-avail"><input type="checkbox" data-spavail' + (avail ? " checked" : "") + '> Spells available to me</label>';
    if (cCount > 0) {
      h += '<span class="m-lbl">Cantrips — choose ' + cCount + ' <span style="color:#8ad4ff;">(' + st.pickedCantrips.length + '/' + cCount + ')</span></span>';
      h += window.DNDCALC.spellPickerHTML(spellsFor(0, 0, avail), {
        selected: (n) => st.pickedCantrips.includes(n),
        disabledAdd: (s) => !classEligible(s) || st.pickedCantrips.length >= cCount,
        emptyHTML: '<p class="spl-empty">No cantrips available.</p>',
      });
    }
    if (sCount > 0 && maxL >= 1) {
      h += '<span class="m-lbl">Spells — choose ' + sCount + ' (up to level ' + maxL + ') <span style="color:#8ad4ff;">(' + st.pickedSpells.length + '/' + sCount + ')</span></span>';
      h += window.DNDCALC.spellPickerHTML(spellsFor(1, maxL, avail), {
        selected: (n) => st.pickedSpells.includes(n),
        disabledAdd: (s) => !classEligible(s) || st.pickedSpells.length >= sCount,
        emptyHTML: '<p class="spl-empty">No spells available.</p>',
      });
    }
    return h;
  }
  // startingEquipment is irregular across classes: sometimes one comma-joined package
  // string, sometimes a package spread over several array entries, sometimes multiple
  // alternative packages. Entries beginning with "or " start a new alternative; the
  // pure "N GP" entry is the gold option. Returns { packages:[[item,…],…], gold }.
  function parseEquip(c) {
    const eq = (c && c.startingEquipment) ? c.startingEquipment : [];
    const groups = [];
    eq.forEach((raw) => {
      const s = String(raw).trim(), isAlt = /^or\s+/i.test(s), body = s.replace(/^or\s+/i, "");
      if (!groups.length || isAlt) groups.push([body]); else groups[groups.length - 1].push(body);
    });
    const packages = []; let gold = 0;
    groups.forEach((g) => {
      const items = [];
      g.forEach((part) => part.split(/,\s*/).forEach((x) => { const t = x.trim(); if (t) items.push(t); }));
      if (items.length === 1 && /^\d+\s*GP$/i.test(items[0])) { const n = parseInt(items[0], 10) || 0; if (n > gold) gold = n; }
      else if (items.length) packages.push(items);
    });
    return { packages, gold };
  }
  function rEquipment() {
    const c = clsData(), pe = parseEquip(c);
    if (st.equipPkg == null || st.equipPkg >= pe.packages.length) st.equipPkg = 0;
    let h = '<p class="m-hint">Take your class\'s starting equipment package, or start with gold to buy your own gear.</p><div class="dndb-grid" style="grid-template-columns:1fr;">';
    pe.packages.forEach((items, i) => {
      h += '<div class="dndb-card' + (st.equipChoice === "gear" && st.equipPkg === i ? " on" : "") + '" data-equip="gear" data-pkg="' + i + '"><div class="dc-title">' + (pe.packages.length > 1 ? "Equipment Option " + (i + 1) : "Equipment Package") + '</div><div class="dc-sub dc-plain">' + esc(items.join(", ")) + '</div></div>';
    });
    if (pe.gold) h += '<div class="dndb-card' + (st.equipChoice === "gold" ? " on" : "") + '" data-equip="gold"><div class="dc-title">Starting Gold</div><div class="dc-sub dc-plain">' + pe.gold + ' GP to spend on your own gear</div></div>';
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
    h += '<div class="dr-line">Skills: <b>' + esc(bgSkills.concat(st.classSkills).concat(choiceEffects().skills.filter((x) => !bgSkills.concat(st.classSkills).some((y) => norm(y) === norm(x)))).join(", ") || "—") + '</b>' + (st.expertise.length ? ' · Expertise: <b>' + esc(st.expertise.join(", ")) + '</b>' : "") + '</div>';
    if (st.fightingStyle) h += '<div class="dr-line">Fighting Style: <b>' + esc(st.fightingStyle) + '</b></div>';
    Object.keys(st.orders || {}).forEach((k) => { if (st.orders[k]) h += '<div class="dr-line">' + esc(k) + ': <b>' + esc(st.orders[k]) + '</b></div>'; });
    if (b) h += '<div class="dr-line">Origin feat: <b>' + esc(b.feat) + '</b>' + (CH() && CH().summary(bgFeatSpecs(), st.bgChoices) ? ' — ' + esc(CH().summary(bgFeatSpecs(), st.bgChoices)) : '') + '</div>';
    if (CH() && st.species) { const ss = CH().storedSummary({ species: st.spChoices }, "species", st.species, st.lineage, { level: num(st.level) }); if (ss) h += '<div class="dr-line">Species choices: <b>' + esc(ss) + '</b></div>'; }
    if (st.advances && st.advances.length) {
      const advTxt = st.advances.map((av) => av.mode === "feat" ? ((av.feat || "—") + (CH() && av.feat && CH().summary(advFeatSpecs(av), av.choices) ? " (" + CH().summary(advFeatSpecs(av), av.choices) + ")" : "")) : ("ASI " + ABIL.filter((a)=>av.asi[a]).map((a)=>a+" +"+av.asi[a]).join(" ")) ).filter(Boolean).join(" · ");
      if (advTxt) h += '<div class="dr-line">Advancement: <b>' + esc(advTxt) + '</b></div>';
    }
    if (isCaster()) {
      const spells = st.pickedCantrips.concat(st.pickedSpells);
      h += '<div class="dr-line">Spells: <b>' + esc(spells.join(", ") || "none chosen") + '</b></div>';
    }
    const c2 = clsData(); const eq = c2 && c2.startingEquipment ? c2.startingEquipment : [];
    h += '<div class="dr-line">Starting gear: <b>' + esc(st.equipChoice === "gold" ? (parseEquip(c).gold + " GP") : "Equipment package") + '</b></div>';
    h += "</div>";
    return h;
  }

  // ── wiring ─────────────────────────────────────────────────────────────
  function wire() {
    const body = $("dndb-body");
    const lvl = $("dndb-level"); if (lvl) lvl.addEventListener("change", () => { st.level = Math.max(1, Math.min(20, parseInt(lvl.value,10) || 1)); while (secondaryTotal() > st.level - 1 && st.multiclass.length) st.multiclass.pop(); render(); });
    const nm = $("dndb-name"); if (nm) nm.addEventListener("input", () => { st.name = nm.value; });
    const al = $("dndb-align"); if (al) al.addEventListener("change", () => { st.alignment = al.value; });
    const ebx = $("dndb-opt-eberron"); if (ebx) ebx.addEventListener("click", () => { st.eberron = !st.eberron; pruneDisallowed(); render(); });
    const aux = $("dndb-opt-au"); if (aux) aux.addEventListener("click", () => { st.au = !st.au; pruneDisallowed(); render(); });
    body.querySelectorAll("[data-cls]").forEach((el) => el.addEventListener("click", () => { st.cls = el.dataset.cls; st.subclass = ""; st.multiclass = []; st.fightingStyle = ""; st.expertise = []; st.orders = {}; st.pickedCantrips = []; st.pickedSpells = []; render(); }));
    body.querySelectorAll("[data-mc]").forEach((el) => el.addEventListener("click", () => { const i = num(el.dataset.mc), d = num(el.dataset.d); const m = st.multiclass[i]; if(!m) return; const nv = num(m.level) + d; if(nv < 1){ st.multiclass.splice(i,1); } else if(secondaryTotal() - num(m.level) + nv <= num(st.level) - 1){ m.level = nv; } render(); }));
    body.querySelectorAll("[data-mcx]").forEach((el) => el.addEventListener("click", () => { st.multiclass.splice(num(el.dataset.mcx),1); render(); }));
    const mca = $("dndb-mc-add"); if (mca) mca.addEventListener("change", () => { if(mca.value){ st.multiclass.push({ cls: mca.value, level: 1 }); render(); } });
    body.querySelectorAll("[data-sub]").forEach((el) => el.addEventListener("click", () => { st.subclass = el.dataset.sub; render(); }));
    // (species cards use data-species — the spell picker's rows carry data-sp, which must not select a species)
    body.querySelectorAll("[data-species]").forEach((el) => el.addEventListener("click", () => { if (st.species !== el.dataset.species) st.spChoices = {}; st.species = el.dataset.species; st.lineage = ""; render(); }));
    body.querySelectorAll("[data-lin]").forEach((el) => el.addEventListener("click", () => { st.lineage = el.dataset.lin; render(); }));
    body.querySelectorAll("[data-bg]").forEach((el) => el.addEventListener("click", () => { const b = D.backgrounds().find((x)=>x.name===el.dataset.bg); if (st.background !== el.dataset.bg) st.bgChoices = {}; st.background = el.dataset.bg; if (b) { st.bg2 = (b.abilityScores||[])[0] || ""; st.bg1 = (b.abilityScores||[])[1] || ""; } render(); }));
    body.querySelectorAll("[data-method]").forEach((el) => el.addEventListener("click", () => { st.method = el.dataset.method; render(); }));
    body.querySelectorAll(".dndb-array").forEach((el) => el.addEventListener("change", () => { const a = el.dataset.abil, v = el.value; ABIL.forEach((x) => { if (x !== a && String(st.arrayPick[x]) === String(v)) delete st.arrayPick[x]; }); if (v === "") delete st.arrayPick[a]; else st.arrayPick[a] = parseInt(v,10); render(); }));
    body.querySelectorAll(".dndb-manual").forEach((el) => el.addEventListener("input", () => { st.base[el.dataset.abil] = Math.max(1, Math.min(20, parseInt(el.value,10) || 8)); updTotals(); }));
    body.querySelectorAll(".dndb-pm").forEach((el) => el.addEventListener("click", () => { pbAdjust(el.dataset.pb, parseInt(el.dataset.d,10)); }));
    // The +2 and +1 must go to two DIFFERENT abilities (2024). If they collide, bump the other.
    const bgAbils = () => (bgData() || {}).abilityScores || [];
    const bg2 = $("dndb-bg2"); if (bg2) bg2.addEventListener("change", () => { st.bg2 = bg2.value; if (st.bg1 === st.bg2) st.bg1 = bgAbils().find((a) => a !== st.bg2) || ""; render(); });
    const bg1 = $("dndb-bg1"); if (bg1) bg1.addEventListener("change", () => { st.bg1 = bg1.value; if (st.bg2 === st.bg1) st.bg2 = bgAbils().find((a) => a !== st.bg1) || ""; render(); });
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
    body.querySelectorAll(".dndb-adv-feat").forEach((el) => el.addEventListener("change", () => { const av = st.advances[num(el.dataset.i)]; if (av.feat !== el.value) av.choices = {}; av.feat = el.value; render(); }));
    if (CH()) CH().wireChoices(body, choiceState, render);
    // spells: "available to me" toggle, expand-on-click, +Add / −Remove (cap
    // enforced by the Add button being disabled when the pool is full).
    body.querySelectorAll("[data-spavail]").forEach((el) => el.addEventListener("change", () => { st.spellsAvail = el.checked; render(); }));
    body.querySelectorAll("[data-sp-exp]").forEach((el) => el.addEventListener("click", (e) => { e.stopPropagation(); const row = el.closest("[data-sp]"); if(row){ row.classList.toggle("open"); const d = row.querySelector(".spl-desc"); if(d) d.hidden = !row.classList.contains("open"); } }));
    body.querySelectorAll("[data-sp-pick]").forEach((el) => el.addEventListener("click", () => {
      if (el.disabled) return;
      const n = el.getAttribute("data-sp-pick"), sp = D.spells().find((x) => x.name === n);
      const arr = (sp && sp.level === 0) ? st.pickedCantrips : st.pickedSpells;
      const i = arr.indexOf(n);
      if (i >= 0) arr.splice(i, 1); else arr.push(n);
      render();
    }));
    // equipment
    body.querySelectorAll("[data-equip]").forEach((el) => el.addEventListener("click", () => { st.equipChoice = el.dataset.equip; if (el.dataset.pkg != null) st.equipPkg = parseInt(el.dataset.pkg, 10) || 0; render(); }));
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
      case "Options": return true;
      case "Class": return !!st.cls;
      case "Subclass": return !hasSubclass() || !!st.subclass;
      case "Species": { const sp = spData(); if (!st.species) return false; if (sp && sp.lineages && sp.lineages.length && !st.lineage) return false; return !CH() || CH().complete(speciesSpecs(), st.spChoices); }
      case "Background": return !!st.background && (!CH() || CH().complete(bgFeatSpecs(), st.bgChoices));
      case "Abilities": {
        if (st.method === "array") return ABIL.every((a) => st.arrayPick[a] != null);
        if (st.method === "pointbuy") { const costs = (D.tables() && D.tables().pointBuyCosts) || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9}; const budget = (D.tables() && D.tables().pointBuyBudget) || 27; return ABIL.reduce((s,a) => s + (costs[st.base[a]] || 0), 0) <= budget; }
        return true;
      }
      case "Skills": { const c = clsData(); if (!c) return true; const n = (c.proficiencies && c.proficiencies.skillsChoose) ? c.proficiencies.skillsChoose : 2; return st.classSkills.length >= n; }
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
        for (let i = 0; i < n; i++) { const av = st.advances[i] || {}; if (av.mode === "feat") { if (!av.feat) return false; if (CH() && !CH().complete(advFeatSpecs(av), av.choices || {})) return false; } else { if (ABIL.reduce((s,a)=>s+((av.asi||{})[a]||0),0) !== 2) return false; } }
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
    // ── sub-choices (DNDCH): skills / expertise / saves / +1s / granted spells / proficiency text ──
    const fx = choiceEffects();
    fx.skills.forEach((s) => { const real = matchSkill(s); if (real && !skillProf[real]) skillProf[real] = 1; });
    fx.expertise.forEach((s) => { const real = matchSkill(s); if (real) skillProf[real] = 2; });
    fx.saves.forEach((a) => { saveProf[a] = true; });
    // ── feats: background origin feat + fighting style + advancement (B1) ──
    const addedFeats = [];
    if (b && b.feat) addedFeats.push(b.feat);
    if (st.fightingStyle) addedFeats.push(st.fightingStyle);
    (st.advances || []).forEach((av) => { if (av.mode === "feat" && av.feat) addedFeats.push(av.feat); });
    // the choices store the sheet keeps (so feature entries can show the picks and re-derive granted spells)
    const choices = {};
    if (st.species) choices.species = st.spChoices;
    if (b && b.feat) choices["feat:" + b.feat] = st.bgChoices;
    (st.advances || []).forEach((av) => { if (av.mode === "feat" && av.feat) choices["feat:" + av.feat] = av.choices || {}; });
    // a Human's Versatile feat is a real feat on the sheet too
    if (CH() && st.species) speciesSpecs().forEach((sp) => { if (sp.kind === "feat" && st.spChoices[sp.key]) { const fn = st.spChoices[sp.key]; if (addedFeats.indexOf(fn) < 0) addedFeats.push(fn); choices["feat:" + fn] = CH().subState(st.spChoices, sp.key); } });
    // Advancement ASIs (B1) then feat ability increases (B4) — applied to scores
    // BEFORE HP/AC so their Con/Dex changes count.
    (st.advances || []).forEach((av) => { if (av.mode !== "feat" && av.asi) ABIL.forEach((a) => { if (av.asi[a]) sc[a] = Math.min(20, (sc[a] || 10) + av.asi[a]); }); });
    let featHP = 0;
    addedFeats.forEach((fn) => { const fe = window.DNDCALC.featEffects(fn, num(st.level)); featHP += fe.hpBonus; });
    ABIL.forEach((a) => { if (fx.abil[a]) sc[a] = Math.min(20, (sc[a] || 10) + fx.abil[a]); });   // feat/trait +1s (chosen or fixed)
    // HP: very first level = max die; every level after = its own class's average. (+ feat HP, e.g. Tough)
    let hp = 0; const conMod = mod(sc.CON); let firstLvl = true;
    classBreakdown().forEach((cl) => { const cc = D.classes().find((x) => x.name === cl.cls); const hd = cc ? cc.hitDie : 8; for (let L=1; L<=cl.level; L++){ hp += (firstLvl ? hd : Math.floor(hd/2)+1) + conMod; firstLvl = false; } });
    if (sp && (sp.traits || []).some((t) => /dwarven toughness/i.test(t.name))) hp += num(st.level);   // +1 HP per level
    hp = Math.max(1, hp + featHP);
    const speed = sp ? sp.speed : 30;
    const ac = 10 + mod(sc.DEX);
    // proficiency text
    const profBits = [];
    if (c && c.proficiencies) { ["armor","weapons","tools"].forEach((k) => { if (c.proficiencies[k] && c.proficiencies[k].length) profBits.push(c.proficiencies[k].join(", ")); }); }
    if (b && b.toolProficiencies && b.toolProficiencies.length) profBits.push(b.toolProficiencies.join(", "));
    if (fx.profs.length) profBits.push(fx.profs.join(", "));   // tools / instruments / weapons chosen through feats and traits
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
    const pe = parseEquip(c);
    if (st.equipChoice === "gold") {
      gp = pe.gold;
    } else {
      const pkg = pe.packages[st.equipPkg || 0] || pe.packages[0] || [];
      pkg.forEach((t) => {
        const gold = t.match(/^(\d+)\s*GP$/i); if(gold){ gp += parseInt(gold[1], 10); return; }   // gold → coins, not an item
        const m = t.match(/^(\d+)\s+(.*)/);
        const item = resolveItem(m ? m[2] : t);
        inv.push({ name: item.name, ref: item.ref, qty: m ? parseInt(m[1], 10) : 1 });
      });
      // Equip the package's armor/shield so the sheet computes AC from it.
      const armorNames = new Set((D.armor() || []).map((a) => String(a.name).toLowerCase()));
      inv.forEach((it) => { if (it.ref && armorNames.has(String(it.ref).toLowerCase())) it.equipped = true; });
    }
    // spells
    const spellsKnown = st.pickedCantrips.map((n) => ({ name:n, prepared:true }))
      .concat(st.pickedSpells.map((n) => ({ name:n, prepared:true })));
    // spells granted by feat/trait choices (Magic Initiate, Fey Touched…): always prepared, flagged granted
    fx.spells.forEach((g) => { if (!spellsKnown.some((x) => norm(x.name) === norm(g.name))) spellsKnown.push({ name: g.name, prepared:true, granted:true, ability: g.ability || "", source: g.source || "" }); });
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
      customFeatures, addedFeats, choices, spellsKnown, slotUsed:{},
      forceSpells: false, spellAbility: (spellcasts && c.spellcastingAbility) ? c.spellcastingAbility : "",
      lineage: st.lineage,
      options: { eberron: !!st.eberron, au: !!st.au }, manaUsed: 0, actionsUsed: 0,
    };
    if (typeof window.applySheet === "function") window.applySheet(data);
    if (document.getElementById("f-lineage")) document.getElementById("f-lineage").value = st.lineage || "";
    if (typeof window.renderFeatures === "function") window.renderFeatures();
    if (typeof window.renderSpells === "function") window.renderSpells();
    if (typeof window.saveSheet === "function") window.saveSheet(true);
    if (typeof window.addLog === "function") window.addLog("Character Built", "", (st.name || st.cls || "Character") + " — " + (st.cls || "") + " " + st.level, "normal");
    close();
  }
  function norm(s) { return String(s == null ? "" : s).trim().toLowerCase(); }
  function matchSkill(name) { const n = norm(name); const s = D.skills().find((x) => norm(x.name) === n); return s ? s.name : null; }

  window.DNDB = { launch, close, next, back };

  // builder-only styles (scoped by dndb- prefix)
  const css = document.createElement("style");
  css.textContent =
    ".dndb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:8px 0;}" +
    ".dndb-card{border:1px solid #3a3a41;border-radius:6px;background:#28282e;padding:8px 10px;cursor:pointer;transition:.1s;}" +
    ".dndb-card:hover{border-color:#9b1b22;}" +
    ".dndb-card.on{border-color:#e08a70;background:#33333c;box-shadow:0 0 0 1px #e08a70 inset;}" +
    ".dndb-card.small{padding:6px 8px;}.dndb-card.disabled{opacity:.5;cursor:default;}" +
    ".dc-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:14px;color:#f0e0d6;letter-spacing:.02em;}" +
    ".dc-sub{font-size:10px;color:#a99e90;margin-top:2px;font-family:'Barlow Condensed',sans-serif;letter-spacing:.03em;text-transform:uppercase;}" +
    ".dc-sub.dc-plain{text-transform:none;letter-spacing:0;font-size:12px;color:#cdc3b6;line-height:1.4;}" +
    ".dndb-note{font-size:12px;color:#cdc3b6;line-height:1.5;margin-top:8px;border-left:3px solid #9b1b22;padding:4px 0 4px 10px;}" +
    ".dndb-seg{display:flex;gap:0;border:1px solid #3a3a41;border-radius:5px;overflow:hidden;margin-bottom:12px;}" +
    ".dndb-seg-btn{flex:1;padding:8px;background:#202027;color:#a99e90;border:none;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:.06em;text-transform:uppercase;}" +
    ".dndb-seg-btn.on{background:#9b1b22;color:#fff;}" +
    ".dndb-abil-rows{display:flex;flex-direction:column;gap:6px;margin:8px 0;}" +
    ".dndb-abil-row{display:flex;align-items:center;gap:10px;}" +
    ".dar-name{flex:1;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#ece3d6;}" +
    ".dar-val{font-family:'Share Tech Mono',monospace;font-size:18px;font-weight:700;color:#e08a70;min-width:28px;text-align:center;}" +
    ".dndb-pm{width:30px;height:30px;background:#9b1b22;color:#fff;border:none;border-radius:4px;font-size:16px;cursor:pointer;}" +
    ".dndb-pb-head{font-size:13px;color:#cdc3b6;margin-bottom:6px;}.dndb-pb-head b{color:#e08a70;}" +
    ".dndb-totals,.dr-scores{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;}" +
    ".drs{border:1px solid #3a3a41;border-radius:6px;background:#28282e;padding:5px 8px;text-align:center;min-width:52px;}" +
    ".drs-a{display:block;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;color:#a99e90;letter-spacing:.06em;}" +
    ".drs-v{display:block;font-family:'Share Tech Mono',monospace;font-size:18px;font-weight:700;color:#f0e0d6;}" +
    ".drs-m{display:block;font-family:'Share Tech Mono',monospace;font-size:11px;color:#e08a70;}" +
    ".dndb-review .dr-line{font-size:13px;color:#cdc3b6;line-height:1.6;margin-top:6px;}.dndb-review b{color:#f0e0d6;}" +
    ".dndb-mc-rows{display:flex;flex-direction:column;gap:6px;margin:6px 0;}" +
    ".dndb-mc-row{display:flex;align-items:center;gap:8px;}" +
    ".dndb-mc-name{flex:1;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#ece3d6;}" +
    ".dndb-mc-x{background:transparent;border:none;color:#a99e90;cursor:pointer;font-size:13px;}.dndb-mc-x:hover{color:#e08a70;}" +
    ".dndb-opt{border:1px solid #5a3f7a;border-radius:6px;background:#231a2e;padding:9px 11px;margin:0 0 12px;cursor:pointer;transition:.1s;}" +
    ".dndb-opt:hover{border-color:#7b4fb0;}" +
    ".dndb-opt.on{border-color:#a878e0;background:#2e2140;box-shadow:0 0 0 1px #a878e0 inset;}" +
    ".dndb-opt .dnb-main{display:flex;align-items:flex-start;gap:10px;}" +
    ".dnb-check{flex:0 0 20px;width:20px;height:20px;border:2px solid #7b4fb0;border-radius:4px;color:#fff;text-align:center;line-height:18px;font-size:13px;font-weight:800;margin-top:1px;}" +
    ".dndb-opt.on .dnb-check{background:#a878e0;border-color:#a878e0;}" +
    ".dnb-ttl{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:15px;color:#d9c2ff;letter-spacing:.02em;}" +
    ".dnb-sub{font-size:11px;color:#b7add0;line-height:1.45;margin-top:3px;}";
  document.head.appendChild(css);
})();
