// ACE! Hero Builder — a guided walk through the six-step Hero Checklist
// (Role → Stats → Focuses → Defence & Health → Trait → Name), plus a shortcut
// to load one of the omnibus' pregenerated Heroes. Runs inside
// tools/templates/ace_character_sheet.html and reads the ACE_* globals emitted
// by scripts/build-ace-data.mjs. Everything it produces goes through the
// sheet's own applySheet()/saveSheet(), so the result is an ordinary saved card.
//
// Exposed as window.ACEB: launch(), close(), onSettingChange().
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => String(s || "").trim().toLowerCase();
  const D = {
    roles: () => (typeof ACE_ROLES !== "undefined" ? ACE_ROLES : []),
    focuses: () => (typeof ACE_FOCUSES !== "undefined" ? ACE_FOCUSES : []),
    traits: () => (typeof ACE_TRAITS !== "undefined" ? ACE_TRAITS : []),
    gear: () => (typeof ACE_GEAR !== "undefined" ? ACE_GEAR : []),
    settings: () => (typeof ACE_SETTINGS !== "undefined" ? ACE_SETTINGS : []),
    pregens: () => (typeof ACE_PREGENS !== "undefined" ? ACE_PREGENS : []),
  };
  const STAT_IDS = ["smarts", "moves", "style", "brawn"];
  const STAT_NAME = { smarts: "Smarts", moves: "Moves", style: "Style", brawn: "Brawn", power: "Power" };
  const POINTS = 12, MIN = 2, MAX = 5;

  // ── builder state ──
  let st = null;
  let step = 0;
  const STEPS = ["Start", "Role", "Stats", "Focuses", "Trait", "Gear", "Review"];

  function fresh() {
    return {
      mode: "new",            // "new" | "pregen"
      pregen: null,
      setting: ($("f-setting") && $("f-setting").value) || "core",
      name: "",
      role: null,             // AceRole
      roleName: "",
      role2: "",
      roleFilter: "",
      roleQuery: "",
      stats: { smarts: 3, moves: 3, style: 3, brawn: 3, power: 2 },
      focuses: { smarts: "", moves: "", style: "", brawn: "", power: "" },
      trait: "",
      gear: [],
      gearCustom: "",
    };
  }
  function hasPower() { return !!(st.role && st.role.power); }
  function statIds() { return hasPower() ? STAT_IDS.concat(["power"]) : STAT_IDS; }
  function pointsUsed() { return statIds().reduce((a, id) => a + (st.stats[id] || 0), 0); }
  function settingName(key) { const s = D.settings().find((x) => x.key === key); return s ? s.name : "Core rules"; }
  function rolesForSetting() {
    // Core roles are always on the table; a setting adds its own. The setting's
    // recommended core roles float to the top so the book's suggestions lead.
    const key = st.setting;
    const setting = D.settings().find((s) => s.key === key);
    const rec = new Set((setting ? setting.recommendedRoles : []).map(norm));
    const own = D.roles().filter((r) => r.setting === key && key !== "core");
    const core = D.roles().filter((r) => r.setting === "core");
    const ownNames = new Set(own.map((r) => norm(r.name)));
    const coreRest = core.filter((r) => !ownNames.has(norm(r.name)));
    const recommended = coreRest.filter((r) => rec.has(norm(r.name)));
    const rest = coreRest.filter((r) => !rec.has(norm(r.name)));
    return { own, recommended, rest, setting };
  }

  // ── modal shell ──
  function ensureModal() {
    if ($("aceb-overlay")) return;
    const ov = document.createElement("div");
    ov.id = "aceb-overlay";
    ov.className = "ov";
    ov.innerHTML =
      '<div class="modal wide" style="max-width:820px;">' +
      '<div class="modal-hd"><div class="ttl">✨ Hero Builder <span id="aceb-step" style="color:#8ac0ff;font-size:12px;letter-spacing:.08em;margin-left:8px;"></span></div><button class="x" onclick="ACEB.close()">&#10005;</button></div>' +
      '<div class="modal-bd" id="aceb-body"></div>' +
      '<div class="modal-ft"><div><button class="m-btn ghost" id="aceb-back" onclick="ACEB.back()">← Back</button></div>' +
      '<div style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="ACEB.close()">Cancel</button><button class="m-btn" id="aceb-next" onclick="ACEB.next()">Next →</button></div></div>' +
      "</div>";
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
    document.body.appendChild(ov);
    const css = document.createElement("style");
    css.textContent =
      ".aceb-chips{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 10px;}" +
      ".aceb-chip{background:#222;border:1px solid #3a3a40;color:#bbb;border-radius:3px;padding:4px 9px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;}" +
      ".aceb-chip.on{background:#1d3a4d;border-color:#3aa8e0;color:#8ad4ff;}" +
      ".aceb-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:6px;max-height:46vh;overflow-y:auto;padding-right:4px;}" +
      ".aceb-card{background:#141416;border:1px solid #2a2a30;border-radius:4px;padding:8px 10px;cursor:pointer;transition:border-color .1s;}" +
      ".aceb-card:hover{border-color:#3aa8e0;}.aceb-card.on{border-color:#f4d84a;background:#1e1c12;}" +
      ".aceb-card b{display:block;font-family:'Barlow Condensed',sans-serif;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#f0eee6;}" +
      ".aceb-card small{display:block;font-size:11px;color:#9a9aa2;line-height:1.4;margin-top:2px;}" +
      ".aceb-card .tag{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#6ac8df;}" +
      ".aceb-stat{display:grid;grid-template-columns:110px 34px 60px 34px 1fr;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid #2a2a30;}" +
      ".aceb-stat b{font-family:'Barlow Condensed',sans-serif;font-size:15px;letter-spacing:.04em;text-transform:uppercase;}" +
      ".aceb-stat small{color:#888;font-size:10px;display:block;text-transform:none;letter-spacing:0;font-weight:400;}" +
      ".aceb-stat .v{font-family:'Share Tech Mono',monospace;font-size:22px;text-align:center;color:#f4d84a;}" +
      ".aceb-stat .stp{width:34px;height:34px;background:#1a1a1a;border:1px solid #333;color:#ddd;font-size:18px;font-weight:900;cursor:pointer;border-radius:3px;}" +
      ".aceb-stat .stp:hover{background:#333;}" +
      ".aceb-stat .dots{display:flex;gap:3px;}.aceb-stat .dot{width:14px;height:14px;border-radius:50%;background:#f4d84a;}.aceb-stat .dot.off{background:#2a2a30;}" +
      ".aceb-pts{font-family:'Barlow Condensed',sans-serif;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#bbb;margin-bottom:6px;}" +
      ".aceb-pts b{color:#f4d84a;font-family:'Share Tech Mono',monospace;font-size:16px;}.aceb-pts .bad{color:#df6a6a;}.aceb-pts .good{color:#7fd39a;}" +
      ".aceb-focus{display:grid;grid-template-columns:90px 1fr;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid #2a2a30;}" +
      ".aceb-focus b{font-family:'Barlow Condensed',sans-serif;font-size:14px;letter-spacing:.04em;text-transform:uppercase;}" +
      ".aceb-focus select,.aceb-focus input{width:100%;padding:7px 8px;background:#141414;border:1px solid #2a2a2a;border-radius:4px;color:#eee;font-family:Barlow,sans-serif;font-size:13px;outline:none;}" +
      ".aceb-review{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;font-size:13px;}" +
      ".aceb-review .k{color:#888;font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:.1em;text-transform:uppercase;}" +
      ".aceb-review .v{color:#f0eee6;}" +
      ".aceb-big{display:flex;gap:10px;flex-wrap:wrap;}" +
      ".aceb-big .aceb-card{flex:1;min-width:200px;padding:14px;}.aceb-big .aceb-card b{font-size:18px;}" +
      "@media(max-width:600px){.aceb-stat{grid-template-columns:90px 30px 44px 30px 1fr;}.aceb-review{grid-template-columns:1fr;}}";
    document.head.appendChild(css);
  }

  function launch() {
    ensureModal();
    st = fresh();
    step = 0;
    $("aceb-overlay").classList.add("open");
    render();
  }
  function close() { const ov = $("aceb-overlay"); if (ov) ov.classList.remove("open"); }
  function onSettingChange() { if (st) st.setting = $("f-setting").value; }

  // ── validation per step ──
  function canProceed() {
    switch (STEPS[step]) {
      case "Start": return st.mode === "new" || !!st.pregen;
      case "Role": return !!st.roleName.trim();
      case "Stats": return pointsUsed() === POINTS && statIds().every((id) => st.stats[id] >= MIN && st.stats[id] <= MAX);
      case "Trait": return !!st.trait.trim();
      default: return true;
    }
  }
  function next() {
    if (!canProceed()) return;
    if (STEPS[step] === "Start" && st.mode === "pregen") { applyPregen(); return; }
    if (STEPS[step] === "Review") { applyNew(); return; }
    step += 1;
    render();
  }
  function back() { if (step > 0) { step -= 1; render(); } }

  // ── rendering ──
  function render() {
    $("aceb-step").textContent = STEPS[step] === "Start" ? "" : "Step " + step + " of " + (STEPS.length - 1) + " — " + STEPS[step];
    $("aceb-back").style.visibility = step === 0 ? "hidden" : "visible";
    const nextBtn = $("aceb-next");
    nextBtn.textContent = STEPS[step] === "Review" ? "Build this Hero ✓" : (STEPS[step] === "Start" && st.mode === "pregen") ? "Load this Hero ✓" : "Next →";
    const body = $("aceb-body");
    const fn = { Start: rStart, Role: rRole, Stats: rStats, Focuses: rFocuses, Trait: rTrait, Gear: rGear, Review: rReview }[STEPS[step]];
    body.innerHTML = fn();
    wire();
    nextBtn.disabled = !canProceed();
  }
  function refreshNext() { $("aceb-next").disabled = !canProceed(); }

  function rStart() {
    const settings = D.settings();
    const pregens = D.pregens().filter((p) => st.setting === "core" || p.setting === st.setting);
    return (
      '<p class="m-hint">Build a Hero from scratch with the six-step checklist, or grab one of the book\'s pregenerated Heroes. Either way you can tweak everything on the card afterwards.</p>' +
      '<div class="m-lbl">Setting</div>' +
      '<select class="m-input" data-k="setting"><option value="core"' + (st.setting === "core" ? " selected" : "") + '>Any — core rules</option>' +
      settings.map((s) => '<option value="' + esc(s.key) + '"' + (st.setting === s.key ? " selected" : "") + ">" + esc(s.name) + " — " + esc(s.tagline) + "</option>").join("") +
      "</select>" +
      '<div class="m-lbl">How do you want to start?</div>' +
      '<div class="aceb-big">' +
      '<div class="aceb-card' + (st.mode === "new" ? " on" : "") + '" data-mode="new"><b>New Hero</b><small>Pick a Role, spend 12 Stat points, choose Focuses and a Trait.</small></div>' +
      '<div class="aceb-card' + (st.mode === "pregen" ? " on" : "") + '" data-mode="pregen"><b>Pregenerated Hero</b><small>' + pregens.length + " ready-made Heroes" + (st.setting === "core" ? " across every setting" : " for " + esc(settingName(st.setting))) + ".</small></div>" +
      "</div>" +
      (st.mode === "pregen"
        ? '<div class="m-lbl">Choose a Hero</div><div class="aceb-list">' +
          pregens.map((p, i) => '<div class="aceb-card' + (st.pregen === p ? " on" : "") + '" data-pregen="' + i + '"><span class="tag">' + esc(settingName(p.setting)) + "</span><b>" + esc(p.name) + "</b><small>" + esc(p.trait) + " " + esc(p.role) + " · Smarts " + p.smarts + " · Moves " + p.moves + " · Style " + p.style + " · Brawn " + p.brawn + (p.power ? " · Power " + p.power : "") + "</small></div>").join("") +
          "</div>"
        : "")
    );
  }

  function rRole() {
    const { own, recommended, rest, setting } = rolesForSetting();
    const cats = [...new Set([].concat(own, recommended, rest).map((r) => r.category))];
    const q = norm(st.roleQuery);
    const show = (r) => (!st.roleFilter || r.category === st.roleFilter) && (!q || norm(r.name).includes(q) || norm(r.ability).includes(q));
    const card = (r, tag) =>
      '<div class="aceb-card' + (st.role === r ? " on" : "") + '" data-role="' + esc(r.name) + '|' + esc(r.setting) + '">' +
      (tag ? '<span class="tag">' + esc(tag) + "</span>" : "") + "<b>" + esc(r.name) + (r.power ? " ✦" : "") + "</b><small>" + esc(r.ability) + "</small></div>";
    let list = "";
    if (own.length) list += own.filter(show).map((r) => card(r, settingName(r.setting))).join("");
    if (recommended.length) list += recommended.filter(show).map((r) => card(r, "Recommended")).join("");
    list += rest.filter(show).map((r) => card(r, r.category)).join("");
    return (
      '<p class="m-hint">Your Role is what makes you <i>you</i> — and it gives you one special ability. ' +
      (setting ? "<b>" + esc(setting.name) + "</b> adds its own Roles and recommends a few from the core list. " : "") +
      "Roles marked ✦ grant a Power Stat. Don't like any? Type your own name and write the ability on the card.</p>" +
      '<div style="display:flex;gap:6px;"><input class="m-input" data-k="roleQuery" placeholder="Search roles…" value="' + esc(st.roleQuery) + '"><input class="m-input" data-k="roleName" placeholder="Or type a custom Role" value="' + esc(st.role ? "" : st.roleName) + '" style="max-width:220px;"></div>' +
      '<div class="aceb-chips"><span class="aceb-chip' + (!st.roleFilter ? " on" : "") + '" data-cat="">All</span>' + cats.map((c) => '<span class="aceb-chip' + (st.roleFilter === c ? " on" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</span>").join("") + "</div>" +
      '<div class="aceb-list">' + (list || '<p class="m-hint">Nothing matches.</p>') + "</div>" +
      '<div class="m-lbl">Second Role (optional — descriptive only, no second ability)</div>' +
      '<input class="m-input" data-k="role2" placeholder="Ninja Turtle? Druid Astronaut?" value="' + esc(st.role2) + '">'
    );
  }

  function rStats() {
    const ids = statIds();
    const used = pointsUsed();
    const left = POINTS - used;
    const hints = { smarts: "clever, perceptive, knowledgeable", moves: "quick, accurate, agile · Defence = ×3", style: "cool, stylish, charismatic", brawn: "strong, tough · Health = Brawn", power: "magic / psionics · costs 1 Karma per use" };
    return (
      '<p class="m-hint">Spend <b>12 points</b> across your Stats. Each must be between <b>2</b> and <b>5</b>; 3 is an average adult.' +
      (hasPower() ? " Your Role grants a <b>Power</b> Stat — it shares the same 12 points, no extras." : "") + "</p>" +
      '<div class="aceb-pts">Points left: <b class="' + (left === 0 ? "good" : left < 0 ? "bad" : "") + '">' + left + "</b> / " + POINTS + '<button class="aceb-chip" data-random="1" style="margin-left:12px;">🎲 Randomise</button><button class="aceb-chip" data-reset="1" style="margin-left:6px;">Reset to 3s</button></div>' +
      ids.map((id) => {
        const v = st.stats[id];
        return '<div class="aceb-stat"><b>' + STAT_NAME[id] + "<small>" + hints[id] + '</small></b><button class="stp" data-stat="' + id + '" data-d="-1">−</button><div class="v">' + v + '</div><button class="stp" data-stat="' + id + '" data-d="1">+</button><div class="dots">' + [1, 2, 3, 4, 5].map((i) => '<span class="dot' + (i > v ? " off" : "") + '"></span>').join("") + "</div></div>";
      }).join("") +
      '<p class="m-hint" style="margin-top:10px;">Defence will be <b>' + Math.max(8, st.stats.moves * 3) + "</b> (Moves × 3, min 8; +6 with the Dodging Focus). Health will be <b>" + (st.stats.brawn + (st.role && st.role.healthBonus ? st.role.healthBonus : 0)) + "</b> (Brawn" + (st.role && st.role.healthBonus ? " +" + st.role.healthBonus + " from " + esc(st.role.name) : "") + "; +2 with the Tough Focus).</p>"
    );
  }

  function rFocuses() {
    const ids = statIds();
    const free = (st.role && st.role.grantsFocus) || [];
    return (
      '<p class="m-hint">For each Stat, pick one <b>Focus</b> — an area of expertise worth <b>+2 dice</b> when it applies. Not on the list? Type your own; the Director might say yes.' +
      (free.length ? " Your Role also grants <b>" + esc(free.join(", ")) + "</b> for free — noted on the card." : "") + "</p>" +
      ids.map((id) => {
        const opts = D.focuses().filter((f) => norm(f.stat) === id);
        const cur = st.focuses[id];
        const known = opts.some((f) => f.name === cur);
        return '<div class="aceb-focus"><b>' + STAT_NAME[id] + " " + st.stats[id] + '</b><div style="display:flex;gap:6px;"><select data-focus="' + id + '"><option value="">— choose —</option>' +
          opts.map((f) => '<option value="' + esc(f.name) + '"' + (cur === f.name ? " selected" : "") + ">" + esc(f.name) + (f.note ? " · " + esc(f.note) : "") + (f.setting !== "core" ? " (" + esc(settingName(f.setting)) + ")" : "") + "</option>").join("") +
          '<option value="__custom"' + (cur && !known ? " selected" : "") + ">Custom…</option></select>" +
          '<input data-focus-custom="' + id + '" placeholder="custom Focus" value="' + esc(cur && !known ? cur : "") + '" style="' + (cur && !known ? "" : "display:none;") + 'max-width:160px;"></div></div>';
      }).join("")
    );
  }

  function rTrait() {
    const traits = D.traits();
    const core = traits.filter((t) => t.setting === "core");
    const own = traits.filter((t) => t.setting !== "core" && t.setting === st.setting);
    const card = (t) => '<div class="aceb-card' + (st.trait === t.name ? " on" : "") + '" data-trait="' + esc(t.name) + '"><b>' + esc(t.name) + "</b>" + (t.description ? "<small>" + esc(t.description) + "</small>" : "") + "</div>";
    return (
      '<p class="m-hint">Your Role gives you an ability; your <b>Trait</b> gives you a complication. Play it up and the Director awards Karma. It\'s always an adjective — <b>' + esc(st.trait || "Squeamish") + " " + esc(st.roleName || "Scientist") + '</b>. No two Heroes in a group should share one.</p>' +
      '<input class="m-input" data-k="trait" placeholder="Or type your own adjective" value="' + esc(st.trait) + '">' +
      (own.length ? '<div class="m-lbl">' + esc(settingName(st.setting)) + ' Traits</div><div class="aceb-list" style="max-height:none;">' + own.map(card).join("") + "</div>" : "") +
      '<div class="m-lbl">Core Traits</div><div class="aceb-list">' + core.map(card).join("") + "</div>"
    );
  }

  function rGear() {
    // Free starting kit + priced weapons for the setting (core weapons always).
    const gear = D.gear();
    const mine = gear.filter((g) => g.setting === st.setting && st.setting !== "core");
    const core = gear.filter((g) => g.setting === "core");
    const pick = (g) => '<div class="aceb-card' + (st.gear.includes(g.name) ? " on" : "") + '" data-gear="' + esc(g.name) + '"><span class="tag">' + esc(g.category) + (g.tier ? " · " + esc(g.tier) + (g.tn ? " " + g.tn : "") : "") + "</span><b>" + esc(g.name) + (g.damage ? " · " + g.damage + " dmg" : "") + "</b><small>" + esc(g.description) + "</small></div>";
    return (
      '<p class="m-hint">You already have the regular stuff your Role suggests (a Soldier has a rifle; a Samurai has a sword; everybody has underpants). Tick anything specific you want on the card — weapons get an Attack row with their damage.</p>' +
      (mine.length ? '<div class="m-lbl">' + esc(settingName(st.setting)) + ' gear</div><div class="aceb-list" style="max-height:32vh;">' + mine.map(pick).join("") + "</div>" : "") +
      '<div class="m-lbl">Core weapons &amp; gear</div><div class="aceb-list" style="max-height:32vh;">' + core.map(pick).join("") + "</div>" +
      '<div class="m-lbl">Anything else (one item per line)</div><textarea class="m-input" data-k="gearCustom" rows="3" placeholder="Fedora, bullwhip, a very good dog">' + esc(st.gearCustom) + "</textarea>"
    );
  }

  function rReview() {
    const ids = statIds();
    const def = Math.max(8, st.stats.moves * 3 + (/^dodg/i.test(st.focuses.moves) ? 6 : 0));
    const hp = st.stats.brawn + (/^tough/i.test(st.focuses.brawn) ? 2 : 0) + ((st.role && st.role.healthBonus) || 0);
    const row = (k, v) => '<div><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";
    return (
      '<p class="m-hint">Last thing — give your Hero a name. Otherwise how will they make reservations at restaurants?</p>' +
      '<input class="m-input" data-k="name" placeholder="Hero name" value="' + esc(st.name) + '" style="font-size:16px;">' +
      '<div class="aceb-review" style="margin-top:14px;">' +
      row("Trait / Role", esc(st.trait) + " " + esc(st.roleName) + (st.role2 ? " (" + esc(st.role2) + ")" : "")) +
      row("Setting", esc(settingName(st.setting))) +
      ids.map((id) => row(STAT_NAME[id] + " " + st.stats[id], esc(st.focuses[id] || "—") + " · " + (st.stats[id] + (st.focuses[id] ? 2 : 0)) + " dice")).join("") +
      row("Defence", def) + row("Health", hp) + row("Karma", 6) +
      row("Ability", esc(st.role ? st.role.ability : "Write your own on the card")) +
      row("Gear", esc(st.gear.concat(st.gearCustom.split("\n").map((s) => s.trim()).filter(Boolean)).join(", ") || "Whatever your Role suggests")) +
      "</div>"
    );
  }

  // ── event wiring (delegated per render) ──
  function wire() {
    const body = $("aceb-body");
    body.querySelectorAll("[data-k]").forEach((el) => {
      el.addEventListener("input", () => {
        st[el.dataset.k] = el.value;
        if (el.dataset.k === "roleName") { st.role = null; body.querySelectorAll(".aceb-card.on[data-role]").forEach((c) => c.classList.remove("on")); }
        if (el.dataset.k === "trait") body.querySelectorAll(".aceb-card.on[data-trait]").forEach((c) => c.classList.remove("on"));
        if (el.dataset.k === "roleQuery") { render(); const q = body.querySelector('[data-k="roleQuery"]'); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } return; }
        refreshNext();
      });
      if (el.dataset.k === "setting") el.addEventListener("change", () => { st.setting = el.value; st.pregen = null; st.role = null; st.roleFilter = ""; render(); });
    });
    body.querySelectorAll("[data-mode]").forEach((el) => el.addEventListener("click", () => { st.mode = el.dataset.mode; render(); }));
    body.querySelectorAll("[data-pregen]").forEach((el) => el.addEventListener("click", () => {
      const list = D.pregens().filter((p) => st.setting === "core" || p.setting === st.setting);
      st.pregen = list[+el.dataset.pregen] || null; render();
    }));
    body.querySelectorAll("[data-cat]").forEach((el) => el.addEventListener("click", () => { st.roleFilter = el.dataset.cat; render(); }));
    body.querySelectorAll("[data-role]").forEach((el) => el.addEventListener("click", () => {
      const [name, setting] = el.dataset.role.split("|");
      const r = D.roles().find((x) => x.name === name && x.setting === setting);
      st.role = r; st.roleName = r ? r.name : name;
      if (r && r.grantsFocus) {
        // Pre-fill the free Focus on the matching Stat if it's empty.
        r.grantsFocus.forEach((fn) => { const f = D.focuses().find((x) => norm(x.name) === norm(fn)); if (f && !st.focuses[norm(f.stat)]) st.focuses[norm(f.stat)] = f.name; });
      }
      render();
    }));
    body.querySelectorAll("[data-stat]").forEach((el) => el.addEventListener("click", () => {
      const id = el.dataset.stat, d = +el.dataset.d;
      const v = st.stats[id] + d;
      if (v < MIN || v > MAX) return;
      if (d > 0 && pointsUsed() >= POINTS) return;
      st.stats[id] = v; render();
    }));
    body.querySelectorAll("[data-random]").forEach((el) => el.addEventListener("click", () => {
      const ids = statIds();
      ids.forEach((id) => (st.stats[id] = MIN));
      let left = POINTS - ids.length * MIN;
      let guard = 0;
      while (left > 0 && guard++ < 200) { const id = ids[Math.floor(Math.random() * ids.length)]; if (st.stats[id] < MAX) { st.stats[id]++; left--; } }
      render();
    }));
    body.querySelectorAll("[data-reset]").forEach((el) => el.addEventListener("click", () => { statIds().forEach((id) => (st.stats[id] = hasPower() ? 2 : 3)); if (hasPower()) { st.stats.smarts = 3; st.stats.moves = 3; } render(); }));
    body.querySelectorAll("[data-focus]").forEach((el) => el.addEventListener("change", () => {
      const id = el.dataset.focus;
      const custom = body.querySelector('[data-focus-custom="' + id + '"]');
      if (el.value === "__custom") { custom.style.display = ""; custom.focus(); st.focuses[id] = custom.value; }
      else { custom.style.display = "none"; st.focuses[id] = el.value; }
      refreshNext();
    }));
    body.querySelectorAll("[data-focus-custom]").forEach((el) => el.addEventListener("input", () => { st.focuses[el.dataset.focusCustom] = el.value; }));
    body.querySelectorAll("[data-trait]").forEach((el) => el.addEventListener("click", () => { st.trait = el.dataset.trait; render(); }));
    body.querySelectorAll("[data-gear]").forEach((el) => el.addEventListener("click", () => {
      const n = el.dataset.gear;
      const i = st.gear.indexOf(n);
      if (i >= 0) st.gear.splice(i, 1); else st.gear.push(n);
      el.classList.toggle("on", i < 0);
    }));
    const first = body.querySelector('[data-k="name"]');
    if (first) first.focus();
  }

  // ── apply to the sheet ──
  function weaponRows(names) {
    const rows = [];
    names.forEach((n) => {
      const g = D.gear().find((x) => norm(x.name) === norm(n) && x.damage);
      if (!g) return;
      const ranged = /pistol|rifle|bow|gun|blaster|blazer|bazooka|grenade|thrower|laser|rocket|crossbow|sling|machine|revolver|derringer|uzi/i.test(g.name + " " + (g.description || ""));
      rows.push({ name: g.name, kind: ranged ? "ranged" : "melee", damage: g.damage });
    });
    return rows;
  }
  function applyNew() {
    const r = st.role;
    const stats = { smarts: st.stats.smarts, moves: st.stats.moves, style: st.stats.style, brawn: st.stats.brawn, power: hasPower() ? st.stats.power : 0 };
    if (r && r.statMods) Object.keys(r.statMods).forEach((k) => { const id = norm(k); if (stats[id] !== undefined) stats[id] += r.statMods[k]; });
    const gearNames = st.gear.concat(st.gearCustom.split("\n").map((s) => s.trim()).filter(Boolean));
    const attacks = [{ name: "Unarmed", kind: "melee", damage: "" }].concat(weaponRows(gearNames));
    if (hasPower()) attacks.push({ name: "Power bolt", kind: "power", damage: 1 });
    const data = {
      system: "ACE", v: 1,
      name: st.name, trait: st.trait, role: st.roleName, role2: st.role2, setting: st.setting,
      hasPower: hasPower(), stats, focuses: Object.assign({}, st.focuses, { power: hasPower() ? st.focuses.power : "" }),
      defBonus: 0, hpBonus: (r && r.healthBonus) || 0, hpCur: null, karma: 6,
      ability: r ? r.ability + (r.grantsFocus ? " (Free Focus: " + r.grantsFocus.join(", ") + ".)" : "") : "",
      traitNotes: "", notes: "",
      attacks,
      gear: gearNames.map((n) => { const g = D.gear().find((x) => norm(x.name) === norm(n)); return { name: n, note: g ? (g.description || "").slice(0, 80) : "" }; }),
      campaign: (typeof _campaign !== "undefined" && _campaign) ? { id: _campaign.id, code: _campaign.code, name: _campaign.name } : null,
    };
    finish(data, "Built " + (st.trait + " " + st.roleName).trim());
  }
  function applyPregen() {
    const p = st.pregen;
    const focuses = {};
    ["smarts", "moves", "style", "brawn", "power"].forEach((id) => { const k = STAT_NAME[id]; focuses[id] = (p.focuses && p.focuses[k] && p.focuses[k].length) ? p.focuses[k].join(", ") : ""; });
    const attacks = [{ name: "Unarmed", kind: "melee", damage: "" }].concat(weaponRows(p.gear || []));
    if (p.power) attacks.push({ name: "Power bolt", kind: "power", damage: 1 });
    // Health/Defence are printed on the card; keep them via bonuses so the
    // derived numbers match the book even when they stray from the formula.
    const baseDef = Math.max(8, p.moves * 3 + (/^dodg/i.test(focuses.moves) ? 6 : 0));
    const baseHp = p.brawn + (/^tough/i.test(focuses.brawn) ? 2 : 0);
    const data = {
      system: "ACE", v: 1,
      name: p.name, trait: p.trait, role: p.role, role2: "", setting: p.setting,
      hasPower: !!p.power, stats: { smarts: p.smarts, moves: p.moves, style: p.style, brawn: p.brawn, power: p.power || 0 }, focuses,
      defBonus: (p.defence || baseDef) - baseDef, hpBonus: (p.health || baseHp) - baseHp, hpCur: null, karma: 6,
      ability: p.ability || "", traitNotes: "", notes: p.bio || "",
      attacks,
      gear: (p.gear || []).map((n) => ({ name: n, note: "" })),
      campaign: (typeof _campaign !== "undefined" && _campaign) ? { id: _campaign.id, code: _campaign.code, name: _campaign.name } : null,
    };
    finish(data, "Loaded " + p.name + " (" + settingName(p.setting) + ")");
  }
  function finish(data, msg) {
    if (typeof applySheet === "function") applySheet(data);
    if (typeof saveSheet === "function") saveSheet(true);
    if (typeof syncDocTitle === "function") syncDocTitle();
    if (typeof addLog === "function") addLog("Hero Builder", "✨", msg, "crit");
    close();
  }

  window.ACEB = { launch, close, next, back, onSettingChange };
})();
