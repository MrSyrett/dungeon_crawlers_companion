/* The Lord of the Rings Roleplaying — Character Builder (window.LOTRB).
   Modelled on the D&D builder (dnd-sheet-builder.js): a step wizard that assembles
   a starting Player-hero and hands it to the sheet through applySheet()/saveSheet().
   Steps: Options → Culture → Background → Calling → Abilities → Skills →
   Starting Virtue → Calling Choices & Advancement → Equipment → Review.
   No spellcasting and no feats: virtues (with their ability increase), crafts,
   fighting styles, rewards, Expertise and the Warden's foes/lands instead.
   Shared helpers live on window.LOTRCORE so the level-up wizard (lotr-levelup.js)
   applies a virtue, a reward or a specialisation exactly the same way. */
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const sgn = (n) => (n >= 0 ? "+" : "") + n;
  const mod = (s) => Math.floor((s - 10) / 2);
  const num = (v) => { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; };
  const norm = (s) => String(s == null ? "" : s).trim().toLowerCase();
  const ABIL = ["STR","DEX","CON","INT","WIS","CHA"];
  const ABIL_NAME = { STR:"Strength", DEX:"Dexterity", CON:"Constitution", INT:"Intelligence", WIS:"Wisdom", CHA:"Charisma" };
  const D = {
    callings: () => window.LOTR_CALLINGS || [], cultures: () => window.LOTR_CULTURES || [],
    backgrounds: () => window.LOTR_BACKGROUNDS || [], skills: () => window.LOTR_SKILLS || [],
    virtues: () => window.LOTR_VIRTUES || [], crafts: () => window.LOTR_CRAFTS || [],
    styles: () => window.LOTR_FIGHTING_STYLES || [], weapons: () => window.LOTR_WEAPONS || [],
    armor: () => window.LOTR_ARMOR || [], gear: () => window.LOTR_GEAR || [],
    tables: () => window.LOTR_TABLES || {}, standards: () => window.LOTR_STANDARDS || [],
    rewards: () => window.LOTR_REWARDS || [], rewardLevels: () => window.LOTR_REWARD_LEVELS || [3,5,7,9],
    features: () => window.LOTR_DISTINCTIVE_FEATURES || [],
  };
  const MAX_LEVEL = () => num((D.tables() || {}).maxLevel) || 10;
  const profBonusAt = (L) => { const t = D.tables(); return (t.proficiencyByLevel && t.proficiencyByLevel[L-1]) || (2 + Math.floor((L-1)/4)); };

  // ── shared rules helpers (also used by lotr-levelup.js) ─────────────────
  const canonW = (s) => norm(s).replace(/[^a-z ]/g, " ").split(/\s+/).filter(Boolean).sort().join(" ");
  const weaponByName = (n) => D.weapons().find((w) => canonW(w.name) === canonW(n)) || null;
  const callingByName = (n) => D.callings().find((c) => norm(c.name) === norm(n)) || null;
  const cultureByName = (n) => D.cultures().find((c) => norm(c.name) === norm(n)) || null;
  const virtueByName = (n) => D.virtues().find((v) => norm(v.name) === norm(n)) || null;
  const matchSkill = (name) => { const s = D.skills().find((x) => norm(x.name) === norm(name)); return s ? s.name : null; };
  const toolsOf = (cat) => D.gear().filter((g) => g.category === cat).map((g) => g.name);
  const INSTRUMENTS = () => toolsOf("Musical Instrument"), GAMING = () => toolsOf("Gaming Set");
  const ALL_TOOLS = () => toolsOf("Artisan's Tools").concat(toolsOf("Other Tools").filter((t) => !/pipe-weed/i.test(t)), INSTRUMENTS(), GAMING(), ["Land vehicles","Water vehicles"]);
  // "Brewer's supplies or cook's utensils" / "Cobbler's, leatherworker's, or weaver's tools" /
  // "A musical instrument of your choice" → [] (fixed, single) or the options to choose from.
  function toolOptions(str) {
    const s = String(str || "").trim(); if (!s) return { fixed: "", options: [] };
    let opts = [];
    if (/musical instrument/i.test(s)) opts = opts.concat(INSTRUMENTS());
    if (/gaming set/i.test(s)) opts = opts.concat(GAMING());
    if (/one tool of your choice/i.test(s)) opts = ALL_TOOLS();
    if (opts.length && !/,|\bor\b/i.test(s.replace(/an? gaming set or an? musical instrument/ig, ""))) return { fixed: "", options: uniq(opts) };
    const body = s.replace(/^(one|two) of:\s*/i, "").replace(/^an?\s+/i, "");
    const parts = body.split(/,\s*(?:or\s+)?|\s+or\s+/i).map((x) => x.trim()).filter(Boolean);
    if (parts.length < 2 && !opts.length) return { fixed: resolveTool(s), options: [] };
    const tail = (parts[parts.length - 1].match(/\s(tools|supplies|kit|utensils)$/i) || [])[1] || "";
    parts.forEach((p) => {
      if (/musical instrument|gaming set/i.test(p)) return;
      let t = p.replace(/^an?\s+/i, ""); if (tail && /'s$/i.test(t)) t += " " + tail;
      const r = resolveTool(t); if (r) opts.push(r);
    });
    return { fixed: "", options: uniq(opts) };
  }
  function resolveTool(t) {
    const n = norm(t).replace(/s$/, "");
    if (/^pipe/.test(n)) return "Pipe";
    if (/land vehicle/.test(n)) return "Land vehicles"; if (/water vehicle/.test(n)) return "Water vehicles";
    const hit = ALL_TOOLS().find((x) => norm(x) === norm(t)) || ALL_TOOLS().find((x) => norm(x).replace(/s$/, "") === n) || ALL_TOOLS().find((x) => norm(x).indexOf(n.split(" ")[0]) === 0);
    return hit || (t.charAt(0).toUpperCase() + t.slice(1));
  }
  function uniq(a) { const o = []; a.forEach((x) => { if (x && o.indexOf(x) < 0) o.push(x); }); return o; }
  // Subculture choices the data describes only in trait text.
  const SUBCULTURE_CHOICES = {
    "dwarf of erebor": { tools: ["Jeweller's tools","Mason's tools","Smith's tools"], label: "Wrights of the Mountain — tool" },
    "dwarf of the blue mountains": { tools: "instrument", label: "Songs of the Halls — musical instrument" },
    "elves of lindon": { skill: ["Nature","Old Lore","Performance"], skillLabel: "Elven-lore — skill", tools: ["Carpenter's tools","Water vehicles","instrument"], label: "Shipwrights and Singers — tool" },
    "fallohide": { tools: ["Calligrapher's supplies","Cartographer's tools","instrument"], label: "Skill in Language and Song — tool" },
    "harfoot": { tools: ["Herbalism kit","Mason's tools","Weaver's tools"], label: "Skilful with Tools — tool" },
    "stoor": { tools: ["Carpenter's tools","Water vehicles","Woodcarver's tools"], label: "Riverside Dweller — tool" },
  };
  function expandTools(list) { if (list === "instrument") return INSTRUMENTS(); return uniq([].concat(list || []).flatMap((t) => t === "instrument" ? INSTRUMENTS() : [t])); }
  // Fighting styles a calling/specialisation grants up to level L: [{ level, options[] }]
  function styleSlots(calling, subclass, L) {
    const c = callingByName(calling); if (!c) return [];
    const out = [];
    (c.features || []).filter((f) => /^fighting style$/i.test(f.name) && f.level <= L).forEach((f) => out.push({ level: f.level, options: (c.fightingStyles || []).slice(), src: c.name }));
    const sub = (c.subclasses || []).find((s) => norm(s.name) === norm(subclass));
    if (sub) (sub.features || []).filter((f) => /^fighting style$/i.test(f.name) && f.level <= L).forEach((f) => out.push({ level: f.level, options: D.styles().map((s) => s.name).filter((n) => new RegExp("\\b" + n + "\\b", "i").test(f.description || "")), src: sub.name }));
    return out;
  }
  const EXPERTISE = { "treasure hunter": [1, 9], "scholar": [3, 10] };
  function expertiseSlots(calling, L) { return (EXPERTISE[norm(calling)] || []).filter((l) => l <= L); }
  // Specialisation bonus proficiencies (proficient → double if already proficient).
  const SPEC_PROFS = {
    "sharp-shooter": { skills: ["Perception"] }, "forayer": { skills: ["Stealth"] }, "hunter": { skills: ["Hunting"] },
    "healing": { skills: ["Medicine"], tools: ["Herbalism kit"] }, "lore": { skills: ["Old Lore"], tools: ["Calligrapher's supplies"] },
    "counsellor": { choose: 2, from: ["Deception","Insight","Intimidation","Performance","Persuasion","Riddle"] },
  };
  function craftCount(calling, L) { const c = callingByName(calling); return (c && Array.isArray(c.craftSlots)) ? num(c.craftSlots[L-1]) : 0; }
  function virtueOptions(culture, taken) { const t = (taken || []).map(norm); return D.virtues().filter((v) => (v.category === "Common" || norm(v.category) === norm(culture)) && t.indexOf(norm(v.name)) < 0); }
  // A virtue pick → { abil:{X:n}, saves:[], skills:[], expertise:[], profText:[] }.
  function virtueEffects(pick) {
    const v = virtueByName(pick && pick.virtue); const out = { abil: {}, saves: [], skills: [], expertise: [], profText: [], companion: "" };
    if (!v) return out;
    if (v.asi && v.asi.prowess) { (pick.prowess || []).forEach((a) => { if (a) out.abil[a] = (out.abil[a] || 0) + (pick.prowess.length === 1 ? 2 : 1); }); }
    else if (pick.abil) out.abil[pick.abil] = (v.asi && v.asi.amount) || 1;
    if (/^confidence$/i.test(v.name) && pick.save) out.saves.push(pick.save);
    if (/^mastery$/i.test(v.name)) { if (pick.prof) { if (matchSkill(pick.prof)) out.skills.push(pick.prof); else out.profText.push(pick.prof); } if (pick.exp) out.expertise.push(pick.exp); }
    if (/^ways of the wild$/i.test(v.name) && pick.skill) out.skills.push(pick.skill);
    if (/^strange as news from bree$/i.test(v.name)) out.skills.push("Investigation!");
    if (/^dwarf-friend$/i.test(v.name)) out.expertise.push("Persuasion");
    if (/^friendly and familiar$/i.test(v.name)) out.expertise.push("Insight");
    if (/^art of disappearing$/i.test(v.name)) out.expertise.push("Stealth");
    if (v.companion) out.companion = v.companion;
    return out;
  }
  function virtueComplete(pick) {
    const v = virtueByName(pick && pick.virtue); if (!v) return false;
    if (v.asi && v.asi.prowess) { const p = (pick.prowess || []).filter(Boolean); if (!(p.length === 1 || (p.length === 2 && p[0] !== p[1]))) return false; }
    else if ((v.asi && v.asi.choose || []).length > 1 && !pick.abil) return false;
    if (/^confidence$/i.test(v.name) && !pick.save) return false;
    if (/^mastery$/i.test(v.name) && (!pick.prof || !pick.exp)) return false;
    if (/^ways of the wild$/i.test(v.name) && !pick.skill) return false;
    return true;
  }
  // Virtue picker markup. `key` namespaces the inputs; scores = running scores (for the 20 cap).
  function virtueHTML(key, pick, culture, taken, scores, profSkills) {
    const opts = virtueOptions(culture, taken.filter((t) => norm(t) !== norm(pick.virtue)));
    let h = '<select class="m-input lb-virtue" data-k="' + key + '"><option value="">— choose a virtue —</option>' +
      ["Common", culture].map((cat) => { const list = opts.filter((v) => v.category === cat); return list.length ? '<optgroup label="' + esc(cat === "Common" ? "Common virtues" : cat) + '">' + list.map((v) => '<option value="' + esc(v.name) + '"' + (pick.virtue === v.name ? " selected" : "") + '>' + esc(v.name) + ' (' + esc(v.asi && v.asi.prowess ? "+2 / +1+1" : (v.asi.choose || []).join("/") + " +1") + ')</option>').join("") + '</optgroup>' : ""; }).join("") + '</select>';
    const v = virtueByName(pick.virtue);
    if (v) {
      h += '<div class="lb-note">' + esc((v.benefits || []).join(" ")) + '</div>';
      const cap = (a) => (scores && scores[a] >= 20);
      if (v.asi && v.asi.prowess) {
        const p = pick.prowess || [];
        h += '<div class="lb-row"><span class="lb-mini">Prowess: +2 to one score, or +1 to two (max 20)</span>' +
          '<select class="m-input lb-prow" data-k="' + key + '" data-i="0"><option value="">—</option>' + ABIL.map((a) => '<option value="' + a + '"' + (p[0] === a ? " selected" : "") + (cap(a) ? " disabled" : "") + '>' + a + (scores ? " (" + scores[a] + ")" : "") + '</option>').join("") + '</select>' +
          '<select class="m-input lb-prow" data-k="' + key + '" data-i="1"><option value="">(the same +2)</option>' + ABIL.map((a) => '<option value="' + a + '"' + (p[1] === a ? " selected" : "") + (cap(a) ? " disabled" : "") + '>+1 ' + a + '</option>').join("") + '</select></div>';
      } else {
        const ch = (v.asi && v.asi.choose) || [];
        if (ch.length > 1) h += '<div class="lb-row"><span class="lb-mini">Ability increase (+1)</span>' + ch.map((a) => '<button class="dndb-seg-btn lb-abil' + (pick.abil === a ? " on" : "") + '" data-k="' + key + '" data-a="' + a + '"' + (cap(a) ? " disabled" : "") + '>' + a + (scores ? " " + scores[a] : "") + '</button>').join("") + '</div>';
        else if (ch.length === 1) { pick.abil = ch[0]; h += '<div class="lb-mini">+1 ' + ABIL_NAME[ch[0]] + (cap(ch[0]) ? " (already 20 — no increase)" : "") + '</div>'; }
      }
      if (/^confidence$/i.test(v.name)) h += '<div class="lb-row"><span class="lb-mini">Saving throw proficiency</span>' + ["INT","WIS","CHA"].map((a) => '<button class="dndb-seg-btn lb-sub" data-k="' + key + '" data-f="save" data-v="' + a + '"' + (pick.save === a ? ' style="background:#c9a227;color:#14200f;"' : "") + '>' + a + '</button>').join("") + '</div>';
      if (/^mastery$/i.test(v.name)) {
        const skillOpts = D.skills().map((s) => s.name).filter((s) => (profSkills || []).indexOf(s) < 0);
        h += '<div class="lb-row"><span class="lb-mini">New proficiency</span><select class="m-input lb-sel" data-k="' + key + '" data-f="prof"><option value="">—</option><optgroup label="Skills">' + skillOpts.map((s) => '<option' + (pick.prof === s ? " selected" : "") + '>' + esc(s) + '</option>').join("") + '</optgroup><optgroup label="Tools">' + ALL_TOOLS().map((t) => '<option' + (pick.prof === t ? " selected" : "") + '>' + esc(t) + '</option>').join("") + '</optgroup><optgroup label="Weapons">' + D.weapons().map((w) => '<option' + (pick.prof === w.name ? " selected" : "") + '>' + esc(w.name) + '</option>').join("") + '</optgroup></select></div>';
        const expOpts = uniq((profSkills || []).concat(pick.prof && matchSkill(pick.prof) ? [pick.prof] : []));
        h += '<div class="lb-row"><span class="lb-mini">Expertise in</span><select class="m-input lb-sel" data-k="' + key + '" data-f="exp"><option value="">—</option>' + expOpts.map((s) => '<option' + (pick.exp === s ? " selected" : "") + '>' + esc(s) + '</option>').join("") + '</select></div>';
      }
      if (/^ways of the wild$/i.test(v.name)) h += '<div class="lb-row"><span class="lb-mini">Proficiency</span>' + ["Explore","Hunting","Travel"].map((s) => '<button class="dndb-seg-btn lb-sub" data-k="' + key + '" data-f="skill" data-v="' + s + '"' + (pick.skill === s ? ' style="background:#c9a227;color:#14200f;"' : "") + '>' + s + '</button>').join("") + '</div>';
    }
    return h;
  }
  // Wire a virtue picker: getPick(key) returns the mutable pick object.
  function wireVirtue(body, getPick, rerender) {
    body.querySelectorAll(".lb-virtue").forEach((el) => el.addEventListener("change", () => { const p = getPick(el.dataset.k); Object.keys(p).forEach((k) => { if (k !== "mode" && k !== "level") delete p[k]; }); p.virtue = el.value; rerender(); }));
    body.querySelectorAll(".lb-abil").forEach((el) => el.addEventListener("click", () => { getPick(el.dataset.k).abil = el.dataset.a; rerender(); }));
    body.querySelectorAll(".lb-prow").forEach((el) => el.addEventListener("change", () => { const p = getPick(el.dataset.k); p.prowess = p.prowess || []; p.prowess[num(el.dataset.i)] = el.value; p.prowess = p.prowess.filter((x, i) => i === 0 || x); if (!p.prowess[0]) p.prowess = []; rerender(); }));
    body.querySelectorAll(".lb-sub").forEach((el) => el.addEventListener("click", () => { getPick(el.dataset.k)[el.dataset.f] = el.dataset.v; rerender(); }));
    body.querySelectorAll(".lb-sel").forEach((el) => el.addEventListener("change", () => { getPick(el.dataset.k)[el.dataset.f] = el.value; rerender(); }));
  }
  const PONY = (L) => { const pb = profBonusAt(L), hd = Math.max(2, L); return { name: "Bree-pony", ac: 10 + pb, hpCur: Math.floor(hd * 5.5) + hd, hpMax: Math.floor(hd * 5.5) + hd, note: "Medium beast · Speed 40 ft. · uses your proficiency bonus (+" + pb + ") and adds it to its ability scores, AC, checks and saves · Hit Dice " + hd + "d8\nHooves: +" + (2 + 2 * pb) + " to hit, 2d4 + 2 bludgeoning" }; };
  window.LOTRCORE = { toolOptions, resolveTool, ALL_TOOLS, INSTRUMENTS, GAMING, expandTools, SUBCULTURE_CHOICES, styleSlots, expertiseSlots, SPEC_PROFS, craftCount, virtueOptions, virtueEffects, virtueComplete, virtueHTML, wireVirtue, weaponByName, callingByName, cultureByName, virtueByName, matchSkill, profBonusAt, PONY, uniq };

  // ── wizard state ──────────────────────────────────────────────────────
  const STEPS = ["Options","Culture","Background","Calling","Abilities","Skills","Virtue","Advancement","Equipment","Review"];
  let st = null, step = 0;
  function fresh() {
    return { name:"", level:1, culture:"", subculture:"", rangerExtra:"", cultureSkills:[], cultureTool:"", subTool:"", subSkill:"",
      background:"", bgCustom:false, bgSkills:[], bgTool:"", bgToolPick:"", features:["",""],
      calling:"", callingTools:[], classSkills:[],
      method:"array", base:{ STR:8,DEX:8,CON:8,INT:8,WIS:8,CHA:8 }, arrayPick:{}, rolled:null, manual:{ STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10 },
      startVirtue:{ virtue:"" }, subclass:"", styles:{}, picks:[], expertise:[], foes:[], lands:[], crafts:[], specChoose:[],
      equip:{}, equipPicks:{}, rewards:{}, hpMode:"avg" };
  }
  const cul = () => cultureByName(st.culture);
  const lin = () => { const c = cul(); return c ? (c.lineages || []).find((l) => l.name === st.subculture) || null : null; };
  const cal = () => callingByName(st.calling);
  const bg = () => D.backgrounds().find((b) => b.name === st.background) || null;
  const L = () => Math.max(1, Math.min(MAX_LEVEL(), num(st.level) || 1));

  // ── derived ───────────────────────────────────────────────────────────
  function baseScores() {
    const out = {};
    if (st.method === "array" || st.method === "roll") {
      const arr = st.method === "roll" ? (st.rolled || []) : ((D.tables().standardArray) || [15,14,13,12,10,8]);
      ABIL.forEach((a) => { const i = st.arrayPick[a]; out[a] = (i != null && arr[i] != null) ? arr[i] : 8; });
    } else if (st.method === "pointbuy") ABIL.forEach((a) => out[a] = st.base[a]);
    else ABIL.forEach((a) => out[a] = st.manual[a]);
    return out;
  }
  function cultureASI() {
    const out = {}; const c = cul(), l = lin();
    [c && c.asi, l && l.asi].forEach((x) => { if (x) Object.keys(x).forEach((k) => out[k] = (out[k] || 0) + x[k]); });
    if (c && c.asiChoice && st.rangerExtra) out[st.rangerExtra] = (out[st.rangerExtra] || 0) + (c.asiChoice.amount || 1);
    return out;
  }
  // scores after culture, starting virtue and the first `upto` advancement picks (cap 20)
  function scoresUpTo(upto) {
    const sc = baseScores(), asi = cultureASI();
    Object.keys(asi).forEach((k) => sc[k] = Math.min(20, (sc[k] || 10) + asi[k]));
    const bump = (fx) => Object.keys(fx.abil).forEach((k) => sc[k] = Math.min(20, sc[k] + fx.abil[k]));
    if (cul() && cul().startingVirtue && st.startVirtue.virtue) bump(virtueEffects(st.startVirtue));
    advPicks().slice(0, upto == null ? undefined : upto).forEach((p) => { if (p.mode !== "craft") bump(virtueEffects(p)); });
    return sc;
  }
  const finalScores = () => scoresUpTo();
  function advPicks() {
    const c = cal(); if (!c) return [];
    const lv = (c.virtueLevels || []).filter((l) => l <= L());
    while (st.picks.length < lv.length) st.picks.push({ mode: "virtue", virtue: "" });
    st.picks.length = lv.length;
    st.picks.forEach((p, i) => { p.level = lv[i]; p.canCraft = (c.craftOrVirtueLevels || []).indexOf(lv[i]) >= 0; if (!p.canCraft) p.mode = "virtue"; });
    return st.picks;
  }
  function grantedSkills() {
    const out = []; const add = (s) => { const r = matchSkill(s); if (r && out.indexOf(r) < 0) out.push(r); };
    const c = cul(), l = lin(), b = bg();
    [c, l].forEach((x) => { if (x && x.grants && x.grants.skills) x.grants.skills.forEach(add); });
    st.cultureSkills.forEach(add); if (st.subSkill) add(st.subSkill);
    if (st.bgCustom) st.bgSkills.forEach(add); else if (b) { (b.skillProficiencies || []).forEach(add); st.bgSkills.forEach(add); }
    return out;
  }
  function allSkills() { const out = grantedSkills().slice(); st.classSkills.forEach((s) => { if (out.indexOf(s) < 0) out.push(s); }); return out; }
  function takenVirtues(exceptIdx) { const t = []; if (st.startVirtue.virtue) t.push(st.startVirtue.virtue); advPicks().forEach((p, i) => { if (i !== exceptIdx && p.mode !== "craft" && p.virtue) t.push(p.virtue); }); return t; }
  function craftTotal() { return craftCount(st.calling, L()) + advPicks().filter((p) => p.mode === "craft").length; }
  function wardenCounts() { const c = cal(); if (!c || !c.favouredFoeCount) return { foes: 0, lands: 0 }; return { foes: num(c.favouredFoeCount[L()-1]), lands: num(c.wardedLandCount[L()-1]) }; }
  function subChoices() { return SUBCULTURE_CHOICES[norm(st.subculture)] || SUBCULTURE_CHOICES[norm(st.culture)] || null; }
  function bgToolSpec() { const b = bg(); if (st.bgCustom) return { fixed: "", options: ALL_TOOLS() }; return toolOptions(b ? (b.toolProficiencies || [])[0] : ""); }
  function bgToolName() { const ts = bgToolSpec(); return st.bgCustom ? st.bgTool : (ts.fixed || st.bgToolPick); }
  function callingToolSpec() {
    const c = cal(); const t = c && c.proficiencies && c.proficiencies.tools && c.proficiencies.tools[0]; if (!t) return null;
    if (/^two of/i.test(t)) return { count: 2, options: toolOptions(t).options.concat(/musical instrument/i.test(t) ? INSTRUMENTS() : []).filter((x, i, a) => a.indexOf(x) === i) };
    if (/^one of/i.test(t) || /of your choice/i.test(t)) return { count: 1, options: toolOptions(t).options.length ? toolOptions(t).options : ALL_TOOLS() };
    return { count: 0, fixed: t };
  }
  function allTools() {
    const out = []; const add = (t) => { if (t && out.indexOf(t) < 0) out.push(t); };
    const c = cul(); if (c && c.grants && c.grants.tools) c.grants.tools.forEach(add);
    if (st.cultureTool) add(st.cultureTool); if (st.subTool) add(st.subTool);
    add(bgToolName()); st.callingTools.forEach(add);
    advPicks().forEach((p) => { if (p.mode !== "craft") virtueEffects(p).profText.forEach(add); });
    const sp = SPEC_PROFS[norm(st.subclass)]; if (sp && sp.tools) sp.tools.forEach(add);
    return out;
  }
  function hpFor(sc) {
    const c = cal(); const hd = c ? c.hitDie : 8; const con = mod(sc.CON); const lv = L();
    let hp = hd + con; for (let i = 2; i <= lv; i++) hp += Math.max(1, Math.floor(hd / 2) + 1 + con);
    const bits = [];
    if (cul() && cul().grants && cul().grants.hpPerLevel) { hp += lv * cul().grants.hpPerLevel; bits.push("Endurance of the Dwarves +" + lv); }
    if (takenVirtues().some((v) => /^hardiness$/i.test(v))) { hp += lv; bits.push("Hardiness +" + lv); }
    if (norm(st.subclass) === "slayer" && lv >= 3) { hp += 3 + (lv - 3); bits.push("Sterner Than Steel +" + (3 + lv - 3)); }
    return { hp: Math.max(1, hp), bits };
  }

  // ── modal shell ────────────────────────────────────────────────────────
  function ensureModal() {
    if ($("lotrb-overlay")) return;
    const ov = document.createElement("div");
    ov.className = "ov"; ov.id = "lotrb-overlay";
    ov.innerHTML =
      '<div class="modal wide" style="max-width:740px;">' +
        '<div class="modal-hd"><div class="ttl">Create a Player-hero <span id="lotrb-step" class="lb-steplbl"></span></div><button class="x" onclick="LOTRB.close()">✕</button></div>' +
        '<div class="modal-bd" id="lotrb-body"></div>' +
        '<div class="modal-ft"><div><button class="m-btn ghost" id="lotrb-back" onclick="LOTRB.back()">← Back</button></div>' +
        '<div style="display:flex;gap:8px;align-items:center;"><span id="lotrb-why" class="lb-why"></span><button class="m-btn ghost" onclick="LOTRB.close()">Cancel</button><button class="m-btn" id="lotrb-next" onclick="LOTRB.next()">Next →</button></div></div>' +
      '</div>';
    document.body.appendChild(ov);
  }
  function launch() { ensureModal(); st = fresh(); step = 0; $("lotrb-overlay").classList.add("open"); render(); }
  function close() { const ov = $("lotrb-overlay"); if (ov) ov.classList.remove("open"); }
  function stepSkipped(name) {
    if (name === "Virtue") return !(cul() && cul().startingVirtue);
    if (name === "Advancement") return advancementEmpty();
    return false;
  }
  function advancementEmpty() {
    if (!cal()) return true;
    return !(L() >= (cal().subclassLevel || 3) || styleSlots(st.calling, st.subclass, L()).length || advPicks().length || expertiseSlots(st.calling, L()).length || wardenCounts().foes || craftTotal());
  }
  function nextEnabled(from) { let s = from; while (s < STEPS.length - 1) { s++; if (!stepSkipped(STEPS[s])) return s; } return STEPS.length - 1; }
  function prevEnabled(from) { let s = from; while (s > 0) { s--; if (!stepSkipped(STEPS[s])) return s; } return 0; }
  function next() { const why = blocker(); if (why) { $("lotrb-why").textContent = why; return; } if (STEPS[step] === "Review") { apply(); return; } step = nextEnabled(step); render(); }
  function back() { if (step === 0) return; step = prevEnabled(step); render(); }
  function stepLabel() { if (step === 0) return ""; let idx = 0, total = 0; for (let i = 1; i < STEPS.length; i++) { if (stepSkipped(STEPS[i])) continue; total++; if (i === step) idx = total; } return "Step " + idx + " of " + total + " — " + (STEPS[step] === "Advancement" ? "Calling Choices" : STEPS[step]); }
  function render() {
    ensureModal();
    $("lotrb-step").textContent = stepLabel();
    $("lotrb-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("lotrb-next").textContent = STEPS[step] === "Review" ? "Create hero ✓" : "Next →";
    $("lotrb-why").textContent = "";
    const fn = { Options:rOptions, Culture:rCulture, Background:rBackground, Calling:rCalling, Abilities:rAbilities, Skills:rSkills, Virtue:rVirtue, Advancement:rAdvancement, Equipment:rEquipment, Review:rReview }[STEPS[step]];
    const body = $("lotrb-body");
    const same = render._step === step, prev = body.scrollTop;
    body.innerHTML = fn();
    body.scrollTop = same ? prev : 0;
    render._step = step;
    wire();
  }
  const card = (attr, on, title, sub, dis) => '<div class="dndb-card' + (on ? " on" : "") + (dis ? " disabled" : "") + '" ' + attr + '><div class="dc-title">' + esc(title) + '</div>' + (sub ? '<div class="dc-sub">' + esc(sub) + '</div>' : "") + '</div>';
  const chip = (attr, on, label, dis) => '<span class="lb-chip' + (on ? " on" : "") + (dis ? " disabled" : "") + '" ' + attr + '>' + esc(label) + '</span>';

  // ── steps ──────────────────────────────────────────────────────────────
  function rOptions() {
    let h = '<p class="m-hint">Name your hero and choose the level they begin at (1st–' + MAX_LEVEL() + 'th). Higher levels walk you through each virtue, reward and calling choice they have earned.</p>';
    h += '<div class="lb-row" style="align-items:flex-end;gap:14px;"><label style="flex:1 1 240px;"><span class="m-lbl">Hero\'s name</span><input type="text" id="lotrb-name" class="m-input" placeholder="Bergil, son of Beregond" value="' + esc(st.name) + '"></label>' +
      '<label><span class="m-lbl">Starting level</span><select id="lotrb-level" class="m-input" style="width:90px;">' + Array.from({ length: MAX_LEVEL() }, (_, i) => '<option value="' + (i+1) + '"' + (L() === i+1 ? " selected" : "") + '>' + (i+1) + '</option>').join("") + '</select></label></div>';
    h += '<div class="dndb-note">A Player-hero of Middle-earth is built from a <b>heroic culture</b> (with its standard of living), a <b>background</b> from that culture, and a <b>calling</b>. There is no spellcasting: callings, virtues, crafts and rewards take its place — and every hero walks a Shadow Path.</div>';
    return h;
  }
  function rCulture() {
    let h = '<p class="m-hint">Choose your heroic culture. It sets your ability increases, speed, languages, standard of living and cultural traits.</p><div class="dndb-grid">';
    D.cultures().forEach((c) => h += card('data-culture="' + esc(c.name) + '"', st.culture === c.name, c.name, Object.keys(c.asi || {}).map((k) => k + " +" + c.asi[k]).join(" ") + " · speed " + c.speed + " · " + c.standardOfLiving));
    h += "</div>";
    const c = cul(); if (!c) return h;
    h += '<div class="dndb-note">' + esc(c.flavor || "") + '</div><div class="lb-traits">' + (c.traits || []).map((t) => '<div><b>' + esc(t.name) + '.</b> ' + esc(t.description) + '</div>').join("") + '</div>';
    const subs = (c.lineages || []);
    if (subs.length > 1 || (subs.length === 1 && subs[0].name !== c.name)) {
      h += '<span class="m-lbl">Subculture</span><div class="dndb-grid">';
      subs.forEach((l) => h += card('data-sub="' + esc(l.name) + '"', st.subculture === l.name, l.name, Object.keys(l.asi || {}).map((k) => k + " +" + l.asi[k]).join(" ")));
      h += "</div>";
      const l = lin(); if (l) h += '<div class="lb-traits">' + (l.traits || []).map((t) => '<div><b>' + esc(t.name) + '.</b> ' + esc(t.description) + '</div>').join("") + '</div>';
    } else if (subs.length === 1) st.subculture = subs[0].name;
    if (c.asiChoice) h += '<span class="m-lbl">+' + (c.asiChoice.amount || 1) + ' to one ability of your choice</span><div class="lb-row">' + ABIL.map((a) => chip('data-rx="' + a + '"', st.rangerExtra === a, a)).join("") + '</div>';
    if (c.grants && c.grants.skillChoice) { const sc = c.grants.skillChoice; h += '<span class="m-lbl">' + esc((c.traits.find((t) => /proficiency in two/i.test(t.description)) || {}).name || "Skills") + ' — choose ' + sc.count + ' (' + st.cultureSkills.length + '/' + sc.count + ')</span><div class="lb-row">' + sc.from.map((s) => chip('data-cs="' + esc(s) + '" data-max="' + sc.count + '"', st.cultureSkills.indexOf(s) >= 0, s)).join("") + '</div>'; }
    if (c.grants && c.grants.toolChoice) h += '<span class="m-lbl">Tool proficiency</span><div class="lb-row">' + c.grants.toolChoice.map((t) => chip('data-ct="' + esc(t) + '"', st.cultureTool === t, t)).join("") + '</div>';
    const sc2 = subChoices();
    if (sc2 && (lin() || !subs.length || subs.length === 1)) {
      if (sc2.skill) h += '<span class="m-lbl">' + esc(sc2.skillLabel) + '</span><div class="lb-row">' + sc2.skill.map((s) => chip('data-ss="' + esc(s) + '"', st.subSkill === s, s)).join("") + '</div>';
      if (sc2.tools) h += '<span class="m-lbl">' + esc(sc2.label) + '</span><select class="m-input" id="lotrb-subtool"><option value="">—</option>' + expandTools(sc2.tools).map((t) => '<option' + (st.subTool === t ? " selected" : "") + '>' + esc(t) + '</option>').join("") + '</select>';
    }
    return h;
  }
  function rBackground() {
    const c = cul();
    let h = '<p class="m-hint">Backgrounds of the ' + esc(c ? c.name : "your culture") + ': each grants two skills, a tool (and the tool itself), and two distinctive features.</p><div class="dndb-grid">';
    D.backgrounds().filter((b) => !c || norm(b.culture) === norm(c.name)).forEach((b) => h += card('data-bg="' + esc(b.name) + '"', st.background === b.name, b.name, (b.skillProficiencies || []).join(", ") || "choose skills"));
    h += "</div>";
    const b = bg(); if (!b) return h;
    h += '<div class="dndb-note">' + esc(b.description || "") + '<br>Skills: <b>' + esc((b.skillProficiencies || []).join(", ") || (b.skillChoice ? "two of " + b.skillChoice.from.join(", ") : "—")) + '</b> · Tool: <b>' + esc((b.toolProficiencies || []).join(", ")) + '</b> · Features: <b>' + esc((b.distinctiveFeatures || []).join(", ")) + '</b></div>';
    h += '<label class="brow-check" style="margin:8px 0;"><input type="checkbox" id="lotrb-bgcustom"' + (st.bgCustom ? " checked" : "") + '> Customise — choose any two skills, a tool, and your own distinctive features</label>';
    const granted = []; const cc = cul(), l = lin();
    [cc, l].forEach((x) => { if (x && x.grants && x.grants.skills) x.grants.skills.forEach((s) => granted.push(s)); }); st.cultureSkills.forEach((s) => granted.push(s)); if (st.subSkill) granted.push(st.subSkill);
    if (st.bgCustom) {
      h += '<span class="m-lbl">Two skills (' + st.bgSkills.length + '/2)</span><div class="lb-row">' + D.skills().map((s) => chip('data-bs="' + esc(s.name) + '" data-max="2"', st.bgSkills.indexOf(s.name) >= 0, s.name, granted.indexOf(s.name) >= 0)).join("") + '</div>';
      h += '<span class="m-lbl">Tool</span><select class="m-input" id="lotrb-bgtool"><option value="">—</option>' + ALL_TOOLS().map((t) => '<option' + (st.bgTool === t ? " selected" : "") + '>' + esc(t) + '</option>').join("") + '</select>';
    } else {
      if (b.skillChoice) h += '<span class="m-lbl">Choose ' + b.skillChoice.count + ' (' + st.bgSkills.length + '/' + b.skillChoice.count + ')</span><div class="lb-row">' + b.skillChoice.from.map((s) => chip('data-bs="' + esc(s) + '" data-max="' + b.skillChoice.count + '"', st.bgSkills.indexOf(s) >= 0, s, granted.indexOf(s) >= 0)).join("") + '</div>';
      const ts = bgToolSpec(); if (ts.options.length) h += '<span class="m-lbl">Tool — ' + esc((b.toolProficiencies || [])[0]) + '</span><select class="m-input" id="lotrb-bgtoolpick"><option value="">—</option>' + ts.options.map((t) => '<option' + (st.bgToolPick === t ? " selected" : "") + '>' + esc(t) + '</option>').join("") + '</select>';
    }
    h += '<span class="m-lbl">Distinctive features</span><div class="lb-row">' + [0, 1].map((i) => '<select class="m-input lb-df" data-i="' + i + '" style="flex:1 1 160px;"' + (st.bgCustom ? "" : "") + '>' + D.features().map((f) => '<option' + (st.features[i] === f ? " selected" : "") + '>' + esc(f) + '</option>').join("") + '</select>').join("") + '</div>';
    return h;
  }
  function rCalling() {
    let h = '<p class="m-hint">Choose your calling — your vocation and the path the Shadow will tempt you down. LotR heroes follow a single calling (multicalling is left to hand entry on the sheet).</p><div class="dndb-grid">';
    D.callings().forEach((c) => h += card('data-calling="' + esc(c.name) + '"', st.calling === c.name, c.name, "d" + c.hitDie + " · " + (c.primaryAbility || []).join("/") + " · " + c.shadowPath));
    h += "</div>";
    const c = cal(); if (!c) return h;
    h += '<div class="dndb-note">' + esc(c.flavor || "") + '<br>Saves: <b>' + esc((c.savingThrows || []).join(", ")) + '</b> · Armour: <b>' + esc((c.proficiencies.armor || []).join(", ") || "—") + '</b> · Weapons: <b>' + esc((c.proficiencies.weapons || []).join(", ")) + '</b>' + ((c.proficiencies.tools || []).length ? ' · Tools: <b>' + esc(c.proficiencies.tools.join(", ")) + '</b>' : "") + '<br>Shadow Path: <b>' + esc(c.shadowPath) + '</b> · ' + esc(c.subclassLabel) + ' at 3rd level.</div>';
    h += '<div class="lb-traits">' + (c.features || []).filter((f) => f.level <= L()).map((f) => '<div><b>' + esc(f.name) + '</b> <span class="lb-mini">(' + f.level + ')</span> ' + esc(f.description) + '</div>').join("") + '</div>';
    const ts = callingToolSpec();
    if (ts && ts.count) h += '<span class="m-lbl">Calling tools — choose ' + ts.count + ' (' + st.callingTools.length + '/' + ts.count + ')</span><div class="lb-row">' + ts.options.map((t) => chip('data-ctool="' + esc(t) + '" data-max="' + ts.count + '"', st.callingTools.indexOf(t) >= 0, t)).join("") + '</div>';
    return h;
  }
  function rAbilities() {
    let h = '<p class="m-hint">Generate your ability scores, then your culture\'s increases are added.</p>';
    h += '<div class="dndb-seg">' + [["array","Standard Array"],["pointbuy","Point Buy (27)"],["roll","Roll 4d6"],["manual","Manual"]].map(([v, l]) => '<button class="dndb-seg-btn' + (st.method === v ? " on" : "") + '" data-method="' + v + '">' + l + '</button>').join("") + '</div>';
    if (st.method === "array" || st.method === "roll") {
      const arr = st.method === "roll" ? st.rolled : (D.tables().standardArray || [15,14,13,12,10,8]);
      if (st.method === "roll") h += '<div class="lb-row"><button class="m-btn" id="lotrb-roll">🎲 Roll 4d6 (drop lowest) ×6</button>' + (arr ? '<span class="lb-mini">Rolled: <b>' + arr.join(", ") + '</b></span>' : "") + '</div>';
      if (arr) { h += '<div class="dndb-abil-rows">'; ABIL.forEach((a) => { h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span><select class="m-input lotrb-array" data-abil="' + a + '"><option value="">—</option>' + arr.map((n, i) => '<option value="' + i + '"' + (st.arrayPick[a] === i ? " selected" : "") + '>' + n + '</option>').join("") + '</select></div>'; }); h += "</div>"; }
    } else if (st.method === "pointbuy") {
      const costs = D.tables().pointBuyCosts || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9}, budget = D.tables().pointBuyBudget || 27;
      let spent = 0; ABIL.forEach((a) => spent += (costs[st.base[a]] || 0));
      h += '<div class="dndb-pb-head">Points: <b>' + spent + '</b> / ' + budget + '</div><div class="dndb-abil-rows">';
      ABIL.forEach((a) => h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span><button class="dndb-pm" data-pb="' + a + '" data-d="-1">−</button><span class="dar-val">' + st.base[a] + '</span><button class="dndb-pm" data-pb="' + a + '" data-d="1">+</button></div>');
      h += "</div>";
    } else {
      h += '<div class="dndb-abil-rows">'; ABIL.forEach((a) => h += '<div class="dndb-abil-row"><span class="dar-name">' + ABIL_NAME[a] + '</span><input type="number" class="m-input lotrb-manual" data-abil="' + a + '" min="3" max="20" value="' + st.manual[a] + '" style="width:80px;"></div>'); h += "</div>";
    }
    const asi = cultureASI();
    h += '<span class="m-lbl">With culture increases (' + esc(Object.keys(asi).map((k) => k + " +" + asi[k]).join(", ") || "—") + ')</span>';
    const sc = scoresUpTo(0);
    h += '<div class="dndb-totals">' + ABIL.map((a) => '<div class="drs"><span class="drs-a">' + a + '</span><span class="drs-v">' + sc[a] + '</span><span class="drs-m">' + sgn(mod(sc[a])) + '</span></div>').join("") + '</div>';
    return h;
  }
  function rSkills() {
    const c = cal(); const granted = grantedSkills();
    let h = '<p class="m-hint">You already know <b>' + esc(granted.join(", ") || "—") + '</b> from your culture and background. Choose your calling skills.</p>';
    if (!c) return h;
    const n = c.proficiencies.skillsChoose || 2;
    h += '<span class="m-lbl">Choose ' + n + ' from ' + esc(c.name) + ' (' + st.classSkills.length + '/' + n + ')</span><div class="dndb-grid">';
    (c.proficiencies.skillsFrom || []).forEach((s) => { const dis = granted.indexOf(s) >= 0; h += '<div class="dndb-card small' + (st.classSkills.indexOf(s) >= 0 ? " on" : "") + (dis ? " disabled" : "") + '" data-sk="' + esc(s) + '" data-max="' + n + '"><div class="dc-title">' + esc(s) + (dis ? " ✓" : "") + '</div></div>'; });
    h += "</div>";
    return h;
  }
  function rVirtue() {
    const c = cul();
    let h = '<p class="m-hint">' + esc(c.name) + ' begin with one <b>cultural virtue</b> of their choice. Like every virtue it also raises an ability by 1 (maximum 20).</p>';
    const vOpts = virtueOptions(c.name, []).filter((v) => norm(v.category) === norm(c.name));
    h += '<div class="dndb-grid">' + vOpts.map((v) => card('data-sv="' + esc(v.name) + '"', st.startVirtue.virtue === v.name, v.name, (v.asi.choose || []).join("/") + " +1")).join("") + '</div>';
    if (st.startVirtue.virtue) h += '<div class="lb-box">' + virtueHTML("start", st.startVirtue, c.name, takenVirtues(), scoresUpTo(0), allSkills()).replace(/<select class="m-input lb-virtue"[\s\S]*?<\/select>/, "") + '</div>';
    return h;
  }
  function rAdvancement() {
    const c = cal(); if (!c) return "";
    let h = '<p class="m-hint">Choices your calling grants up to level ' + L() + '.</p>';
    if (L() >= (c.subclassLevel || 3)) {
      h += '<span class="m-lbl">' + esc(c.subclassLabel) + ' (3rd level)</span><div class="dndb-grid">' + (c.subclasses || []).map((s) => card('data-spec="' + esc(s.name) + '"', st.subclass === s.name, s.name, s.flavor)).join("") + '</div>';
      const sub = (c.subclasses || []).find((s) => s.name === st.subclass);
      if (sub) h += '<div class="lb-traits">' + sub.features.filter((f) => f.level <= L()).map((f) => '<div><b>' + esc(f.name) + '</b> <span class="lb-mini">(' + f.level + ')</span> ' + esc(f.description) + '</div>').join("") + '</div>';
      const sp = SPEC_PROFS[norm(st.subclass)];
      if (sp && sp.choose) h += '<span class="m-lbl">Bonus proficiencies — choose ' + sp.choose + ' (' + st.specChoose.length + '/' + sp.choose + ')</span><div class="lb-row">' + sp.from.map((s) => chip('data-spc="' + esc(s) + '" data-max="' + sp.choose + '"', st.specChoose.indexOf(s) >= 0, s + (allSkills().indexOf(s) >= 0 ? " (double)" : ""))).join("") + '</div>';
    }
    styleSlots(st.calling, st.subclass, L()).forEach((slot, i) => {
      h += '<span class="m-lbl">Fighting Style (' + esc(slot.src) + ', ' + slot.level + ')</span><div class="lb-row">' + slot.options.map((n) => { const taken = Object.keys(st.styles).some((k) => k !== String(i) && st.styles[k] === n); return chip('data-style="' + esc(n) + '" data-si="' + i + '"', st.styles[i] === n, n, taken); }).join("") + '</div>';
      const sd = D.styles().find((x) => x.name === st.styles[i]); if (sd) h += '<div class="lb-mini">' + esc(sd.description) + '</div>';
    });
    const ex = expertiseSlots(st.calling, L());
    if (ex.length) { const n = ex.length * 2; const pool = allSkills().concat(Object.keys(specSkillGrants())).concat(allTools()); h += '<span class="m-lbl">Expertise — double proficiency in ' + n + ' (' + st.expertise.length + '/' + n + ')</span><div class="lb-row">' + uniq(pool).map((s) => chip('data-exp="' + esc(s) + '" data-max="' + n + '"', st.expertise.indexOf(s) >= 0, s)).join("") + '</div>'; }
    const w = wardenCounts();
    if (w.foes) { const c2 = cal(); h += '<span class="m-lbl">Favoured foes (' + st.foes.length + '/' + w.foes + ')</span><div class="lb-row">' + c2.favouredFoes.map((f) => chip('data-foe="' + esc(f) + '" data-max="' + w.foes + '"', st.foes.indexOf(f) >= 0, f)).join("") + '</div>'; }
    if (w.lands) { const c2 = cal(); h += '<span class="m-lbl">Warded lands (' + st.lands.length + '/' + w.lands + ')</span><div class="lb-row">' + c2.wardedLands.map((f) => chip('data-land="' + esc(f) + '" data-max="' + w.lands + '"', st.lands.indexOf(f) >= 0, f)).join("") + '</div>'; }
    advPicks().forEach((p, i) => {
      h += '<div class="lb-box"><span class="m-lbl">Level ' + p.level + ' — ' + (p.canCraft ? 'Virtue or Craft' : 'Virtue') + '</span>';
      if (p.canCraft) h += '<div class="dndb-seg" style="margin:4px 0 8px;"><button class="dndb-seg-btn' + (p.mode !== "craft" ? " on" : "") + '" data-pmode="virtue" data-i="' + i + '">Virtue</button><button class="dndb-seg-btn' + (p.mode === "craft" ? " on" : "") + '" data-pmode="craft" data-i="' + i + '">Craft slot + craft</button></div>';
      if (p.mode === "craft") h += '<div class="lb-mini">A craft slot (returns on a short or long rest) and a craft — pick the craft below.</div>';
      else h += virtueHTML("adv" + i, p, st.culture, takenVirtues(i), scoresUpTo(i), allSkills());
      h += '</div>';
    });
    const ct = craftTotal();
    if (ct) {
      while (st.crafts.length < ct) st.crafts.push(""); st.crafts.length = ct;
      h += '<span class="m-lbl">Crafts known (' + st.crafts.filter(Boolean).length + '/' + ct + ')</span>';
      st.crafts.forEach((cr, i) => { h += '<select class="m-input lb-craft" data-i="' + i + '" style="margin-bottom:4px;"><option value="">— choose a craft —</option>' + D.crafts().map((x) => '<option' + (cr === x.name ? " selected" : "") + (st.crafts.some((y, j) => j !== i && y === x.name) ? " disabled" : "") + '>' + esc(x.name) + '</option>').join("") + '</select>'; });
      const cd = st.crafts.filter(Boolean).map((n) => D.crafts().find((x) => x.name === n)).filter(Boolean);
      if (cd.length) h += '<div class="lb-traits">' + cd.map((x) => '<div><b>' + esc(x.name) + '.</b> ' + esc(x.description) + '</div>').join("") + '</div>';
    }
    return h;
  }
  function specSkillGrants() { const sp = SPEC_PROFS[norm(st.subclass)]; const o = {}; if (!sp || L() < 3) return o; (sp.skills || []).concat(st.specChoose).forEach((s) => o[s] = 1); return o; }

  // ── equipment ──────────────────────────────────────────────────────────
  // Calling choices are [[alternative tokens…]…] per group; "Martial melee weapon" /
  // "Simple melee weapon" placeholders become pick lists.
  function placeholderOpts(tok) {
    const m = String(tok).match(/^(simple|martial)\s+(melee|ranged)\s+weapon$/i); if (!m) return null;
    return D.weapons().filter((w) => norm(w.category) === norm(m[1]) && norm(w.kind) === norm(m[2])).map((w) => w.name);
  }
  function standardData() { const c = cul(); return c ? D.standards().find((s) => norm(s.name) === norm(c.standardOfLiving)) || null : null; }
  function resolveInv() {
    const c = cal(); const inv = [];
    const push = (name, qty) => { const ref = canonRef(name); const ex = inv.find((x) => x.name === (ref || name)); if (ex) ex.qty += qty; else inv.push({ name: ref || name, ref: ref || "", qty }); };
    (c ? c.equipmentChoices || [] : []).forEach((group, g) => {
      const alt = group[num(st.equip[g])] || group[0] || [];
      alt.forEach((tok, i) => { const po = placeholderOpts(tok); if (po) { const pick = st.equipPicks[g + "_" + i]; if (pick) push(pick, 1); } else push(tok, 1); });
    });
    const sd = standardData();
    (sd ? sd.gear : []).forEach((g) => { const m = String(g).match(/^(.*?)\s*×\s*(\d+)$/); if (m) push(m[1], num(m[2])); else push(g, 1); });
    const bt = bgToolName(); if (bt && canonRef(bt)) push(bt, 1);
    if (st.callingTools.length) st.callingTools.forEach((t) => { if (canonRef(t)) push(t, 1); });
    return inv;
  }
  function canonRef(name) {
    const w = weaponByName(name); if (w) return w.name;
    const n = norm(name); const all = D.armor().concat(D.gear());
    const hit = all.find((x) => norm(x.name) === n) || all.find((x) => norm(x.name) === n.replace(/s$/, "")) || all.find((x) => norm(x.name).replace(/s$/, "") === n);
    return hit ? hit.name : "";
  }
  function coinFromStandard() { const sd = standardData(); const m = sd && String(sd.coin || "").match(/(\d+)\s*([gsc])/i); if (!m) return { gp:0, sp:0, cp:0 }; const n = num(m[1]), u = m[2].toLowerCase(); return { gp: u === "g" ? n : 0, sp: u === "s" ? n : 0, cp: u === "c" ? n : 0 }; }
  function rewardSlots() { return D.rewardLevels().filter((l) => l <= L()); }
  function rEquipment() {
    const c = cal(); const sd = standardData();
    let h = '<p class="m-hint">Your calling\'s starting equipment, plus the gear of your culture\'s standard of living (<b>' + esc(sd ? sd.name : "—") + '</b>' + (sd && sd.coin ? ', ' + esc(sd.coin) : "") + ') and your background tool.</p>';
    (c ? c.equipmentChoices || [] : []).forEach((group, g) => {
      h += '<span class="m-lbl">Choice ' + (g + 1) + '</span><div class="dndb-grid" style="grid-template-columns:1fr;">';
      group.forEach((alt, a) => { h += '<div class="dndb-card' + (num(st.equip[g]) === a ? " on" : "") + '" data-eg="' + g + '" data-ea="' + a + '"><div class="dc-title">' + (group.length > 1 ? "(" + String.fromCharCode(97 + a) + ") " : "") + esc(alt.join(", ")) + '</div></div>'; });
      h += "</div>";
      const alt = group[num(st.equip[g])] || group[0] || [];
      alt.forEach((tok, i) => { const po = placeholderOpts(tok); if (po) h += '<div class="lb-row"><span class="lb-mini">' + esc(tok) + '</span><select class="m-input lb-eqpick" data-k="' + g + "_" + i + '" style="flex:1 1 200px;"><option value="">— choose —</option>' + po.map((n) => { const w = weaponByName(n); return '<option value="' + esc(n) + '"' + (st.equipPicks[g + "_" + i] === n ? " selected" : "") + '>' + esc(n) + ' — ' + esc(w.damage + " " + w.damageType + ((w.properties || []).length ? ", " + w.properties.join(", ") : "")) + '</option>'; }).join("") + '</select></div>'; });
    });
    if (sd) h += '<div class="dndb-note">' + esc(sd.name) + ' gear: ' + esc(sd.gear.join(", ")) + (bgToolName() ? ' · Background tool: ' + esc(bgToolName()) : "") + '</div>';
    const rs = rewardSlots();
    if (rs.length) {
      const inv = resolveInv(); const kinds = { Weapon: inv.filter((x) => weaponByName(x.name)), Armour: inv.filter((x) => D.armor().some((a) => a.name === x.name && a.category !== "Shield")), Shield: inv.filter((x) => /^shield$/i.test(x.name)) };
      h += '<span class="m-lbl" style="display:block;margin-top:12px;">Rewards earned (' + rs.join(", ") + ') — attach each to an item</span>';
      rs.forEach((lv) => {
        const r = st.rewards[lv] || (st.rewards[lv] = { reward: "", item: "" });
        const rd = D.rewards().find((x) => x.name === r.reward);
        const items = rd ? (kinds[rd.item] || []) : [];
        h += '<div class="lb-row"><span class="lb-mini">Level ' + lv + '</span><select class="m-input lb-rw" data-lv="' + lv + '" data-f="reward" style="flex:1 1 170px;"><option value="">— reward —</option>' + D.rewards().map((x) => '<option value="' + esc(x.name) + '"' + (r.reward === x.name ? " selected" : "") + '>' + esc(x.name) + ' (' + esc(x.item) + ')</option>').join("") + '</select>' +
          '<select class="m-input lb-rw" data-lv="' + lv + '" data-f="item" style="flex:1 1 170px;"><option value="">— on which item —</option>' + items.map((x) => { const clash = Object.keys(st.rewards).some((k) => k !== String(lv) && st.rewards[k].item === x.name && st.rewards[k].reward === r.reward); return '<option value="' + esc(x.name) + '"' + (r.item === x.name ? " selected" : "") + (clash ? " disabled" : "") + '>' + esc(x.name) + '</option>'; }).join("") + '</select></div>';
        if (rd) h += '<div class="lb-mini" style="margin:-2px 0 6px;">' + esc(rd.description) + '</div>';
      });
    }
    return h;
  }

  // ── build ──────────────────────────────────────────────────────────────
  function profTokensFor() {
    const c = cal(); const w = (c ? c.proficiencies.weapons : []).slice();
    [cul(), lin()].forEach((x) => { if (x && x.grants && x.grants.weapons) x.grants.weapons.forEach((t) => w.push(t)); });
    if (norm(st.subclass) === "herald") w.push("Martial");
    return w;
  }
  function weaponProficient(wp) { const toks = profTokensFor(); if (toks.some((t) => /^martial/i.test(t))) return true; if (toks.some((t) => /^simple/i.test(t)) && /simple/i.test(wp.category)) return true; return toks.some((t) => canonW(t) === canonW(wp.name)); }
  function buildCharacter() {
    const c = cal(), cu = cul(), b = bg(), sc = finalScores();
    const saveProf = {}; if (c) (c.savingThrows || []).forEach((s) => saveProf[s] = true);
    const skillProf = {}; allSkills().forEach((s) => skillProf[s] = 1);
    const picks = [st.startVirtue].filter((p) => p.virtue).concat(advPicks().filter((p) => p.mode !== "craft" && p.virtue));
    const profText = [];
    picks.forEach((p) => { const fx = virtueEffects(p); fx.saves.forEach((a) => saveProf[a] = true);
      fx.skills.forEach((s) => { const dbl = /!$/.test(s); s = s.replace(/!$/, ""); const r = matchSkill(s); if (!r) return; skillProf[r] = (skillProf[r] && dbl) ? 2 : Math.max(skillProf[r] || 0, 1); });
      fx.expertise.forEach((s) => { const r = matchSkill(s); if (r) skillProf[r] = 2; });
      fx.profText.forEach((t) => profText.push(t)); });
    const spg = specSkillGrants(); Object.keys(spg).forEach((s) => { const r = matchSkill(s); if (r) skillProf[r] = skillProf[r] ? 2 : 1; });
    st.expertise.forEach((s) => { const r = matchSkill(s); if (r) skillProf[r] = 2; else profText.push(s + " (expertise)"); });
    // equipment → inventory rows + equipped loadout + attacks
    const inv = resolveInv(); const ridBase = "rid_lb" + Date.now().toString(36);
    inv.forEach((it, i) => { it.rid = ridBase + "_" + i; it.rewards = []; });
    rewardSlots().forEach((lv) => { const r = st.rewards[lv]; if (!r || !r.reward || !r.item) return; const it = inv.find((x) => x.name === r.item && x.rewards.indexOf(r.reward) < 0); if (it) it.rewards.push(r.reward); });
    const hasShield = inv.some((it) => /^shield$/i.test(it.name));
    const wOf = (it) => weaponByName(it.name);
    const isLight = (w) => (w.properties || []).some((p) => /^light/i.test(p)), isTwoH = (w) => (w.properties || []).some((p) => /two-handed/i.test(p));
    let melee = null, ranged = null, offhand = null;
    inv.forEach((it) => { const w = wOf(it); if (!w) return;
      if (w.kind === "Ranged") { if (!ranged) ranged = it; return; }
      if (!melee) { if (!(hasShield && isTwoH(w))) melee = it; }
      else if (!offhand && !hasShield && isLight(w) && isLight(wOf(melee))) offhand = it; });
    const attacks = [];
    let armourDone = false;
    inv.forEach((it) => {
      const a = D.armor().find((x) => x.name === it.name);
      if (a && a.category !== "Shield" && !armourDone) { it.equipped = true; armourDone = true; }
      if (a && a.category === "Shield") it.equipped = true;
      const w = wOf(it);
      if (w && (it === melee || it === ranged || it === offhand)) {
        it.equipped = true;
        const fin = (w.properties || []).some((p) => /finesse/i.test(p));
        const abil = w.kind === "Ranged" ? "DEX" : (fin ? (mod(sc.DEX) > mod(sc.STR) ? "DEX" : "STR") : "STR");
        attacks.push({ name: w.name, abil, prof: weaponProficient(w), bonus: 0, damage: w.damage, type: w.damageType, weapon: w.name, rid: it.rid });
      }
    });
    const coins = coinFromStandard();
    // proficiency text
    const bits = [];
    if (c) { if ((c.proficiencies.armor || []).length) bits.push(c.proficiencies.armor.join(", ") + " armour"); bits.push(c.proficiencies.weapons.join(", ") + " weapons"); }
    [cu, lin()].forEach((x) => { if (x && x.grants) { if (x.grants.weapons) bits.push(x.grants.weapons.join(", ")); if (x.grants.armor) bits.push("All armour and shields"); } });
    if (norm(st.subclass) === "herald" && L() >= 3) bits.push("Medium armour, shields, martial weapons");
    const tools = allTools(); if (tools.length) bits.push("Tools: " + tools.join(", "));
    if (profText.length) bits.push(profText.join(", "));
    const languages = uniq((cu ? cu.languages || [] : []).concat(/erebor/i.test(st.subculture) ? ["Dalish"] : []));
    bits.push("Languages: " + languages.join(", "));
    const hp = hpFor(sc).hp;
    const virtues = picks.map((p) => ({ name: p.virtue, asi: virtueEffects(p).abil, pick: [p.save, p.prof, p.exp, p.skill].filter(Boolean).join(", ") }));
    const crafts = st.crafts.filter(Boolean);
    const styles = Object.keys(st.styles).sort().map((k) => st.styles[k]).filter(Boolean);
    const companions = picks.some((p) => /bree-pony/i.test(p.virtue)) ? [PONY(L())] : [];
    const xpT = (D.tables().xpByLevel || [])[L() - 1] || 0;
    const df = st.bgCustom ? st.features : (b ? b.distinctiveFeatures : st.features);
    return {
      system: "LOTR", v: 1, name: st.name, calling: st.calling, cls: st.calling, subclass: L() >= 3 ? st.subclass : "", level: L(),
      culture: st.culture, subculture: st.subculture, lineage: st.subculture, background: st.background, standard: cu ? cu.standardOfLiving : "",
      distinctiveFeatures: (st.features[0] || st.features[1]) ? st.features.slice() : (df || []).slice(),
      xp: xpT, scores: sc, saveProf, skillProf,
      speed: String(cu ? cu.speed : 30), ac: "10", hpCur: hp, hpMax: hp, hpTemp: 0, hdUsed: {},
      attacks, inventory: inv, gp: coins.gp, sp: coins.sp, cp: coins.cp,
      proficiencies: bits.join(" · "), notes: "",
      customFeatures: [], virtues, crafts, extraCraftSlots: advPicks().filter((p) => p.mode === "craft").length,
      fightingStyles: styles, favouredFoes: st.foes.slice(), wardedLands: st.lands.slice(),
      languages, size: cu ? cu.size : "Medium", companions, resourceUsed: {}, customResources: [],
      shadow: { points: 0, scars: 0, flaws: [] }, fellowship: { points: 0, rating: 0, heroes: 4, songs: [] },
      tab: "features", locked: true, options: {},
    };
  }
  function apply() {
    const data = buildCharacter();
    if (typeof window.applySheet === "function") window.applySheet(data);
    if (typeof window.saveSheet === "function") window.saveSheet(true);
    if (typeof window.addLog === "function") window.addLog("Hero Created", "✦", (st.name || "A new hero") + " — " + st.culture + " " + st.calling + " " + L(), "crit");
    close();
  }
  function rReview() {
    const sc = finalScores(), built = buildCharacter();
    let h = '<p class="m-hint">Here is your hero. Creating applies it to the sheet (replacing the current contents).</p>';
    h += '<label style="display:block;margin-bottom:10px;"><span class="m-lbl">Hero\'s name</span><input type="text" id="lotrb-name" class="m-input" placeholder="Bergil, son of Beregond" value="' + esc(st.name) + '"></label><div class="dndb-review">';
    h += '<div class="dr-line"><b>' + esc(st.name || "Unnamed") + '</b> — ' + esc(st.culture) + (st.subculture && st.subculture !== st.culture ? " (" + esc(st.subculture) + ")" : "") + ' · ' + esc(st.calling) + ' ' + L() + (built.subclass ? " (" + esc(built.subclass) + ")" : "") + ' · ' + esc(st.background) + '</div>';
    h += '<div class="dr-scores">' + ABIL.map((a) => '<div class="drs"><span class="drs-a">' + a + '</span><span class="drs-v">' + sc[a] + '</span><span class="drs-m">' + sgn(mod(sc[a])) + '</span></div>').join("") + '</div>';
    const hpI = hpFor(sc);
    h += '<div class="dr-line">HP <b>' + built.hpMax + '</b>' + (hpI.bits.length ? ' (' + esc(hpI.bits.join(", ")) + ')' : "") + ' · Hit dice <b>' + L() + 'd' + (cal() ? cal().hitDie : 8) + '</b> · Proficiency <b>+' + profBonusAt(L()) + '</b> · Speed <b>' + built.speed + ' ft.</b></div>';
    h += '<div class="dr-line">Saves: <b>' + esc(Object.keys(built.saveProf).join(", ")) + '</b></div>';
    h += '<div class="dr-line">Skills: <b>' + esc(Object.keys(built.skillProf).map((k) => k + (built.skillProf[k] > 1 ? " (expertise)" : "")).join(", ")) + '</b></div>';
    if (built.virtues.length) h += '<div class="dr-line">Virtues: <b>' + esc(built.virtues.map((v) => v.name + " (" + Object.keys(v.asi).map((k) => k + " +" + v.asi[k]).join(", ") + (v.pick ? "; " + v.pick : "") + ")").join(" · ")) + '</b></div>';
    if (built.crafts.length) h += '<div class="dr-line">Crafts: <b>' + esc(built.crafts.join(", ")) + '</b></div>';
    if (built.fightingStyles.length) h += '<div class="dr-line">Fighting style: <b>' + esc(built.fightingStyles.join(", ")) + '</b></div>';
    if (built.favouredFoes.length || built.wardedLands.length) h += '<div class="dr-line">Favoured foes: <b>' + esc(built.favouredFoes.join(", ") || "—") + '</b> · Warded lands: <b>' + esc(built.wardedLands.join(", ") || "—") + '</b></div>';
    h += '<div class="dr-line">Distinctive features: <b>' + esc(built.distinctiveFeatures.filter(Boolean).join(", ")) + '</b> · Standard of living: <b>' + esc(built.standard) + '</b></div>';
    h += '<div class="dr-line">' + esc(built.proficiencies) + '</div>';
    h += '<div class="dr-line">Gear: <b>' + esc(built.inventory.map((it) => (it.qty > 1 ? it.qty + " " : "") + it.name + (it.rewards.length ? " [" + it.rewards.join(", ") + "]" : "")).join(", ")) + '</b> · <b>' + built.sp + ' s</b></div>';
    const p = cal() && (window.LOTR_SHADOW || { paths: [] }).paths.find((x) => x.calling === cal().name);
    if (p) h += '<div class="dr-line">Shadow Path: <b>' + esc(p.name) + '</b> (' + esc(p.flaws.join(" → ")) + ')</div>';
    h += "</div>";
    return h;
  }

  // ── validation ─────────────────────────────────────────────────────────
  function blocker() {
    switch (STEPS[step]) {
      case "Culture": {
        const c = cul(); if (!c) return "Choose a culture";
        const subs = c.lineages || []; if (subs.length > 1 && !st.subculture) return "Choose a subculture";
        if (c.asiChoice && !st.rangerExtra) return "Choose your extra +1";
        if (c.grants && c.grants.skillChoice && st.cultureSkills.length < c.grants.skillChoice.count) return "Choose your culture skills";
        if (c.grants && c.grants.toolChoice && !st.cultureTool) return "Choose a tool";
        const sc = subChoices(); if (sc) { if (sc.skill && !st.subSkill) return "Choose a skill"; if (sc.tools && !st.subTool) return "Choose a tool"; }
        return "";
      }
      case "Background": { const b = bg(); if (!b) return "Choose a background"; if (st.bgCustom) { if (st.bgSkills.length < 2) return "Choose two skills"; if (!st.bgTool) return "Choose a tool"; } else { if (b.skillChoice && st.bgSkills.length < b.skillChoice.count) return "Choose skills"; if (bgToolSpec().options.length && !st.bgToolPick) return "Choose the tool"; } return ""; }
      case "Calling": { if (!cal()) return "Choose a calling"; const ts = callingToolSpec(); if (ts && ts.count && st.callingTools.length < ts.count) return "Choose calling tools"; return ""; }
      case "Abilities": {
        if (st.method === "roll" && !st.rolled) return "Roll your scores";
        if ((st.method === "array" || st.method === "roll") && !ABIL.every((a) => st.arrayPick[a] != null)) return "Assign every score";
        if (st.method === "pointbuy") { const costs = D.tables().pointBuyCosts || {}; if (ABIL.reduce((s, a) => s + (costs[st.base[a]] || 0), 0) > (D.tables().pointBuyBudget || 27)) return "Over budget"; }
        return "";
      }
      case "Skills": { const c = cal(); const n = c ? (c.proficiencies.skillsChoose || 2) : 0; const avail = c ? c.proficiencies.skillsFrom.filter((s) => grantedSkills().indexOf(s) < 0).length : 0; return st.classSkills.length >= Math.min(n, avail) ? "" : "Choose " + n + " skills"; }
      case "Virtue": return virtueComplete(st.startVirtue) ? "" : "Choose your starting virtue";
      case "Advancement": {
        const c = cal(); if (!c) return "";
        if (L() >= (c.subclassLevel || 3) && !st.subclass) return "Choose your " + c.subclassLabel;
        const sp = SPEC_PROFS[norm(st.subclass)]; if (sp && sp.choose && st.specChoose.length < sp.choose) return "Choose bonus proficiencies";
        if (styleSlots(st.calling, st.subclass, L()).some((s, i) => !st.styles[i])) return "Choose a fighting style";
        const ex = expertiseSlots(st.calling, L()).length * 2; if (st.expertise.length < ex) return "Choose Expertise";
        const w = wardenCounts(); if (st.foes.length < w.foes || st.lands.length < w.lands) return "Choose favoured foes / warded lands";
        if (advPicks().some((p) => p.mode !== "craft" && !virtueComplete(p))) return "Finish each virtue";
        if (craftTotal() && st.crafts.filter(Boolean).length < craftTotal()) return "Choose your crafts";
        return "";
      }
      case "Equipment": {
        const c = cal(); let miss = false;
        (c ? c.equipmentChoices || [] : []).forEach((group, g) => { const alt = group[num(st.equip[g])] || group[0] || []; alt.forEach((tok, i) => { if (placeholderOpts(tok) && !st.equipPicks[g + "_" + i]) miss = true; }); });
        if (miss) return "Pick your weapons";
        if (rewardSlots().some((lv) => !st.rewards[lv] || !st.rewards[lv].reward || !st.rewards[lv].item)) return "Assign each reward to an item";
        return "";
      }
      default: return "";
    }
  }

  // ── wiring ─────────────────────────────────────────────────────────────
  function toggleIn(arr, v, max) { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else { if (arr.length >= max) arr.shift(); arr.push(v); } }
  function wire() {
    const body = $("lotrb-body");
    const on = (sel, fn, ev) => body.querySelectorAll(sel).forEach((el) => el.addEventListener(ev || "click", () => { if (el.classList.contains("disabled")) return; fn(el); render(); }));
    const nm = $("lotrb-name"); if (nm) nm.addEventListener("input", () => { st.name = nm.value; });
    const lv = $("lotrb-level"); if (lv) lv.addEventListener("change", () => { st.level = num(lv.value); st.rewards = {}; render(); });
    on("[data-culture]", (el) => { if (st.culture !== el.dataset.culture) { st.culture = el.dataset.culture; st.subculture = ""; st.rangerExtra = ""; st.cultureSkills = []; st.cultureTool = ""; st.subTool = ""; st.subSkill = ""; st.background = ""; st.startVirtue = { virtue: "" }; st.picks = []; const c = cul(); if (c && (c.lineages || []).length === 1) st.subculture = c.lineages[0].name; } });
    on("[data-sub]", (el) => { st.subculture = el.dataset.sub; st.subTool = ""; st.subSkill = ""; });
    on("[data-rx]", (el) => { st.rangerExtra = el.dataset.rx; });
    on("[data-cs]", (el) => toggleIn(st.cultureSkills, el.dataset.cs, num(el.dataset.max)));
    on("[data-ct]", (el) => { st.cultureTool = el.dataset.ct; });
    on("[data-ss]", (el) => { st.subSkill = el.dataset.ss; });
    on("#lotrb-subtool", (el) => { st.subTool = el.value; }, "change");
    on("[data-bg]", (el) => { if (st.background !== el.dataset.bg) { st.background = el.dataset.bg; st.bgSkills = []; st.bgToolPick = ""; const b = bg(); st.features = b ? b.distinctiveFeatures.slice() : ["", ""]; } });
    on("#lotrb-bgcustom", (el) => { st.bgCustom = el.checked; st.bgSkills = []; }, "change");
    on("[data-bs]", (el) => toggleIn(st.bgSkills, el.dataset.bs, num(el.dataset.max)));
    on("#lotrb-bgtool", (el) => { st.bgTool = el.value; }, "change");
    on("#lotrb-bgtoolpick", (el) => { st.bgToolPick = el.value; }, "change");
    on(".lb-df", (el) => { st.features[num(el.dataset.i)] = el.value; }, "change");
    on("[data-calling]", (el) => { if (st.calling !== el.dataset.calling) { st.calling = el.dataset.calling; st.subclass = ""; st.classSkills = []; st.callingTools = []; st.styles = {}; st.picks = []; st.expertise = []; st.foes = []; st.lands = []; st.crafts = []; st.specChoose = []; st.equip = {}; st.equipPicks = {}; st.rewards = {}; } });
    on("[data-ctool]", (el) => toggleIn(st.callingTools, el.dataset.ctool, num(el.dataset.max)));
    on("[data-method]", (el) => { st.method = el.dataset.method; st.arrayPick = {}; });
    on("#lotrb-roll", () => { st.rolled = Array.from({ length: 6 }, () => { const r = [1,2,3,4].map(() => 1 + Math.floor(Math.random() * 6)).sort((a, b) => a - b); return r[1] + r[2] + r[3]; }).sort((a, b) => b - a); st.arrayPick = {}; });
    on(".lotrb-array", (el) => { const a = el.dataset.abil, v = el.value; ABIL.forEach((x) => { if (x !== a && String(st.arrayPick[x]) === String(v)) delete st.arrayPick[x]; }); if (v === "") delete st.arrayPick[a]; else st.arrayPick[a] = num(v); }, "change");
    body.querySelectorAll(".lotrb-manual").forEach((el) => el.addEventListener("change", () => { st.manual[el.dataset.abil] = Math.max(3, Math.min(20, num(el.value) || 10)); render(); }));
    on("[data-pb]", (el) => { const costs = D.tables().pointBuyCosts || {8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9}, budget = D.tables().pointBuyBudget || 27; const a = el.dataset.pb, nx = st.base[a] + num(el.dataset.d); if (nx < 8 || nx > 15) return; let spent = 0; ABIL.forEach((x) => spent += costs[x === a ? nx : st.base[x]] || 0); if (spent <= budget) st.base[a] = nx; });
    on("[data-sk]", (el) => toggleIn(st.classSkills, el.dataset.sk, num(el.dataset.max)));
    on("[data-sv]", (el) => { if (st.startVirtue.virtue !== el.dataset.sv) st.startVirtue = { virtue: el.dataset.sv }; });
    on("[data-spec]", (el) => { st.subclass = el.dataset.spec; st.specChoose = []; st.styles = {}; });
    on("[data-spc]", (el) => toggleIn(st.specChoose, el.dataset.spc, num(el.dataset.max)));
    on("[data-style]", (el) => { st.styles[el.dataset.si] = el.dataset.style; });
    on("[data-exp]", (el) => toggleIn(st.expertise, el.dataset.exp, num(el.dataset.max)));
    on("[data-foe]", (el) => toggleIn(st.foes, el.dataset.foe, num(el.dataset.max)));
    on("[data-land]", (el) => toggleIn(st.lands, el.dataset.land, num(el.dataset.max)));
    on("[data-pmode]", (el) => { const p = st.picks[num(el.dataset.i)]; p.mode = el.dataset.pmode; if (p.mode === "craft") { const lvl = p.level; Object.keys(p).forEach((k) => delete p[k]); p.mode = "craft"; p.level = lvl; } });
    on(".lb-craft", (el) => { st.crafts[num(el.dataset.i)] = el.value; }, "change");
    on("[data-eg]", (el) => { st.equip[el.dataset.eg] = num(el.dataset.ea); Object.keys(st.equipPicks).forEach((k) => { if (k.indexOf(el.dataset.eg + "_") === 0) delete st.equipPicks[k]; }); });
    on(".lb-eqpick", (el) => { st.equipPicks[el.dataset.k] = el.value; }, "change");
    on(".lb-rw", (el) => { const r = st.rewards[el.dataset.lv] || (st.rewards[el.dataset.lv] = { reward: "", item: "" }); r[el.dataset.f] = el.value; if (el.dataset.f === "reward") r.item = ""; }, "change");
    wireVirtue(body, (k) => k === "start" ? st.startVirtue : st.picks[num(k.replace("adv", ""))], render);
  }

  window.LOTRB = { launch, close, next, back, _state: () => st, _build: () => buildCharacter(), _blocker: () => blocker(), _step: () => STEPS[step] };

  // builder styles (shared with the level-up wizard): green and gold
  const css = document.createElement("style");
  css.textContent =
    ".lb-steplbl{color:#b9cfa6;font-family:'EB Garamond',serif;font-size:13px;letter-spacing:.02em;margin-left:8px;}" +
    ".lb-why{font-size:13px;color:#e2a06b;font-style:italic;}" +
    ".dndb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin:8px 0;}" +
    ".dndb-card{border:1px solid #2c4a37;border-radius:7px;background:#15291e;padding:8px 10px;cursor:pointer;transition:.1s;}" +
    ".dndb-card:hover{border-color:#c9a227;}" +
    ".dndb-card.on{border-color:#c9a227;background:#1f3a29;box-shadow:0 0 0 1px #c9a227 inset;}" +
    ".dndb-card.small{padding:6px 8px;}.dndb-card.disabled{opacity:.45;cursor:default;}" +
    ".dc-title{font-family:'EB Garamond',serif;font-weight:600;font-size:15.5px;color:#f1e9d0;}" +
    ".dc-sub{font-size:12px;color:#a7b59c;margin-top:2px;font-family:'EB Garamond',serif;line-height:1.3;}" +
    ".dndb-note,.lb-note{font-size:13.5px;color:#d6d0b8;line-height:1.5;margin-top:8px;border-left:3px solid #c9a227;padding:4px 0 4px 10px;}" +
    ".lb-traits{font-size:13px;color:#c4c9ac;line-height:1.45;margin:8px 0;display:flex;flex-direction:column;gap:4px;max-height:220px;overflow:auto;padding-right:4px;}" +
    ".lb-traits b{color:#e2c36b;font-weight:600;}" +
    ".lb-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:4px 0 8px;}" +
    ".lb-mini{font-size:12.5px;color:#a7b59c;}.lb-mini b{color:#e2c36b;}" +
    ".lb-box{border:1px solid #2c4a37;border-radius:8px;padding:8px 10px;margin:8px 0;background:#0f2118;}" +
    ".lb-chip{display:inline-block;border:1px solid #2f4a39;border-radius:14px;background:#15291e;color:#d6d0b8;padding:4px 11px;font-size:13.5px;cursor:pointer;user-select:none;}" +
    ".lb-chip:hover{border-color:#c9a227;}.lb-chip.on{background:#c9a227;color:#14200f;border-color:#c9a227;font-weight:600;}.lb-chip.disabled{opacity:.4;cursor:default;text-decoration:line-through;}" +
    ".dndb-seg{display:flex;gap:0;border:1px solid #2c4a37;border-radius:6px;overflow:hidden;margin-bottom:12px;flex-wrap:wrap;}" +
    ".dndb-seg-btn{flex:1;padding:8px;background:#11241a;color:#a7b59c;border:none;cursor:pointer;font-family:'EB Garamond',serif;font-weight:600;font-size:13.5px;}" +
    ".lb-row .dndb-seg-btn{flex:0 0 auto;border:1px solid #2c4a37;border-radius:6px;padding:5px 10px;}" +
    ".dndb-seg-btn.on{background:#c9a227;color:#14200f;}.dndb-seg-btn:disabled{opacity:.35;cursor:not-allowed;}" +
    ".dndb-abil-rows{display:flex;flex-direction:column;gap:6px;margin:8px 0;}" +
    ".dndb-abil-row{display:flex;align-items:center;gap:10px;}" +
    ".dar-name{flex:1;font-family:'EB Garamond',serif;font-weight:600;font-size:15px;color:#ece4cc;}" +
    ".dar-val{font-family:'EB Garamond',serif;font-variant-numeric:lining-nums;font-size:20px;font-weight:600;color:#e2c36b;min-width:28px;text-align:center;}" +
    ".dndb-pm{width:32px;height:32px;background:#c9a227;color:#14200f;border:none;border-radius:5px;font-size:17px;cursor:pointer;}" +
    ".dndb-pb-head{font-size:14px;color:#d6d0b8;margin-bottom:6px;}.dndb-pb-head b{color:#e2c36b;}" +
    ".dndb-totals,.dr-scores{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;}" +
    ".drs{border:1px solid #2c4a37;border-radius:7px;background:#15291e;padding:5px 8px;text-align:center;min-width:54px;}" +
    ".drs-a{display:block;font-family:'Aniron','EB Garamond',serif;font-size:11px;color:#a7b59c;}" +
    ".drs-v{display:block;font-family:'EB Garamond',serif;font-variant-numeric:lining-nums;font-size:20px;font-weight:600;color:#f1e9d0;}" +
    ".drs-m{display:block;font-family:'EB Garamond',serif;font-variant-numeric:lining-nums;font-size:12px;color:#e2c36b;}" +
    ".dndb-review .dr-line{font-size:14px;color:#d6d0b8;line-height:1.55;margin-top:6px;}.dndb-review b{color:#f1e9d0;font-weight:600;}" +
    "#lotrb-overlay select.m-input,#lotrlu-overlay select.m-input{width:auto;max-width:100%;}" +
    "@media (max-width:640px){.dndb-grid{grid-template-columns:1fr 1fr;}.lb-chip{padding:7px 12px;}}";
  document.head.appendChild(css);
})();
