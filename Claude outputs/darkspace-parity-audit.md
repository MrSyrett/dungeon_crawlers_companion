# DarkSpace ↔ Shadowdark parity audit (2026-09-13)

Full comparison across the five areas requested: **Character Sheet, Builder, Reference Pages, GM Screen, Homebrew.** Shadowdark (SD) is the app's default system (its reference pages live at the app root); DarkSpace (DS) is the "Science Fiction for Shadowdark" reskin (pages under `app/darkspace/`, sheet `ds_character_sheet.html`, data `lib/data/darkspace*.ts` + `public/tools-data/sd-darkspace*.js`).

Intentional reskin differences (Species/Archetype/Motivation/Rank, credits vs gold, The Triad vs spells, Advanced Tech vs Magic Items, Starships, blue theme, **no Rules page — removed on request**) are treated as correct and are NOT listed as problems.

## The one root cause behind most of this

DarkSpace's **authoring/reference layer is done well** — reference pages, data modules, homebrew editor schemas, normalizers, and the DS character-creation wizard all read `window.DARKSPACE`/`lib/data/darkspace*` correctly. The gaps cluster in the **interactive engines that were copied from the Shadowdark sheet and never re-pointed at DarkSpace data:**

1. The DS character sheet's weapon/attack engine still runs on the hard-coded `SD_WEAPONS` fantasy table.
2. The DS sheet's homebrew consumption still looks for SD types (`spell`/`gear`/`class`/`ancestry`) and SD field shapes, so no `ds-*` homebrew ever reaches the sheet.
3. The GM Screen is Shadowdark everywhere except the one bestiary toggle — every other generator is fantasy-only.

Fix those three and DarkSpace goes from "looks right, plays like Shadowdark under the hood" to actually playable as its own system.

---

## Priority 1 — functional bugs (DarkSpace doesn't work correctly)

**P1.1 — DarkSpace weapons are invisible to the attack/equip engine.** `tools/templates/ds_character_sheet.html:607-634, 907-917, 1835`
`allWeapons()` concatenates only `SD_WEAPONS` + homebrew; `gearItemKind()` calls a gear row a weapon only if its name is in `allWeapons()`; `deriveEquipWeapon()` returns null on a miss. DS weapons live only in `DARKSPACE.meleeWeapons/rangedWeapons/explosives` (used to build the shop). So buying/equipping any DarkSpace weapon (Energy Pistol, Vibro blade, Rifle…) creates no attack row and no damage/range/props autofill. Only wizard-generated Spacers get working attacks (the wizard writes explicit rows). Armor was handled (`AC_ARMOR` extended at 1248-1253); weapons were not.
*Fix:* make `allWeapons()` merge the DARKSPACE weapon tables (adapting `range` C/N/F → Close/Near/Far, `dmg`, `props`) when `darkSpaceOn()`.

**P1.2 — The DS sheet never consumes any `ds-*` homebrew.** `tools/templates/ds_character_sheet.html:6168-6290`
`syncSharedHomebrew()` collects only `type==='spell'`/`'gear'`; `injectHomebrewContent()` only handles `'class'`/`'ancestry'`/`'background'` — all SD types. Zero `ds-*` references in the file. So ds-equipment / ds-species / ds-archetype / ds-background / ds-motivation / ds-triad are authored and shown on reference pages but never reach the sheet.
*Fix:* branch these functions on the `ds-*` types (ds-equipment→gear catalog, ds-species→ancestry pool, ds-archetype→class pool, etc.).

**P1.3 — The DS sheet shop can't read DS homebrew field shapes.** `ds_character_sheet.html:903-928, 4656+` vs `lib/homebrew.ts:1585-1605`
The shop expects SD kinds (`weapon/armor/shield`) and fields (`damage`, `acBase`, `acDex`, `gp`). `normalizeDsEquipment` stores `category` (gear/armor/melee/ranged/explosive), `dmg`, `ac` as a string, `cost` in credits — and there is no `shield` category. So the homebrew shop tab always shows "No custom items available," and even after P1.2 nothing would match.
*Fix:* add a DS-aware shop adapter keyed on `category`, reading `dmg`/`range`/`props`/`ac`/`cost(cr)`. (P1.2 + P1.3 + C-leftovers below share one root cause — fix together.)

**P1.4 — GM Screen labels DarkSpace Motivation as "AL" (Alignment).** `gm_screen.html:5705`, fed by `al: m.mo` at `:8837, :8911`
A DS denizen's motivation renders as "AL <motivation>". Cheap, visible correctness bug.
*Fix:* show "MO"/"Motivation" when `m.ds`.

**P1.5 — Monster motivation codes are inconsistent in the data and shown raw.** `lib/data/darkspace-monsters.ts`
Survivor is stored as both **"Su" (28×)** and **"S" (10×)**; Vile as both **"Vl" (31×)** and **"Vi" (2×)**. The bestiary prints the raw code (`app/darkspace/bestiary/page.tsx:91`), so identical motivations show different tags. The `ds-monster` editor even lists the duplicates as separate options (`HomebrewEditor.tsx:448`).
*Fix:* normalize to one code each (S / Vl / Vr / Any), dedupe the editor options, and ideally map code→label for display.

---

## Priority 2 — parity gaps (features SD has, DS lacks)

**P2.1 — No DarkSpace homebrew hub page or header link.** (flagged by 3 of 5 audits)
Every other system has `app/{sys}/homebrew/page.tsx` and a "My Homebrew" nav link; `app/darkspace/homebrew` does not exist and `DarkSpaceHeader` (`components/DarkSpaceRef.tsx:26`) shows only "← Home". `app/homebrew/page.tsx:19` hard-codes the six SD types. DS users can only manage homebrew scattered across reference pages.
*Fix:* add `app/darkspace/homebrew/page.tsx` rendering all 8 `ds-*` editors (mirror `app/nimble/homebrew/page.tsx`), and a "My Homebrew" link in `DarkSpaceHeader`.

**P2.2 — `DS_ADVANCED_TECH` (16 items) is orphaned on the reference side.** `lib/data/darkspace.ts:1306`; `app/darkspace/equipment/page.tsx:3`
The sheet's shop now has an Adv. Tech tab, but the Equipment reference page never renders `DS_ADVANCED_TECH` or its note.
*Fix:* add an "Advanced Tech" chip/section on the Equipment page.

**P2.3 — GM Screen: every generator except the bestiary is fantasy-only.** `gm_screen.html` treasure `:3997-4064`, loot `:4067-4146`, NPC ancestries `:5598-5614`, tavern/shop `:5633-5648`, dungeon names `:5758-5773`, encounters/biomes `:5650-5670`, traps `:4188-4206`, `MON_TABLE` `:4161-4185`. None branch on `_bestiarySource`. A DarkSpace GM gets gold hoards, spell scrolls, elves, and taverns. The adventure builder (`:7100-7160`) mixes fantasy loot/NPCs into DS adventures.
*Fix (larger):* add DS-flavored data tables (credits/tech loot, sci-fi species, station/ship locales, ship-scale hazards) selected when source is DS; gate the builder's sub-generators on source. This is the biggest single body of work and a design decision as much as a code one.

**P2.4 — GM Screen: DS creature-type filter collapses to one bucket + wrong card tag.** `gm_screen.html:5673-5691, 8478-8491, 5696`
`monsterTypeOf` classifies via SD-name-keyed `SD_MONSTER_TYPES`, so all DS denizens fall to the "Monster" catch-all (the type dropdown offers only "Monster" in DS mode), and cards show "· Monster" instead of the denizen's `ctype:'Denizen'`. `monsterTypeOf` also ignores `_dsHomebrewMonsters`.
*Fix:* prefer `m.ctype` in `monsterCard`; add a DS type map (or honor the denizen category); include DS homebrew in `monsterTypeOf`.

**P2.5 — `ds-monster` homebrew editor can't set Interface stats (ACC/CTL/NET).** `components/HomebrewEditor.tsx:450-455`
The normalizer stores acc/ctl/net and both the bestiary page and GM screen render them, but the editor schema only offers STR/DEX/CON/INT/WIS/CHA — so a homebrew digital/AI denizen can't carry Interface stats.
*Fix:* add acc/ctl/net fields (and a "digital" toggle) to the `ds-monster` schema.

**P2.6 — DS session-prep Builder is the generic DCC base; it lacks the SD builder's generators.** `tools/templates/ds_session_prep_builder.html:495-539` vs `sd_session_prep_builder.html:436-583`
The DS builder was auto-generated from the *generic DCC* builder (`scripts/make-session-builders.mjs`), so it never inherited SD's random Title/Overview, Random Encounters (events + biomes), Random Clue, Treasure generator, structured dungeon-encounter generator (motif + room-role), or Random NPC. (It DOES correctly use DS_MONSTERS, render digital/ship-scale denizens, and detect Legendary→boss.)
*Fix:* port these generators into the DCC base behind per-system data (sci-fi biomes/hazards, credit/tech loot, denizen NPC tables) so every generated builder — DS included — gets them.

**P2.7 — DS character wizard: missing Triad step + Standard-Array/assign stat options.** `public/tools-data/sd-darkspace-ccw.js:185-215`
The wizard never lets a character who gains The Triad (via Wise archetype, Power Armor Spacer, or the L1 Wise talent) actually pick Body/Mind/Soul powers — the analog of the SD wizard's Spells step. Its stats step is roll-only, lacking SD's Standard Array `[15,14,13,12,10,8]`, assign/swap, and the "reroll if nothing ≥14" helper (DarkSpace is billed 100% SD-compatible).
*Fix:* add a conditional Triad step from `DARKSPACE.triad.powers`; reuse the SD stats-step logic.

---

## Priority 3 — leftover Shadowdark content / polish

- **P3.1 — DS PDF/print export emits fantasy fields.** `ds_character_sheet.html:3778-3785, 3861, 3888-3891` — the DarkSpace-titled print export still renders a Deity field, a Spells section, and GP/SP/CP coin labels. *Fix: drop Deity/Spells and relabel the single coin box to "cr" in DS mode.*
- **P3.2 — "Official fillable PDF" export is Shadowdark-branded.** `ds_character_sheet.html:3596-3694` — fetches `/shadowdark-sheet-fillable.pdf`, maps credits→"Gold Pieces", deity→"Deity", downloads as `shadowdark-character.pdf`. *Fix: at minimum rename the file and drop the Deity map; ideally a DS fillable PDF.*
- **P3.3 — Dead Shadowdark spell subsystem still embedded.** `ds_character_sheet.html:637-870` (`SD_SPELLS` ~230 lines) + Spellbook overlay `4913-4948`. Correctly unreachable (tab/panel removed, `addSpellRow` guards), but heavy and a live "Spellbook" would appear if a "Scroll:"/"Wand:" gear name were created. *Fix: delete `SD_SPELLS` + spell UI, or confirm fully unreachable.*
- **P3.4 — Quick Rules panel prepends DS rules onto the full SD rules** including spellcasting/deity/gold rows. `ds_character_sheet.html:5202-5206`. *Fix: filter the fantasy-specific SD rows in DS mode.*
- **P3.5 — Fantasy wording in tooltips/placeholders.** Auto-consume tooltip (`:436`, arrows/scrolls/wands), attack placeholder "Longsword, Fireball…" (`:2042`), map-structure dropdown Castle/Crypt/Keep/… in the DS builder (`ds_session_prep_builder.html:565-573`). *Fix: sci-fi wording.*
- **P3.6 — Homebrew engine mechanics not implemented for DS:** Energy Cell / Ammo run-out on natural 1 (`ds_character_sheet.html` auto-consume ~2664, SD-ammo only) and Luck-token refresh on rest for the archetypes that grant it (`takeRest()` `:3455`). *Fix: add EC/Am consumption for DS weapons (depends on P1.1) and luck refresh in rest.*
- **P3.7 — Stale comments/dupes:** `HomebrewEditor.tsx:82` "the 16 schemas" (now 28); `ds-monster` `mo` dropdown duplicate labels (`:448`, same as P1.5).

---

## Confirmed intentional / not problems

No DS Rules page (removed on request); Species/Archetype/Motivation/Rank terminology; credits vs gold; The Triad vs spells; Advanced Tech vs Magic Items; Starships & Equipment pages; blue/cyan theme; `HomebrewEditor` (DS) vs `HomebrewManager` (SD) split; HbType unions match across `lib/homebrew.ts` and `HomebrewManager.tsx` (no drift); DS homebrew normalizers/dispatch/schemas/accents all complete; the DS bestiary toggle and `ds-monster` GM fetch are solid; the DS wizard reads DARKSPACE exclusively (no SD data leakage).

## Suggested order of attack

1. **P1.1 + P1.2 + P1.3** (weapons + homebrew consumption — one root cause, biggest playability win).
2. **P1.4 + P1.5** (cheap correctness: AL→Motivation label, normalize motivation codes).
3. **P2.1 + P2.5 + P2.2** (homebrew hub + page, ACC/CTL/NET editor fields, Advanced Tech on Equipment).
4. **P3.1–P3.5** (strip fantasy leftovers from exports/tooltips).
5. **P2.3 + P2.6 + P2.7** (the big builds: GM Screen sci-fi generators, builder generators, wizard Triad step — largely design decisions).
