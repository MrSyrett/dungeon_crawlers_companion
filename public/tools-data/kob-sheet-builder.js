// Kids on Bikes / Brooms / Capes — Character Builder. Walks the books' own
// order: pick a Trope (or assign dice from scratch), an age/grade, two
// Strengths and a Flaw, the book's extras (bike / wand & broom & familiar /
// Cape & Power), the finishing touches, then a name. Runs inside
// tools/templates/kob_character_sheet.html and reads the KOB_* globals emitted
// by scripts/build-kob-data.mjs; the result goes through the sheet's own
// applySheet()/saveSheet(). Exposed as window.KOBB.
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const norm = (s) => String(s || "").trim().toLowerCase();
  const D = {
    books: () => (typeof KOB_BOOKS !== "undefined" ? KOB_BOOKS : []),
    tropes: () => (typeof KOB_TROPES !== "undefined" ? KOB_TROPES : []),
    strengths: () => (typeof KOB_STRENGTHS !== "undefined" ? KOB_STRENGTHS : []),
    flaws: () => (typeof KOB_FLAWS !== "undefined" ? KOB_FLAWS : []),
    items: () => (typeof KOB_ITEMS !== "undefined" ? KOB_ITEMS : []),
    capes: () => (typeof KOB_CAPES !== "undefined" ? KOB_CAPES : []),
  };
  const STATS = ["Brains", "Brawn", "Fight", "Flight", "Charm", "Grit"];
  const DICE = [20, 12, 10, 8, 6, 4];
  const BOOK_NAMES = { bikes: "Kids on Bikes", brooms: "Kids on Brooms", capes: "Kids in Capes" };
  const STEPS = ["Start", "Trope", "Age", "Strengths", "Extras", "Touches", "Review"];

  let st = null, step = 0;
  function fresh() {
    return {
      book: ($("f-book") && $("f-book").value) || "bikes",
      mode: "trope", trope: null, tropeQuery: "",
      dice: { Brains: 8, Brawn: 8, Fight: 8, Flight: 8, Charm: 8, Grit: 8 },
      age: "", strengths: [], strengthNotes: {}, flaw: "",
      knack: "", bikeColor: "", bikeAcc: "",
      wood: "", core: "", broom: "", familiar: "", favClass: "",
      cape: "", powerCat: "", powerDesc: "", boost: "Charm", reduce: "Brawn",
      motivations: "", fear: "", obligations: "", bag: "",
      name: "", lastName: "", pronouns: "",
    };
  }
  const info = () => D.books().find((b) => b.key === st.book) || null;
  const ageGroup = () => (info() ? info().ageGroups.find((a) => a.name === st.age) : null);
  const bookLabel = () => BOOK_NAMES[st.book];
  const itemsOf = (kind) => D.items().filter((i) => i.book === st.book && i.kind === kind);
  function diceOk() { return STATS.map((s) => st.dice[s]).sort((a, b) => a - b).join(",") === "4,6,8,10,12,20"; }

  function ensureModal() {
    if ($("kobb-overlay")) return;
    const ov = document.createElement("div");
    ov.id = "kobb-overlay"; ov.className = "ov";
    ov.innerHTML =
      '<div class="modal wide" style="max-width:840px;">' +
      '<div class="modal-hd"><div class="ttl">✨ Character Builder <span id="kobb-step" style="color:#8ad4ff;font-size:12px;letter-spacing:.08em;margin-left:8px;"></span></div><button class="x" onclick="KOBB.close()">&#10005;</button></div>' +
      '<div class="modal-bd" id="kobb-body"></div>' +
      '<div class="modal-ft"><div><button class="m-btn ghost" id="kobb-back" onclick="KOBB.back()">← Back</button></div><div style="display:flex;gap:8px;"><button class="m-btn ghost" onclick="KOBB.close()">Cancel</button><button class="m-btn" id="kobb-next" onclick="KOBB.next()">Next →</button></div></div></div>';
    ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
    document.body.appendChild(ov);
    const css = document.createElement("style");
    css.textContent =
      ".kb-chips{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0 10px;}" +
      ".kb-chip{background:#222;border:1px solid #3a3a40;color:#bbb;border-radius:3px;padding:4px 9px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;}" +
      ".kb-chip.on{background:#2d2144;border-color:#a56ee8;color:#d9c2ff;}" +
      ".kb-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:6px;max-height:46vh;overflow-y:auto;padding-right:4px;}" +
      ".kb-card{background:#141416;border:1px solid #2a2a30;border-radius:4px;padding:8px 10px;cursor:pointer;transition:border-color .1s;}" +
      ".kb-card:hover{border-color:#a56ee8;}.kb-card.on{border-color:#c9aaff;background:#231c31;}" +
      ".kb-card b{display:block;font-family:'Barlow Condensed',sans-serif;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#f0eee6;}" +
      ".kb-card small{display:block;font-size:11px;color:#9a9aa2;line-height:1.4;margin-top:2px;}" +
      ".kb-card .tag{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#8ad4ff;}" +
      ".kb-dice{display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;}.kb-dice span{font-family:'Share Tech Mono',monospace;font-size:10px;background:#1e1e24;border:1px solid #333;border-radius:3px;padding:1px 5px;color:#ddd;}" +
      ".kb-dice span.hi{color:#c9aaff;border-color:#5c3596;}.kb-dice span.lo{color:#df8a8a;border-color:#7a2d2d;}" +
      ".kb-stat{display:grid;grid-template-columns:110px 1fr;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid #2a2a30;}" +
      ".kb-stat b{font-family:'Barlow Condensed',sans-serif;font-size:15px;letter-spacing:.04em;text-transform:uppercase;}" +
      ".kb-stat .opts{display:flex;gap:4px;}.kb-stat .opts span{flex:1;text-align:center;padding:6px 0;background:#1a1a1a;border:1px solid #333;border-radius:3px;font-family:'Share Tech Mono',monospace;font-size:12px;cursor:pointer;color:#bbb;}" +
      ".kb-stat .opts span.on{background:#2d2144;border-color:#a56ee8;color:#fff;}.kb-stat .opts span.taken{opacity:.35;}" +
      ".kb-big{display:flex;gap:10px;flex-wrap:wrap;}.kb-big .kb-card{flex:1;min-width:200px;padding:14px;}.kb-big .kb-card b{font-size:18px;}" +
      ".kb-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;}" +
      ".kb-grid .m-lbl{margin-top:4px;}" +
      ".kb-review{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;font-size:13px;}.kb-review .k{color:#888;font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:.1em;text-transform:uppercase;}.kb-review .v{color:#f0eee6;}" +
      "@media(max-width:600px){.kb-grid,.kb-review{grid-template-columns:1fr;}}";
    document.head.appendChild(css);
  }
  function launch() { ensureModal(); st = fresh(); step = 0; $("kobb-overlay").classList.add("open"); render(); }
  function close() { const ov = $("kobb-overlay"); if (ov) ov.classList.remove("open"); }

  function canProceed() {
    switch (STEPS[step]) {
      case "Trope": return st.mode === "scratch" ? diceOk() : !!st.trope;
      case "Age": return !!st.age;
      case "Strengths": return st.strengths.length === 2 && !!st.flaw.trim();
      default: return true;
    }
  }
  function next() { if (!canProceed()) return; if (STEPS[step] === "Review") { apply(); return; } step += 1; render(); }
  function back() { if (step > 0) { step -= 1; render(); } }
  function render() {
    $("kobb-step").textContent = step === 0 ? "" : "Step " + step + " of " + (STEPS.length - 1) + " — " + STEPS[step];
    $("kobb-back").style.visibility = step === 0 ? "hidden" : "visible";
    $("kobb-next").textContent = STEPS[step] === "Review" ? "Build this character ✓" : "Next →";
    const fn = { Start: rStart, Trope: rTrope, Age: rAge, Strengths: rStrengths, Extras: rExtras, Touches: rTouches, Review: rReview }[STEPS[step]];
    $("kobb-body").innerHTML = fn();
    wire();
    $("kobb-next").disabled = !canProceed();
  }
  const refreshNext = () => { $("kobb-next").disabled = !canProceed(); };
  const diceChips = (dice) => '<div class="kb-dice">' + STATS.map((s) => '<span class="' + (dice[s] === 20 ? "hi" : dice[s] === 4 ? "lo" : "") + '">' + s.slice(0, 3) + " d" + dice[s] + "</span>").join("") + "</div>";

  function rStart() {
    return (
      '<p class="m-hint">Pick the book you\'re playing, then either start from one of its Tropes (fast — it sets your dice and suggests Strengths, Flaws and questions) or build from scratch by assigning the six dice yourself.</p>' +
      '<div class="m-lbl">Book</div><div class="kb-big">' +
      D.books().map((b) => '<div class="kb-card' + (st.book === b.key ? " on" : "") + '" data-book="' + b.key + '"><b>' + esc(b.name) + "</b><small>" + esc(b.tagline) + "</small></div>").join("") +
      '</div><div class="m-lbl">Start from</div><div class="kb-big">' +
      '<div class="kb-card' + (st.mode === "trope" ? " on" : "") + '" data-mode="trope"><b>A Trope</b><small>' + D.tropes().filter((t) => t.book === st.book).length + " Tropes in " + esc(bookLabel()) + ". Touchstones, not stereotypes.</small></div>" +
      '<div class="kb-card' + (st.mode === "scratch" ? " on" : "") + '" data-mode="scratch"><b>From scratch</b><small>Assign d20 → d4 to the six stats yourself. Start with what you\'re best and worst at.</small></div></div>'
    );
  }
  function rTrope() {
    if (st.mode === "scratch") {
      return (
        '<p class="m-hint">Give each stat one die: a d20 for what you\'re remarkably good at, a d4 for your weakness, and the rest in between. Think about how your d20 compensates for your d4.</p>' +
        STATS.map((s) => '<div class="kb-stat"><b>' + s + '</b><div class="opts">' + DICE.map((d) => { const takenBy = STATS.find((o) => o !== s && st.dice[o] === d); return '<span class="' + (st.dice[s] === d ? "on" : takenBy ? "taken" : "") + '" data-die="' + s + "|" + d + '" title="' + (takenBy ? "used by " + takenBy : "") + '">d' + d + "</span>"; }).join("") + "</div></div>").join("") +
        '<p class="m-hint" style="margin-top:8px;">' + (diceOk() ? "One of each die ✓" : "Each die must be used exactly once.") + "</p>"
      );
    }
    const q = norm(st.tropeQuery);
    const list = D.tropes().filter((t) => t.book === st.book && (!q || norm(t.name).includes(q) || t.suggestedStrengths.some((x) => norm(x).includes(q))));
    return (
      '<p class="m-hint">Choose the Trope you\'re most interested in playing. It sets your stat dice and suggests Strengths, Flaws' + (st.book === "bikes" ? ", a bike" : "") + ' and two questions to answer about yourself.</p>' +
      '<input class="m-input" data-k="tropeQuery" placeholder="Search tropes…" value="' + esc(st.tropeQuery) + '">' +
      '<div class="kb-list" style="margin-top:8px;">' + list.map((t) => '<div class="kb-card' + (st.trope === t ? " on" : "") + '" data-trope="' + esc(t.name) + '"><span class="tag">' + esc(t.ages.join(" / ")) + "</span><b>" + esc(t.name) + "</b>" + diceChips(t.dice) + "<small>" + esc(t.questions[0]) + "</small></div>").join("") + "</div>"
    );
  }
  function rAge() {
    const i = info(); if (!i) return "";
    const suggested = st.trope ? st.trope.ages : [];
    return (
      '<p class="m-hint">' + (st.book === "brooms" ? "Your grade" : "Your age") + " decides which two stats get +1 on checks and which Strength you get for free." + (st.trope && suggested.length ? " <b>" + esc(st.trope.name) + "</b> suggests: " + esc(suggested.join(" / ")) + "." : "") + "</p>" +
      '<div class="kb-big">' + i.ageGroups.map((a) => '<div class="kb-card' + (st.age === a.name ? " on" : "") + '" data-age="' + esc(a.name) + '"><span class="tag">' + esc(a.range || "") + "</span><b>" + esc(a.name) + "</b><small>+1 " + esc(a.statBonus.join(" & ")) + " · free Strength: <b style=\"display:inline;font-size:12px;\">" + esc(a.freeStrength) + "</b>" + (a.notes ? "<br>" + esc(a.notes) : "") + "</small></div>").join("") + "</div>"
    );
  }
  function rStrengths() {
    const all = D.strengths().filter((s) => s.book === st.book);
    const ag = ageGroup();
    const sugg = new Set((st.trope ? st.trope.suggestedStrengths : []).map(norm));
    const free = ag ? ag.freeStrength : "";
    const pick = (s) => '<div class="kb-card' + (st.strengths.includes(s.name) ? " on" : "") + '" data-strength="' + esc(s.name) + '"><span class="tag">' + esc(s.cost) + (sugg.has(norm(s.name)) ? " · suggested" : "") + "</span><b>" + esc(s.name) + "</b><small>" + esc(s.description) + "</small></div>";
    const sorted = all.filter((s) => norm(s.name) !== norm(free)).sort((a, b) => (sugg.has(norm(b.name)) ? 1 : 0) - (sugg.has(norm(a.name)) ? 1 : 0) || a.name.localeCompare(b.name));
    const flaws = D.flaws().filter((f) => f.book === st.book);
    const fsugg = new Set((st.trope ? st.trope.suggestedFlaws : []).map(norm));
    const fsorted = flaws.slice().sort((a, b) => (fsugg.has(norm(b.name)) ? 1 : 0) - (fsugg.has(norm(a.name)) ? 1 : 0) || a.name.localeCompare(b.name));
    return (
      '<p class="m-hint">Choose <b>two</b> Strengths' + (free ? " (you also get <b>" + esc(free) + "</b> free from your " + (st.book === "brooms" ? "grade" : "age") + ")" : "") + " and <b>one</b> Flaw. Suggested ones lead the list. Strengths with an AT cost need Adversity Tokens to use.</p>" +
      '<div class="m-lbl">Strengths (' + st.strengths.length + "/2)</div>" +
      '<div class="kb-list" style="max-height:34vh;">' + sorted.map(pick).join("") + "</div>" +
      (st.strengths.some((n) => /skilled at|trained in|studied in|master of/i.test(n)) || /skilled at|trained in|studied in/i.test(free) ? '<div class="m-lbl">Skilled / Trained / Studied in…</div><input class="m-input" data-k="skillNote" placeholder="e.g. Car repair · Fight magic" value="' + esc(st.strengthNotes.skill || "") + '">' : "") +
      '<div class="m-lbl">Flaw</div><input class="m-input" data-k="flaw" placeholder="Or type your own" value="' + esc(st.flaw) + '">' +
      '<div class="kb-chips">' + fsorted.map((f) => '<span class="kb-chip' + (norm(st.flaw) === norm(f.name) ? " on" : "") + '" data-flaw="' + esc(f.name) + '" title="' + esc(f.description || "") + '">' + esc(f.name) + (fsugg.has(norm(f.name)) ? " ★" : "") + "</span>").join("") + "</div>"
    );
  }
  function rExtras() {
    const chips = (kind, k, cur) => '<div class="kb-chips">' + itemsOf(kind).map((i) => '<span class="kb-chip' + (norm(cur) === norm(i.name) ? " on" : "") + '" data-pick="' + k + "|" + esc(i.name) + '" title="' + esc(i.benefit || i.description || "") + '">' + esc(i.name) + "</span>").join("") + "</div>";
    const ride = st.trope && st.trope.suggestedRide ? '<p class="m-hint">' + esc(st.trope.name) + " suggests: <b>" + esc(st.trope.suggestedRide) + "</b></p>" : "";
    if (st.book === "bikes") {
      return '<p class="m-hint">Your <b>Knack</b> is something you\'re so good at you can take a 10 instead of rolling. Your <b>bike</b> gives a bonus by colour and a trick by accessory.</p>' +
        '<div class="m-lbl">Knack</div><input class="m-input" data-k="knack" placeholder="e.g. fixing engines, lying to teachers" value="' + esc(st.knack) + '">' + ride +
        '<div class="m-lbl">Bike colour</div>' + chips("bike-color", "bikeColor", st.bikeColor) + (st.bikeColor ? '<p class="m-hint">' + esc((itemsOf("bike-color").find((i) => norm(i.name) === norm(st.bikeColor)) || {}).benefit || "") + "</p>" : "") +
        '<div class="m-lbl">Accessory</div>' + chips("bike-accessory", "bikeAcc", st.bikeAcc) + (st.bikeAcc ? '<p class="m-hint">' + esc((itemsOf("bike-accessory").find((i) => norm(i.name) === norm(st.bikeAcc)) || {}).benefit || "") + "</p>" : "");
    }
    if (st.book === "brooms") {
      return '<p class="m-hint">Your <b>wand</b> is a wood (+1 to one type of magic) and a core. Your <b>broom</b> gives a benefit while you ride it. Every caster may have a <b>familiar</b>.</p>' +
        '<div class="m-lbl">Wand wood</div>' + chips("wand-wood", "wood", st.wood) +
        '<div class="m-lbl">Wand core</div>' + chips("wand-core", "core", st.core) +
        '<div class="m-lbl">Broom</div>' + chips("broom", "broom", st.broom) + (st.broom ? '<p class="m-hint">' + esc((itemsOf("broom").find((i) => norm(i.name) === norm(st.broom)) || {}).benefit || "") + "</p>" : "") +
        '<div class="kb-grid"><div><div class="m-lbl">Familiar</div><input class="m-input" data-k="familiar" placeholder="Name — animal" value="' + esc(st.familiar) + '"></div><div><div class="m-lbl">Favourite class · teacher</div><input class="m-input" data-k="favClass" list="dl-class" placeholder="Transfiguration · Prof. …" value="' + esc(st.favClass) + '"></div></div>';
    }
    return '<p class="m-hint">You don\'t start with powers, but choose now the <b>Cape</b> (team role) you\'ll grow into and the kind of <b>Power</b> you\'ll manifest. Then pick which stat rises and which falls when you\'re stressed.</p>' +
      '<div class="m-lbl">Cape</div><div class="kb-list" style="max-height:26vh;">' + D.capes().map((c) => '<div class="kb-card' + (norm(st.cape) === norm(c.name) ? " on" : "") + '" data-pick="cape|' + esc(c.name) + '"><b>' + esc(c.name) + "</b><small>" + esc(c.description.slice(0, 140)) + "…</small></div>").join("") + "</div>" +
      '<div class="m-lbl">Power category</div>' + chips("power-category", "powerCat", st.powerCat) +
      '<div class="m-lbl">Describe your power</div><input class="m-input" data-k="powerDesc" placeholder="e.g. absorbs kinetic energy and throws it back" value="' + esc(st.powerDesc) + '">' +
      '<div class="kb-grid"><div><div class="m-lbl">Stress-Boosted stat</div><select class="m-input" data-k="boost">' + STATS.map((s) => '<option' + (st.boost === s ? " selected" : "") + ">" + s + "</option>").join("") + '</select></div><div><div class="m-lbl">Stress-Reduced stat</div><select class="m-input" data-k="reduce">' + STATS.map((s) => '<option' + (st.reduce === s ? " selected" : "") + ">" + s + "</option>").join("") + "</select></div></div>" + (st.boost === st.reduce ? '<p class="m-hint" style="color:#df8a8a;">Boosted and Reduced can\'t be the same stat.</p>' : "");
  }
  function rTouches() {
    const i = info();
    return '<p class="m-hint">Finishing touches. Motivations pull you into the story; your Fear pushes back (−1 to −3 on checks near it); Obligations are what you owe the world.' + (st.trope ? " Your Trope asks: <i>" + esc(st.trope.questions.join(" · ")) + "</i>" : "") + "</p>" +
      '<div class="kb-grid"><div><div class="m-lbl">Motivations</div><textarea class="m-input" data-k="motivations" rows="3">' + esc(st.motivations) + '</textarea></div>' +
      '<div><div class="m-lbl">Fear</div><input class="m-input" data-k="fear" value="' + esc(st.fear) + '"><div class="m-lbl">Obligations</div><input class="m-input" data-k="obligations" value="' + esc(st.obligations) + '"></div></div>' +
      '<div class="m-lbl">' + esc(i ? i.bagLabel : "Backpack") + ' (one item per line)</div><textarea class="m-input" data-k="bag" rows="3" placeholder="Flashlight, walkie-talkie, half a sandwich">' + esc(st.bag) + "</textarea>";
  }
  function rReview() {
    const ag = ageGroup();
    const row = (k, v) => '<div><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";
    return '<p class="m-hint">Give your character a first name or nickname now — hold the last name until introductions, in case you turn out to be related to someone at the table.</p>' +
      '<div class="kb-grid"><input class="m-input" data-k="name" placeholder="First name / nickname" value="' + esc(st.name) + '" style="font-size:16px;"><input class="m-input" data-k="pronouns" placeholder="Pronouns" value="' + esc(st.pronouns) + '"></div>' +
      '<div class="kb-review" style="margin-top:14px;">' +
      row("Book", esc(bookLabel())) + row("Trope", esc(st.trope ? st.trope.name : "From scratch")) + row(st.book === "brooms" ? "Grade" : "Age", esc(st.age) + (ag ? " · +1 " + esc(ag.statBonus.join(" & ")) : "")) +
      row("Dice", STATS.map((s) => s + " d" + st.dice[s]).join(" · ")) +
      row("Strengths", esc([ag ? ag.freeStrength : ""].concat(st.strengths).filter(Boolean).join(", "))) + row("Flaw", esc(st.flaw)) +
      (st.book === "bikes" ? row("Bike", esc([st.bikeColor, st.bikeAcc].filter(Boolean).join(" · ") || "—")) + row("Knack", esc(st.knack || "—")) : "") +
      (st.book === "brooms" ? row("Wand", esc([st.wood, st.core].filter(Boolean).join(" · ") || "—")) + row("Broom · Familiar", esc([st.broom, st.familiar].filter(Boolean).join(" · ") || "—")) : "") +
      (st.book === "capes" ? row("Cape · Power", esc([st.cape, st.powerCat].filter(Boolean).join(" · ") || "—")) + row("Stress", "+" + esc(st.boost) + " / −" + esc(st.reduce)) : "") +
      row("Adversity Tokens", "3") + "</div>";
  }

  function wire() {
    const body = $("kobb-body");
    body.querySelectorAll("[data-k]").forEach((el) => {
      el.addEventListener("input", () => {
        if (el.dataset.k === "skillNote") st.strengthNotes.skill = el.value; else st[el.dataset.k] = el.value;
        if (el.dataset.k === "tropeQuery") { render(); const q = body.querySelector('[data-k="tropeQuery"]'); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } return; }
        if (el.dataset.k === "flaw") body.querySelectorAll(".kb-chip.on[data-flaw]").forEach((c) => c.classList.remove("on"));
        if (el.dataset.k === "boost" || el.dataset.k === "reduce") { render(); return; }
        refreshNext();
      });
    });
    body.querySelectorAll("[data-book]").forEach((el) => el.addEventListener("click", () => { st.book = el.dataset.book; st.trope = null; st.age = ""; st.strengths = []; st.flaw = ""; render(); }));
    body.querySelectorAll("[data-mode]").forEach((el) => el.addEventListener("click", () => { st.mode = el.dataset.mode; render(); }));
    body.querySelectorAll("[data-trope]").forEach((el) => el.addEventListener("click", () => {
      const t = D.tropes().find((x) => x.book === st.book && x.name === el.dataset.trope);
      st.trope = t; if (t) st.dice = Object.assign({}, t.dice);
      render();
    }));
    body.querySelectorAll("[data-die]").forEach((el) => el.addEventListener("click", () => {
      const [stat, die] = el.dataset.die.split("|"); const d = +die;
      const other = STATS.find((o) => o !== stat && st.dice[o] === d);
      if (other) st.dice[other] = st.dice[stat]; // swap
      st.dice[stat] = d; render();
    }));
    body.querySelectorAll("[data-age]").forEach((el) => el.addEventListener("click", () => { st.age = el.dataset.age; render(); }));
    body.querySelectorAll("[data-strength]").forEach((el) => el.addEventListener("click", () => {
      const n = el.dataset.strength; const i = st.strengths.indexOf(n);
      if (i >= 0) st.strengths.splice(i, 1); else if (st.strengths.length < 2) st.strengths.push(n);
      render();
    }));
    body.querySelectorAll("[data-flaw]").forEach((el) => el.addEventListener("click", () => { st.flaw = el.dataset.flaw; render(); }));
    body.querySelectorAll("[data-pick]").forEach((el) => el.addEventListener("click", () => { const [k, v] = el.dataset.pick.split("|"); st[k] = st[k] === v ? "" : v; render(); }));
    const first = body.querySelector('[data-k="name"]'); if (first) first.focus();
  }

  function apply() {
    const ag = ageGroup();
    const strengths = [];
    if (ag) strengths.push({ name: ag.freeStrength, note: /skilled at|trained in|studied in/i.test(ag.freeStrength) ? (st.strengthNotes.skill || "") : "free from " + (st.book === "brooms" ? "grade" : "age") });
    st.strengths.forEach((n) => strengths.push({ name: n, note: /skilled at|trained in|studied in|master of/i.test(n) ? (st.strengthNotes.skill || "") : "" }));
    const data = {
      system: "KOB", v: 1, book: st.book,
      name: st.name, lastName: st.lastName, pronouns: st.pronouns, trope: st.trope ? st.trope.name : "", age: st.age,
      stats: Object.assign({}, st.dice), mods: {}, at: 3, stress: 0,
      strengths, flaw: st.flaw, knack: st.knack,
      motivations: st.motivations, fear: st.fear, obligations: st.obligations, bag: st.bag,
      bike: { color: st.bikeColor, accessory: st.bikeAcc },
      brooms: { wood: st.wood, core: st.core, broom: st.broom, familiar: st.familiar, favoriteClass: st.favClass, story: "" },
      capes: { cape: st.cape, power: [st.powerCat, st.powerDesc].filter(Boolean).join(" — "), powerDie: 0, powerBonus: 0, gp: 0, stressBoost: st.boost, stressReduce: st.reduce, identity: "", skills: [] },
      relationships: [],
      notes: st.trope ? "Trope questions:\n1. " + st.trope.questions[0] + "\n2. " + st.trope.questions[1] + "\n" : "",
      campaign: (typeof _campaign !== "undefined" && _campaign) ? { id: _campaign.id, code: _campaign.code, name: _campaign.name } : null,
    };
    if (typeof applySheet === "function") applySheet(data);
    if (typeof saveSheet === "function") saveSheet(true);
    if (typeof syncDocTitle === "function") syncDocTitle();
    if (typeof addLog === "function") addLog("Character Builder", "✨", "Built " + (st.name || "a character") + " — " + (st.trope ? st.trope.name : "from scratch") + " (" + bookLabel() + ")", "crit");
    close();
  }

  window.KOBB = { launch, close, next, back };
})();
