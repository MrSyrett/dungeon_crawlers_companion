// Nimble Hero Builder — the Core Rules' "Making a Hero" in seven steps: class,
// ancestry, background & motivation, stat array, skill points, starting gear,
// name. Runs inside tools/templates/nimble_character_sheet.html against the
// NIMBLE_* globals; the result goes through the sheet's applySheet()/saveSheet().
// Exposed as window.NIMB.
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => String(s || "").replace(/[’‘]/g, "'").trim().toLowerCase();
  const D = {
    classes: () => (typeof NIMBLE_CLASSES !== "undefined" ? NIMBLE_CLASSES : []),
    ancestries: () => (typeof NIMBLE_ANCESTRIES !== "undefined" ? NIMBLE_ANCESTRIES : []),
    backgrounds: () => (typeof NIMBLE_BACKGROUNDS !== "undefined" ? NIMBLE_BACKGROUNDS : []),
    motivations: () => (typeof NIMBLE_MOTIVATIONS !== "undefined" ? NIMBLE_MOTIVATIONS : []),
    items: () => (typeof NIMBLE_ITEMS !== "undefined" ? NIMBLE_ITEMS : []),
    spells: () => (typeof NIMBLE_SPELLS !== "undefined" ? NIMBLE_SPELLS : []),
    tables: () => (typeof NIMBLE_TABLES !== "undefined" ? NIMBLE_TABLES : null),
  };
  const STATS = ["STR", "DEX", "INT", "WIL"];
  const SKILLS = [["Arcana", "INT"], ["Examination", "INT"], ["Finesse", "DEX"], ["Influence", "WIL"], ["Insight", "WIL"], ["Lore", "INT"], ["Might", "STR"], ["Naturecraft", "WIL"], ["Perception", "WIL"], ["Stealth", "DEX"]];
  const STEPS = ["Class", "Ancestry", "Background", "Stats", "Skills", "Gear", "Name"];
  let st = null, step = 0;

  function fresh() {
    return { cls: null, ancestry: null, background: null, motivation: null, array: "Standard", stats: { STR: 0, DEX: 0, INT: 0, WIL: 0 }, assigned: false, skills: {}, gearMode: "class", gearPicks: [], name: "", body: "" };
  }
  function arrays() { const T = D.tables(); return (T && T.statArrays) || [{ name: "Standard", values: [2, 2, 0, -1] }, { name: "Balanced", values: [2, 1, 1, 0] }, { name: "Min–Max", values: [3, 1, -1, -1] }]; }
  function arrayValues() { return (arrays().find((a) => a.name === st.array) || arrays()[0]).values.slice(); }
  function statsOk() { const want = arrayValues().sort((a, b) => a - b).join(","); const have = STATS.map((s) => st.stats[s]).sort((a, b) => a - b).join(","); return want === have; }
  function skillPts() { return Object.values(st.skills).reduce((a, b) => a + (b || 0), 0); }
  const maxSkillPts = () => 4 + (st.ancestry && /\+2 shifting skill points/i.test(traitText(st.ancestry)) ? 2 : 0);
  const traitText = (a) => a.traits.map((t) => t.text).join(" ");

  function ensureModal() {
    if ($("nimb-overlay")) return;
    const ov = document.createElement("div"); ov.id = "nimb-overlay"; ov.className = "ov";
    ov.innerHTML = '<div class="modal wide" style="max-width:880px;"><div class="modal-hd"><div class="ttl">✨ Hero Builder <span id="nimb-step" style="color:#8ad4ff;font-size:12px;letter-spacing:.08em;margin-left:8px;"></span></div><button class="x" onclick="NIMB.close()">&#10005;</button></div><div class="modal-bd" id="nimb-body"></div><div class="modal-ft"><div><button class="m-btn ghost" id="nimb-back" onclick="NIMB.back()">← Back</button></div><div style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="NIMB.close()">Cancel</button><button class="m-btn" id="nimb-next" onclick="NIMB.next()">Next →</button></div></div></div>';
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
    document.body.appendChild(ov);
    const css = document.createElement("style");
    css.textContent =
      ".nb-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px;max-height:48vh;overflow-y:auto;padding-right:4px;}" +
      ".nb-card{background:#141614;border:1px solid #2a2e2a;border-radius:4px;padding:8px 10px;cursor:pointer;}" +
      ".nb-card:hover{border-color:#3fb97a;}.nb-card.on{border-color:#7fd39a;background:#1a2a20;}" +
      ".nb-card b{display:block;font-family:'Barlow Condensed',sans-serif;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#f0eee6;}" +
      ".nb-card small{display:block;font-size:11px;color:#9a9aa2;line-height:1.4;margin-top:2px;}.nb-card .tag{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#8ad4ff;}" +
      ".nb-chips{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 10px;}.nb-chip{background:#222;border:1px solid #3a3a40;color:#bbb;border-radius:3px;padding:4px 9px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;}.nb-chip.on{background:#1a2a20;border-color:#3fb97a;color:#a8e6c1;}" +
      ".nb-stat{display:grid;grid-template-columns:90px 1fr;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid #2a2e2a;}.nb-stat b{font-family:'Barlow Condensed',sans-serif;font-size:15px;letter-spacing:.06em;}.nb-stat b small{display:block;font-size:9px;color:#8ad4ff;font-weight:600;letter-spacing:.08em;}" +
      ".nb-stat .opts{display:flex;gap:4px;}.nb-stat .opts span{flex:1;text-align:center;padding:6px 0;background:#1a1a1a;border:1px solid #333;border-radius:3px;font-family:'Share Tech Mono',monospace;font-size:13px;cursor:pointer;color:#bbb;}.nb-stat .opts span.on{background:#1a2a20;border-color:#3fb97a;color:#fff;}.nb-stat .opts span.taken{opacity:.35;}" +
      ".nb-skill{display:grid;grid-template-columns:120px 40px 30px 40px 30px 1fr;gap:6px;align-items:center;padding:4px 0;border-bottom:1px solid #2a2e2a;font-size:13px;}.nb-skill b{font-family:'Barlow Condensed',sans-serif;font-size:14px;}.nb-skill .stp{width:30px;height:28px;background:#1a1a1a;border:1px solid #333;color:#ddd;font-size:16px;font-weight:900;cursor:pointer;border-radius:3px;}.nb-skill .v{font-family:'Share Tech Mono',monospace;text-align:center;color:#7fd39a;font-size:15px;}" +
      ".nb-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;}.nb-review{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;font-size:13px;}.nb-review .k{color:#888;font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:.1em;text-transform:uppercase;}.nb-review .v{color:#f0eee6;}" +
      "@media(max-width:600px){.nb-grid,.nb-review{grid-template-columns:1fr;}.nb-skill{grid-template-columns:100px 34px 26px 34px 26px 1fr;}}";
    document.head.appendChild(css);
  }
  function launch() { ensureModal(); st = fresh(); step = 0; $("nimb-overlay").classList.add("open"); render(); }
  function close() { const ov = $("nimb-overlay"); if (ov) ov.classList.remove("open"); }
  function canProceed() {
    switch (STEPS[step]) {
      case "Class": return !!st.cls; case "Ancestry": return !!st.ancestry; case "Background": return !!st.background;
      case "Stats": return statsOk(); case "Skills": return skillPts() <= maxSkillPts(); default: return true;
    }
  }
  function next() { if (!canProceed()) return; if (STEPS[step] === "Name") { apply(); return; } step += 1; render(); }
  function back() { if (step > 0) { step -= 1; render(); } }
  function render() {
    $("nimb-step").textContent = "Step " + (step + 1) + " of " + STEPS.length + " — " + STEPS[step];
    $("nimb-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("nimb-next").textContent = STEPS[step] === "Name" ? "Build this hero ✓" : "Next →";
    $("nimb-body").innerHTML = ({ Class: rClass, Ancestry: rAncestry, Background: rBackground, Stats: rStats, Skills: rSkills, Gear: rGear, Name: rName })[STEPS[step]]();
    wire(); $("nimb-next").disabled = !canProceed();
  }

  function rClass() {
    return '<p class="m-hint">Your class has the largest impact on everything else. Key stats are the two your class leans on; saves show which is advantaged (+) and disadvantaged (−).</p><div class="nb-list">' +
      D.classes().map((c) => '<div class="nb-card' + (st.cls === c ? " on" : "") + '" data-class="' + esc(c.name) + '"><span class="tag">' + esc(c.keyStats.join(" · ")) + " · d" + c.hitDie + " · HP " + c.startingHp + " · " + esc(c.saves.advantaged) + "+ " + esc(c.saves.disadvantaged) + "−</span><b>" + esc(c.name) + "</b><small>" + esc(c.tagline) + "</small></div>").join("") + "</div>";
  }
  function rAncestry() {
    const card = (a) => '<div class="nb-card' + (st.ancestry === a ? " on" : "") + '" data-ancestry="' + esc(a.name) + '"><span class="tag">' + esc(a.group) + " · " + esc(a.size) + "</span><b>" + esc(a.name) + "</b><small>" + a.traits.map((t) => "<b style=\"display:inline;font-size:11px;\">" + esc(t.name) + ".</b> " + esc(t.text)).join(" ") + "</small></div>";
    return '<p class="m-hint">Your kin, lineage or heritage. Flavor is free — with the GM\'s nod you can pair any ancestry with any trait.</p><div class="nb-list">' + D.ancestries().map(card).join("") + "</div>";
  }
  function rBackground() {
    return '<p class="m-hint">A background is a glimpse of your past with a small mechanical hook. A motivation is optional — why does your hero adventure?</p>' +
      '<div class="m-lbl">Background</div><div class="nb-list" style="max-height:34vh;">' + D.backgrounds().map((b) => '<div class="nb-card' + (st.background === b ? " on" : "") + '" data-background="' + esc(b.name) + '"><b>' + esc(b.name) + "</b><small>" + esc(b.description) + "</small></div>").join("") + "</div>" +
      '<div class="m-lbl">Motivation (optional)</div><div class="nb-chips">' + D.motivations().map((m) => '<span class="nb-chip' + (st.motivation === m ? " on" : "") + '" data-motivation="' + esc(m.name) + '" title="' + esc(m.description) + '">' + esc(m.name) + "</span>").join("") + "</div>";
  }
  function rStats() {
    const vals = arrayValues(); const key = st.cls ? st.cls.keyStats : [];
    return '<p class="m-hint">Pick a stat array and assign its numbers. Put the highest in your key stats (<b>' + esc(key.join(" & ")) + "</b>). Saves come from your class: " + esc(st.cls.saves.advantaged) + " advantaged, " + esc(st.cls.saves.disadvantaged) + " disadvantaged.</p>" +
      '<div class="nb-chips">' + arrays().map((a) => '<span class="nb-chip' + (st.array === a.name ? " on" : "") + '" data-array="' + esc(a.name) + '">' + esc(a.name) + ": " + a.values.map((v) => (v >= 0 ? "+" : "") + v).join(", ") + "</span>").join("") + "</div>" +
      STATS.map((s) => '<div class="nb-stat"><b>' + s + (key.includes(s) ? "<small>KEY</small>" : "<small>&nbsp;</small>") + '</b><div class="opts">' + vals.map((v, i) => '<span class="' + (st.assigned && st.stats[s] === v && countAssigned(v, s) ? "on" : "") + '" data-stat="' + s + "|" + v + '">' + (v >= 0 ? "+" : "") + v + "</span>").join("") + "</div></div>").join("") +
      '<p class="m-hint" style="margin-top:8px;">' + (statsOk() ? "Every value of the array is used once ✓" : "Assign each value exactly once (values can repeat when the array repeats them).") + '</p><div class="nb-chips"><span class="nb-chip" data-auto="1">Auto-assign (key stats first)</span></div>';
  }
  function countAssigned() { return true; }
  function rSkills() {
    const left = maxSkillPts() - skillPts();
    return '<p class="m-hint">Each skill starts at its stat. Spend <b>' + maxSkillPts() + "</b> extra points anywhere (max +12 in a skill). Points left: <b>" + left + "</b></p>" +
      SKILLS.map(([n, s]) => { const base = st.stats[s] + (st.ancestry && /\+1 to all skills/i.test(traitText(st.ancestry)) ? 1 : 0); const x = st.skills[n] || 0; return '<div class="nb-skill"><b>' + n + ' <span style="color:#888;font-size:10px;">' + s + "</span></b><span class=\"v\">" + (base >= 0 ? "+" : "") + base + '</span><button class="stp" data-skill="' + n + '|-1">−</button><span class="v">' + (x ? "+" + x : "") + '</span><button class="stp" data-skill="' + n + '|1">+</button><span class="v" style="text-align:left;">= ' + (base + x >= 0 ? "+" : "") + (base + x) + "</span></div>"; }).join("");
  }
  function rGear() {
    const c = st.cls; const gold = (D.tables() && D.tables().creation && D.tables().creation.startingGold) || 50;
    return '<p class="m-hint">Start with your class\'s listed gear, or take <b>' + gold + " gp</b> and shop. Your class is proficient with: " + esc(c.armor) + " · " + esc(c.weapons) + ".</p>" +
      '<div class="nb-chips"><span class="nb-chip' + (st.gearMode === "class" ? " on" : "") + '" data-gear="class">Class starting gear</span><span class="nb-chip' + (st.gearMode === "gold" ? " on" : "") + '" data-gear="gold">' + gold + " gp instead</span></div>" +
      (st.gearMode === "class" ? '<div class="nb-list" style="max-height:30vh;">' + c.startingGear.map((g) => { const it = D.items().find((i) => norm(i.name) === norm(g.replace(/\s*\(.*\)$/, ""))); return '<div class="nb-card on"><b>' + esc(g) + "</b><small>" + (it ? esc([it.armor && "Armor " + it.armor, it.damage, it.properties].filter(Boolean).join(" · ")) : "") + "</small></div>"; }).join("") + "</div>" : '<p class="m-hint">Add purchases from the equipment list on the sheet afterwards.</p>');
  }
  function rName() {
    const c = st.cls; const row = (k, v) => '<div><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";
    return '<div class="nb-grid"><input class="m-input" data-k="name" placeholder="Hero name" value="' + esc(st.name) + '" style="font-size:16px;"><input class="m-input" data-k="body" placeholder="Height · weight" value="' + esc(st.body) + '"></div>' +
      '<div class="nb-review" style="margin-top:14px;">' + row("Class", esc(c.name)) + row("Ancestry · Background", esc(st.ancestry.name) + " · " + esc(st.background.name)) +
      row("Stats", STATS.map((s) => s + " " + (st.stats[s] >= 0 ? "+" : "") + st.stats[s]).join(" · ")) + row("Saves", esc(c.saves.advantaged) + " ▲ · " + esc(c.saves.disadvantaged) + " ▼") +
      row("HP · Hit Die", c.startingHp + " · d" + c.hitDie) + row("Armor · Initiative", (st.stats.DEX >= 0 ? "+" : "") + st.stats.DEX + " unarmored · " + (st.stats.DEX >= 0 ? "+" : "") + st.stats.DEX) +
      row("Skill points", Object.entries(st.skills).filter(([, v]) => v).map(([k, v]) => k + " +" + v).join(", ") || "none spent") + row("Gear", esc(st.gearMode === "class" ? c.startingGear.join(", ") : "50 gp")) + "</div>";
  }
  function wire() {
    const body = $("nimb-body");
    body.querySelectorAll("[data-k]").forEach((el) => el.addEventListener("input", () => { st[el.dataset.k] = el.value; }));
    body.querySelectorAll("[data-class]").forEach((el) => el.addEventListener("click", () => { st.cls = D.classes().find((c) => c.name === el.dataset.class); render(); }));
    body.querySelectorAll("[data-ancestry]").forEach((el) => el.addEventListener("click", () => { st.ancestry = D.ancestries().find((a) => a.name === el.dataset.ancestry); render(); }));
    body.querySelectorAll("[data-background]").forEach((el) => el.addEventListener("click", () => { st.background = D.backgrounds().find((b) => b.name === el.dataset.background); render(); }));
    body.querySelectorAll("[data-motivation]").forEach((el) => el.addEventListener("click", () => { const m = D.motivations().find((x) => x.name === el.dataset.motivation); st.motivation = st.motivation === m ? null : m; render(); }));
    body.querySelectorAll("[data-array]").forEach((el) => el.addEventListener("click", () => { st.array = el.dataset.array; st.assigned = false; STATS.forEach((s) => (st.stats[s] = 0)); render(); }));
    body.querySelectorAll("[data-stat]").forEach((el) => el.addEventListener("click", () => { const [s, v] = el.dataset.stat.split("|"); st.stats[s] = +v; st.assigned = true; render(); }));
    body.querySelectorAll("[data-auto]").forEach((el) => el.addEventListener("click", () => {
      const vals = arrayValues().sort((a, b) => b - a); const order = st.cls.keyStats.concat(STATS.filter((s) => !st.cls.keyStats.includes(s)));
      order.forEach((s, i) => (st.stats[s] = vals[i])); st.assigned = true; render();
    }));
    body.querySelectorAll("[data-skill]").forEach((el) => el.addEventListener("click", () => { const [n, d] = el.dataset.skill.split("|"); const nx = (st.skills[n] || 0) + +d; if (nx < 0) return; if (+d > 0 && skillPts() >= maxSkillPts()) return; st.skills[n] = nx; render(); }));
    body.querySelectorAll("[data-gear]").forEach((el) => el.addEventListener("click", () => { st.gearMode = el.dataset.gear; render(); }));
    const first = body.querySelector('[data-k="name"]'); if (first) first.focus();
  }
  function apply() {
    const c = st.cls;
    const gear = st.gearMode === "class" ? c.startingGear : [];
    const inventory = gear.map((g) => { const it = D.items().find((i) => norm(i.name) === norm(g.replace(/\s*\(.*\)$/, ""))); return { name: g, slots: it && /2-handed/i.test(it.properties || "") ? 2 : 1, note: it ? [it.armor && "Armor " + it.armor, it.damage, it.properties].filter(Boolean).join(" · ") : "" }; });
    const attacks = [];
    gear.forEach((g) => { const it = D.items().find((i) => norm(i.name) === norm(g.replace(/\s*\(.*\)$/, "")) && i.damage); if (it) attacks.push({ name: it.name, damage: it.damage, props: it.properties || "" }); });
    const armorItem = gear.map((g) => D.items().find((i) => norm(i.name) === norm(g.replace(/\s*\(.*\)$/, "")) && ["Cloth", "Leather", "Mail", "Plate"].includes(i.category))).find(Boolean);
    const shieldItem = gear.map((g) => D.items().find((i) => norm(i.name) === norm(g.replace(/\s*\(.*\)$/, "")) && i.category === "Shield")).find(Boolean);
    // Casters: start with the cantrips of their class schools.
    const spells = [];
    if (c.spellcasting) {
      const m = /Schools?:\s*([^.(]+)/i.exec(c.spellcasting);
      const schools = m ? m[1].split(/,|\band\b|\bplus\b/).map((s) => s.trim()).filter((s) => /^(Fire|Ice|Lightning|Wind|Radiant|Necrotic)$/i.test(s)) : [];
      D.spells().filter((s) => s.tier === 0 && !s.utility && schools.some((x) => norm(x) === norm(s.school))).forEach((s) => spells.push({ name: s.name, tier: 0 }));
    }
    const mm = /=\s*\(?(INT|WIL)(×3|x3)?\)?\s*\+\s*LVL/i.exec(c.spellcasting || "");
    const mana = mm ? Math.max(0, st.stats[mm[1].toUpperCase()] * (mm[2] ? 3 : 1) + 1) : 0;
    const lang = ["Common"].concat(st.stats.INT > 0 ? Array.from({ length: st.stats.INT }, () => "+1 language") : []).join(", ");
    const data = {
      system: "NIM", v: 1, name: st.name, ancestry: st.ancestry.name, cls: c.name, subclass: "", level: 1, background: st.background.name, motivation: st.motivation ? st.motivation.name : "",
      stats: Object.assign({}, st.stats), saveAdv: c.saves.advantaged, saveDis: c.saves.disadvantaged, skillPts: Object.assign({}, st.skills),
      hp: { cur: c.startingHp, max: c.startingHp, temp: 0 }, wounds: 0, woundsMax: 0, hitDice: { cur: 1, max: 0 }, mana: { cur: mana, max: 0 },
      armor: armorItem ? armorItem.name : "", shield: shieldItem ? shieldItem.name : "", armorBonus: 0, initBonus: 0, speedBonus: 0, size: st.ancestry.size.split(/\s|\(/)[0] || "Medium", actions: 3,
      attacks, picks: [], spells, inventory, gold: st.gearMode === "gold" ? 50 : 0, traits: "", languages: lang, body: st.body, notes: "",
      campaign: (typeof _campaign !== "undefined" && _campaign) ? { id: _campaign.id, code: _campaign.code, name: _campaign.name } : null,
    };
    if (typeof applySheet === "function") applySheet(data);
    if (typeof lookupTraits === "function") lookupTraits();
    if (typeof saveSheet === "function") saveSheet(true);
    if (typeof syncDocTitle === "function") syncDocTitle();
    if (typeof addLog === "function") addLog("Hero Builder", "✨", "Built " + (st.name || "a hero") + " — " + st.ancestry.name + " " + c.name, "crit");
    close();
  }
  window.NIMB = { launch, close, next, back };
})();
