# DarkSpace: from-scratch design vs. the current build — gap & bug report

**How I did this:** I re-read the *DarkSpace Rulebook V2* (264 pages) across every system, sketched the feature set a complete DarkSpace companion should have if built from scratch, then cross-referenced that against the current build — the data modules (`sd-darkspace.js` / `lib/data/darkspace*.ts`), the reference pages (`app/darkspace/*`), the character sheet (`ds_character_sheet.html`), the creation wizard (`sd-darkspace-ccw.js`), the ship module (`sd-darkspace-ship.js`), and level-up.

**Bottom line:** the **character-creation core is genuinely solid** — species, tech species, archetypes (with features and talent tables), backgrounds, motivations, gear/weapons/armor, and the wizard are all faithful to the book. Where the build falls short is the **secondary subsystems**: The Triad is present but hollow, the Starship builder is a shell, and Corruption, Hacking, Vehicles, Reputation/Downtime and the GM generators are largely or entirely absent. Your three instincts were right — Triad, Starships, and Corruption are the top three.

---

## Part 1 — the complete DarkSpace system (what a from-scratch build would cover)

The rulebook defines these subsystems:

**A. Spacers (character build)** — Citizens (0-level) vs Rookies (1st), 3d6 stats, Species (d20 traits table) + "use any Shadowdark ancestry," Tech Species (Androids: *Mechanical*; Power Armor Spacers: *Life Support* + Machine-Based), 6 Archetypes + Machine-Based (each: prime stat, hit die, weapon/armor training, features, a 2d6 talent table), Backgrounds (d20), Motivations (Survivor/Vile/Virtuous — Luck Tokens), HP, starting Credits/Gear, and an optional **Ship Role** (crew position).

**B. The Triad** — three powers, Body (CON) / Mind (INT) / Soul (WIS); you gain one power at a time (all three = mastery); Feats are freeform checks whose **DC sets the damage/heal die** (Easy DC9→d4, Normal DC12→d6, Hard DC15→d8, Extreme DC18→d10); crit success doubles; **crit fail disables that power until you rest**; Focus lets you sustain with a per-round check; the book gives **~15 named example Feats** grouped by power.

**C. Gear & currency** — credits, armor, melee/ranged/explosive weapons, weapon properties, Energy Cell (EC) & Ammo (Am) run-out on a natural 1, Advanced Tech / Cybernetics (a large reference list, pp. 229–247).

**D. Hacking** — a personal **Interface** with ACC/CTL/NET (attack bonus = ACC, HP = 10 + CTL, AC = 11 + NET); hacking actions and a hacking dice table (same DC→die as Triad); network intrusion verbs; hacking combat (damage to Interface HP, crash at 0, Datajack lets you bleed to your own HP); Programs & Malware (freeform + examples like Gate/Hound/Burn); random network generation.

**E. Corruption** — Corruption Points measured against **WIS** (exceed WIS = character is lost); a corruption check on exposure (crit fail → a permanent Side Effect, crit success → Restoration); reduce points on rest by forgoing healing (by WIS bonus); **four d8 Side-Effect tables** (Technological / Biological / Mental / Emotional) and **four d8 Sources-of-Corruption tables**.

**F. Reputation, Bounty Hunting, Resting & Downtime, Carousing** — social/economic subsystems and downtime actions.

**G. Vehicles** — Land / Sea / Air / Hover / Space / Mecha, each a monster-style stat block (AC/HP/ATK/MV + 6 stats + level), used with pilot-stat-plus-vehicle-stat; vehicle combat, chases, and a d20 descriptions generator.

**H. Starships** — 6 classifications (Explorer, Fighter, Freighter, Gunship, Research, Yacht), each with **base System slots, base Feature slots, a free starting Component, an HP die per level, three class Features, and a 2d6 class Talent table**; ship stats (3d6, HP=10+CON, AC=10+DEX); Design Budget ((1d10+5)×1000cr new, 1d10×1000 stock); required base systems (Sublight Drive, Communications Array, Memory Bank); a **Components catalog of ~14 items** (with initial/maintenance costs, and System-vs-Feature typing); **Ship Weapons (10)** and **Ship Armor (4)** with properties; Advanced-system upgrades; stat/slot upgrade economics; ship leveling with Crew Level; **Command Crew roles** (Captain, Pilot, Co-Pilot, Gunner, Astrogator, Chaplain, Cook, Engineer, Ensign, Medic, Quartermaster, Salvage Engineer); Space Travel (SL/FTL), Astrogation (DC by System/Sector/Region/Galaxy + a d10 mishaps table), Space Hazards (asteroid field, black hole, nebula, radiation, temporal anomaly), Ship Combat and Ship Destruction, Stock Ships, and a Ship Names generator.

**I. GM tools** — Planets, Settlements, Cantinas, Shops, an NPC generator, an Alien generator + mutations, Jobs & Salvage (tiered loot 0-3/4-6/7-9/10+), the *Null Point* dice minigame, the Denizens bestiary, Advanced Tech reference, and "converting fantasy to sci-fi."

---

## Part 2 — current build, system by system

| System | Status | Notes |
|---|---|---|
| Species + traits, tech species | ✅ Solid | 20 traits, human note, androids/power-armor covered |
| Archetypes | ✅ Solid | 7 archetypes, each with features + a 5-row 2d6 talent table |
| Backgrounds / Motivations | ✅ Solid | 20 / 3 |
| Gear, weapons, armor, properties | ✅ Solid | full melee/ranged/explosive/armor catalogs, weapon props |
| Character wizard | ✅ Solid | species/archetype/background/motivation/talent/gear + Triad step + ship identity |
| Character sheet core | ✅ Solid | credits, DarkSpace weapons wired, homebrew consumed |
| **The Triad** | ⚠️ Partial | powers + DC table only; **no example Feats, no on-sheet tracking** |
| **Starships** | ⚠️ Shell | weapons + armor catalogs only; **no components catalog, no classification mechanics, no leveling** |
| Advanced Tech / Cybernetics | ⚠️ Partial | 16-item subset of the full pp. 232–247 list |
| **Corruption** | ❌ Missing | no tracker, no side-effect/source tables |
| **Hacking / Interface** | ❌ Missing | Interface stats exist on *denizens* only; no player Interface, no programs, no network gen |
| Vehicles (non-ship) | ❌ Missing | none of land/sea/air/hover/mecha |
| Reputation / Bounty / Downtime / Carousing | ❌ Missing | not modeled (a few quick-rules mentions) |
| Jobs & Salvage tiers | ❌ Missing | not in the GM tools |
| GM generators (planets/settlements/aliens/NPC-sci-fi) | ⚠️ Partial | GM Screen now has sci-fi generators (added recently) but not the book's planet/settlement/alien-mutation tables specifically |
| Null Point minigame | ❌ Missing | — |
| Denizens / bestiary | ✅ Solid | 113 denizens, digital/ship-scale handling |

---

## Part 3 — prioritized findings

### P1 — the three you flagged

**P1.1 The Triad is hollow.** `DARKSPACE.triad` has the three powers and the DC→die table, but **none of the ~15 example Feats** the book prints (Body: Force Field, Inner Light, Levitation, Psychic Healing, Pyrokinesis, Telekinesis; Mind: Coercion, Enhance Senses, Mental Blast, Mental Illusions, Telepathy; Soul: Astral Projection, Clairvoyance, Empathy, Psychometry). Those *are* the closest thing DarkSpace has to spells, and they're what a player reaches for. Also, the character sheet doesn't **track the Triad at all** — no record of which powers are known, and no "this power is exhausted until I rest" state after a crit-fail. *Fix: add the example Feats to the data (grouped by power) and render them on the Triad reference; add a small on-sheet Triad panel — known powers (Body/Mind/Soul) with an exhausted toggle, and the Feat DC→die table inline.*

**P1.2 The Starship builder is a shell.** It captures ship stats, a classification *name*, budget, weapons and armor, and computes HP/AC — but it's missing most of the book's ship system:
- **No Components catalog.** The 14 purchasable components (Sublight/FTL Drive, Sensor Array, Nav Computer, Memory Bank, Comms Array, Cargo Hold, Crew Quarters, Galley, Medical Bay, Science Station, Smuggling Compartment, Passenger Bay, Weapons Array) with their initial/maintenance costs and System-vs-Feature typing simply aren't in the data — the builder has an empty free-text "components" list.
- **No classification mechanics.** Each class should carry base System slots, base Feature slots, a free starting Component, an HP die per level, three class Features, and a 2d6 class Talent table. The data has only class *names + blurbs*, so the builder can't show slots, enforce budget, grant the free component, or roll class talents.
- **No Advanced-system upgrades, no ship leveling, no Command-Crew roles, no Space Travel / Astrogation / Hazards / Ship Combat reference.**
- Minor: the class is named **"Researcher"** in the data; the book's classification is **"Research."**
*Fix: add a `ship.classifications` structure (slots, free component, hp die, features, talents) and a `ship.components` catalog; rebuild the ship tab to pick from real catalogs, show slot usage vs the classification, grant the free component, and support a ship talent roll on level-up. Then a Starships reference page and (optionally) an Astrogation/Hazards quick-reference.*

**P1.3 Corruption is entirely absent.** None of it exists — no Corruption Point tracker (vs WIS), no corruption check flow, no Restoration, and neither the four d8 Side-Effect tables nor the four d8 Source tables. *Fix: add a `corruption` data block (the two sets of d8 tables + the rules text), a Corruption reference page, a corruption tracker on the sheet (points vs WIS, with a "succumbed" warning at > WIS), and a GM-screen generator that rolls a Source and a Side Effect.*

### P2 — high-value, not yet flagged

**P2.1 Hacking / player Interface.** Interface stats (ACC/CTL/NET) exist on denizens and as gear (Hacking Interface, Datajack) but the **player has no Interface stat block**. A hacker character can't record ACC/CTL/NET or the derived Interface HP (10+CTL) / AC (11+NET) / attack (ACC), and there's no hacking reference (actions, network-intrusion verbs, the DC→die table, programs & malware). *Fix: an optional Interface panel on the sheet + a Hacking reference page mirroring the Triad treatment.*

**P2.2 Ship Role could use the canonical crew roles.** The Ship Role field I added is free text; the book defines a specific Command-Crew list (Captain, Pilot, Co-Pilot, Gunner, Astrogator, Chaplain, Cook, Engineer, Ensign, Medic, Quartermaster, Salvage Engineer). *Fix: offer those as suggestions/datalist on the field and in the wizard.*

**P2.3 Advanced Tech is a subset.** The data holds 16 items with a note that the full list (pp. 232–247) is larger. *Fix: extend to the full list when you want completeness.*

### P3 — breadth gaps (mostly GM/reference)

- **Vehicles** (land/sea/air/hover/mecha) — a whole stat-block category with no representation; these could live as a bestiary-style reference and/or GM-screen picks.
- **Reputation, Bounty Hunting, Resting & Downtime, Carousing** — not modeled; at minimum a Downtime/Reputation reference page.
- **Jobs & Salvage** tiered loot tables (0-3 / 4-6 / 7-9 / 10+) — a natural GM-screen generator.
- **Planet / Settlement / Cantina / Shop / NPC / Alien-mutation generators** — the GM Screen now has *general* sci-fi generators, but not these specific book tables.
- **Null Point** dice minigame — a fun, self-contained addition.
- **Space Travel / Astrogation / Space Hazards** references (tie in with the ship work).

---

## Suggested order of attack

1. **Triad Feats + on-sheet Triad tracking** (P1.1) — small data addition, high player value.
2. **Corruption** (P1.3) — self-contained data + a tracker + a GM-screen roller; discrete and high-impact.
3. **Starship overhaul** (P1.2) — the biggest job: classification mechanics + components catalog + a real builder + leveling. Best done as its own focused pass.
4. **Hacking / Interface** (P2.1), then the **P3 breadth** items as reference pages / GM-screen generators.

I can take any of these on next — say the word and I'll start with the Triad Feats + Corruption (the two highest-value, most self-contained), then scope the Starship rebuild.
