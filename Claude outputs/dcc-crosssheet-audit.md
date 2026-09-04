# Dungeon Crawler's Companion — Cross-Sheet Audit

_Read-only audit of the 7 character sheets (`dcc, ace, dnd, kob, nimble, sd, sw`) + `gm_screen.html`, run 2026-09-04. Scope: where shared patterns have **diverged** across sheets in ways that (a) can cause bugs or (b) create maintenance pain. Nothing was changed._

## Executive summary

The fleet is in genuinely good structural shape: every sheet shares the same head skeleton, `app-wrap` / `roll-log` wrappers, a clean `<sys>_sheet` + `<sys>_dark` localStorage convention, working Export/Import JSON with a `{system, v:1}` envelope, and graceful CDN/offline handling. The dice module's contract holds on **all 7** sheets (gear mount, `addLog` wrap, `.collapsed` toggle, and the new `.t-dice` inline slot all verified present), and every sheet exposes global `collectSheet`/`applySheet`, so dice-settings persistence works everywhere. There's no debug cruft, no TODO rot.

Two themes account for almost everything worth doing:

1. **Duplication maintained by hand.** The dice + three.js roller (~700 lines) is byte-copied into all 8 files; the `esc()` HTML-escaper is redefined 15+ times; the d20 advantage primitive is reimplemented 5 times under 5 names. These are in sync today only because a human keeps them in sync — you've felt this all session (every dice fix = 8 edits). This is the single largest liability, and it's the root cause of the "fixed on one sheet, still broken on another" class of bug.

2. **Shadowdark (`sd`) is the consistent outlier.** Across nearly every dimension — HTML escaping, autosave, title-sync, `saveSheet` semantics, campaign restore, crit damage, advantage handling, unguarded data access, dark-mode API, a stray remote font — `sd` diverges from the pattern the other six share. A single "bring `sd` into line" pass would resolve a large fraction of the real-bug findings at once.

Findings below are grouped by priority.

---

## Tier 1 — Real bugs / correctness (fix soon)

### 1.1 `dcc` & `sd` inject roll text as raw HTML (unescaped)
**Bug-risk: MED. Sheets: dcc, sd.**
The five other sheets run `esc()` on `label`/`result`/`detail` before building a log entry; `dcc` and `sd` interpolate them as raw HTML (`dcc:1375`, `sd:2297`). A user-entered attack/weapon/spell name containing `<` breaks the log entry or injects markup, and a `{` reaching `detail` makes the shared `parseDice` bail (`if(/[<>{]/.test(detail)) return []`), silently disabling the die animation for that roll. This is also the campaign-shared path, so one player's crafted name renders on everyone's log.
**Fix:** escape `label`/`result`/`detail` on `dcc`/`sd` like the others, and pass the deliberate bits they currently rely on raw HTML for (the ADV/DIS badge span, the SVG campaign icon in `result`) through an explicit opt-in instead of disabling escaping wholesale.

### 1.2 `esc()` is redefined 15+ times and has drifted into unsafe variants
**Bug-risk: MED. Sheets: all + gm_screen (worst).** Related to 1.1.
`gm_screen` alone declares ~11 local `esc()`s with at least four incompatible behaviors: full `&<>"`, no-quote `&<>` (unsafe in attribute context), `<`-only (`gm:1557`), and null-unguarded variants (`gm:9850`, `gm:10035`) that throw `TypeError` when handed null/undefined. The same user text escapes differently depending on which path renders it.
**Fix:** hoist one canonical `esc`/`escAttr` pair to a shared script and delete the local copies; at minimum repair the `<`-only and null-unsafe variants now.

### 1.3 Shadowdark doesn't double crit damage
**Bug-risk: MED. Sheet: sd.**
A natural 20 sets `type='crit'` and logs "★ NAT 20", but the damage roll fires once with no doubling (`sd:2521-2530`). Shadowdark RAW deals double damage on a crit; `dnd`'s equivalent correctly doubles the dice (`dnd:1272,1279`). So `sd` shows a crit that doesn't pay out.
**Fix:** double the damage-dice **count** (not the flat mod) when `hitRoll===20` in `sd`'s attack path.

### 1.4 `sd` unguarded data-global access can throw offline / on misdeploy
**Bug-risk: MED. Sheet: sd (dnd is the good model).**
`sd` mutates bare globals like `RC_ANCESTRY.ability`, `RC_ANCESTRY.table`, `RC_NAMES` directly with no `typeof` guard (`sd:5443-5599`, 24 bare uses). If `sd-sheet-rc-data.js` 404s, those handlers throw `ReferenceError`. `dnd` funnels all reference data through a guarded accessor facade (`dnd:816`) that returns `[]` when missing. Note also: **none** of the `/tools-data/*.js` script tags have an `onerror` handler on any sheet, so a missing data file fails silently and degradation depends entirely on call-site guards.
**Fix:** adopt `dnd`'s guarded-accessor pattern on `sd` (or read via `window.`-qualified names, which yield `undefined` instead of throwing).

### 1.5 `sd` can lose the last edit on mobile; party title won't update
**Bug-risk: MED. Sheet: sd.**
`sd` alone lacks a global `scheduleAutosave` (its autosave is a local IIFE, so the shared `if(typeof scheduleAutosave==='function') scheduleAutosave()` call silently no-ops there), lacks `syncDocTitle`/`__ddSaveTitle` (so its name never updates the GM-screen/party title), and omits the `pagehide` + outbound-link exit saves the other six have. `pagehide` is the reliable mobile-backgrounding save, so `sd` is the most likely to drop a last edit.
**Fix:** give `sd` a global `scheduleAutosave`, a `syncDocTitle` call, and `pagehide` + link-click exit saves to match the shared contract.

### 1.6 `sd`'s `saveSheet` boolean is inverted vs every other sheet
**Bug-risk: MED (maintenance trap). Sheet: sd.**
Six sheets use `saveSheet(quiet)` where `true` = silent. `sd` uses `saveSheet(manual)` where `true` = **show the toast** (`sd:3407`). So `saveSheet(true)` is a silent autosave on six sheets and a loud manual save on `sd` — any code moved between sheets behaves oppositely.
**Fix:** normalize to the `quiet` majority convention (or rename `sd`'s parameter to remove the trap).

---

## Tier 2 — Maintainability with real bug-prevention value

### 2.1 Extract the dice + three.js roller into one shared file ⭐ highest-value
**Tidy (prevents future bugs). Sheets: all 8.**
The ~700-line 3D/2D dice module is byte-identical in all 8 files, kept in sync by hand — every fix this session was applied 8 times. Extracting it to `/tools-data/dice-roller.js` (mirroring the existing data-file pattern) and loading it like the other shared scripts makes it edit-once. This is the single biggest maintenance win and directly kills the "fixed on one sheet, not another" bug class. _(Caveat: the current inject-into-each-file approach keeps each sheet fully self-contained/offline; a shared file adds one more `/tools-data` dependency, so weigh against 1.4's "no onerror" gap.)_

### 2.2 Unify the d20 advantage primitive
**Bug-risk: MED (consistency). Sheets: dcc, sd, dnd, nimble, gm_screen.**
Five reimplementations under five names with different return shapes and feature sets: only `dcc` cancels adv+dis, only `dnd` honors conditions/exhaustion, `sd`'s can't take a per-roll override. The historical "SD advantage spell didn't roll both d20s" bug is exactly what this duplication invites; the fix lives on `sd` only and can't propagate. Extract one `rollWithAdv(sides, {mode, extra})` and have every d20 sheet call it.

### 2.3 `sd` per-row "always advantage" is dropped under a global disadvantage toggle
**Bug-risk: LOW–MED. Sheet: sd.**
`if(hasAtkAdv && !advState) advState='advantage'` (`sd:2515,2589`): when the global toggle is set to disadvantage, a weapon/spell flagged always-advantage is ignored and rolls at straight disadvantage instead of cancelling to normal. `dcc`'s primitive already cancels correctly.
**Fix:** treat per-row advantage vs global disadvantage as cancelling to normal (folds naturally into 2.2).

### 2.4 Delete `dnd`'s dead legacy attack functions
**Bug-risk: LOW (foot-gun). Sheet: dnd.**
`rollAttack`/`rollDamage` (`dnd:1240,1247`) are unwired, and `rollDamage` has no crit-doubling path — re-wiring it later would silently produce wrong crit damage. Delete them or route through `doAttack`.

### 2.5 Standardize the base single-die helper name
**Tidy. Sheets: all 7.**
Identical `Math.floor(Math.random()*n)+1` is `d()` (dcc, sd), `dN()` (dnd, kob, nimble), `d6()` (ace), and absent on `sw`; `gm_screen` inlines it. Cross-sheet copy/paste of roll code silently references an undefined helper. Standardize on `dN`.

---

## Tier 3 — Tidy / nice-to-have

- **`addLog` signature drift:** `ace`/`kob` take a 5th `opts` arg (Karma/AT buttons); others take 4. Safe today only because the module wrapper forwards via `.apply(this, arguments)`. Standardize on `(label, result, detail, type, opts)` and note it in the module header. _(dcc, sd, ace, kob, dnd.)_
- **Dark-mode API:** `sd` has no `setDarkMode()` helper (only `toggleDarkMode`); `dcc` alone persists `darkMode` into the saved JSON, so importing a `dcc` sheet flips theme but importing others doesn't. Pick one policy.
- **`__BUILD__` markers stale/inconsistent:** `dcc`, `sd`, `gm_screen` still show `2026-07-13` despite heavy edits; format varies (some include `HH:MM UTC`, some date-only). Bump from the deploy step; settle on `<System> Character Sheet — YYYY-MM-DD`.
- **`_pageReady` load-settle constant:** `dcc`/`sd` use 3000 ms, the rest 2500 ms. Hoist to one shared constant.
- **`diceAnim` double-persisted:** written into each sheet's saved blob *and* the shared `dcw_diceanim` key; a sheet saved long ago can restore a stale diceAnim over a newer global preference. Pick one source of truth, or prefer the newer.
- **`sd` remote font:** loads `@font-face` from `https://www.dccompanion.com/fonts/...` while the comment claims it's embedded (`sd:12`). Inline it as a `data:` URI or drop the false claim — it's the only self-hosted external asset in the set.
- **`sd` campaign restore** reads a nested `d._sheet.campaign` out-of-band from a second localStorage read rather than inside `applySheet`, so JSON import won't restore an `sd` campaign. Move it into `applySheet` like the others.
- **`gm_screen` loads ~29 `/tools-data/*.js` synchronously** at page load (every system's data up front) — slowest cold start; consider lazy-loading per selected system.
- **`sw` has no Wild Die:** WEG D6's signature exploding die / complication-on-1 is absent, so SW results skew low with no crit/fumble. Confirm whether that's an intentional simplification (add a comment) or a gap to fill.
- **Minor drift, no action needed:** `.log-header` inner markup differs (module anchors on `.dm-toggle-wrap`, which is present everywhere, so it's safe); `CAMPAIGN_SKIP_LABELS` sets maintained per-sheet; exploding-dice loop caps (19 vs 20); PDF export exists only on `dcc`/`sd`; `theme-color`/manifest only on `kob`/`gm_screen`.

---

## Suggested sequence

1. **The `sd` reconciliation pass** (1.3, 1.4, 1.5, 1.6, 2.3, plus the `sd` items in Tier 3). One focused sheet, resolves the majority of the real-bug findings.
2. **Escaping fix** (1.1 + 1.2) — a canonical `esc`/`escAttr` and switching `dcc`/`sd` to escaped `addLog`. Closes the correctness/injection gap fleet-wide.
3. **Shared-file extraction** (2.1, then 2.2/2.5 fold in) — the durable maintenance win; do it once the above bugs are fixed so you're extracting known-good code.
4. **Tier 3 polish** as time allows.

Items 1 and 2 are the highest bug-value; item 3 is the highest long-term-effort-saved. I can take any of these on — say which and I'll start.
