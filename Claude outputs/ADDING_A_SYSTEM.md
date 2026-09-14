# Adding a new game system — end-to-end checklist

Grounded in the codebase (verified against the most recent full addition, **D6 System
2e** / key `D62E`). Do the phases in order. Two mental models make this reliable:

- **Central registries** fan out automatically — get these right and the dashboard
  toggle, tool routing, admin visibility, and per-tab panels mostly "just work."
- **Hardcoded per-system lists** are scattered across a few doc/campaign/VTT routes.
  These are what break silently if skipped. Phase 6 lists every one; the final catch-all
  step (grep an existing key) guarantees you found them all.

Throughout, pick a **SystemKey**: short, uppercase, unique (e.g. `SD`, `DS`, `DND`,
`D62E`). Also settle a display name, a short label, and an accent hex color up front.

---

## Phase 1 — Data pipeline (curate → typed + runtime)

1. **Curate source data** under `data/<system>/parts/` (see `data/SCHEMA.md` for the
   house shape). This is the human-edited source of truth.
2. **Write `scripts/build-<system>-data.mjs`** that reads `data/<system>/…` and emits:
   - `lib/data/<system>-*.ts` — typed arrays imported by reference pages / server code.
   - `lib/data/<system>-types.ts` — the TS types those files use.
   - `public/tools-data/<system>-*.js` — runtime globals (e.g. `const X = [...]; window.X = X;`)
     loaded by the sheet, session builder, and GM Screen. **Always assign to `window.`**
     so cross-script `typeof X` is safe.
3. **Add an npm alias** in `package.json`: `"data:<system>": "node scripts/build-<system>-data.mjs"`.
   (D62e shipped without this alias — don't repeat that miss.) Run it and commit the outputs.

## Phase 2 — Register the system (central registries)

4. **`components/systemStore.ts`** — add the key to the `SystemKey` union **and** a row to
   the `SYSTEMS` array `{ key, name, short, accent: "var(--<system>)" }`. This one array
   drives the dashboard toggle, per-tab panels, and Admin → Systems visibility.
5. **`app/globals.css`** — add the accent token `--<system>: #hex;` and its
   `--color-<system>: var(--<system>);` mapping (match the pattern of `--d62e` / `--sw`).

## Phase 3 — Tools: character sheet + session prep

6. **Character sheet** — author `tools/templates/<system>_character_sheet.html` (+ its
   builder/logic, typically `public/tools-data/<system>-sheet-builder.js`). Conventions
   the rest of the app relies on: the sheet persists its JSON under a `<system>_sheet`
   localStorage key, and that JSON has a top-level (or header) **name** field.
   *(This is the biggest, most bespoke chunk — everything else is wiring.)*
7. **Session-prep builder** — add a `SYSTEMS` entry and an `SB_CONFIGS.<system>` block in
   `scripts/make-session-builders.mjs` (file name, key `<system>_session`, ls key, cfg,
   theme colors, stat-block schema, bestiary adapter), then run it to emit
   `tools/templates/<system>_session_prep_builder.html`.
8. **`lib/tools.ts`** — add `<system>-character` and `<system>-session` to the `ToolId`
   union, to the `TOOLS` registry (`{ id, system, systemName, kind, label, file, keys }`),
   and to `TOOL_ORDER`. Tools are served generically by `app/tools/[tool]/[id]/route.ts`
   and created via `app/actions/documents.ts` — both are registry-driven, so no per-system
   route or create logic is needed.

## Phase 4 — Dashboard

9. **`app/dashboard/page.tsx`** — add a `<SYSTEM>_REFERENCE` link array (the reference-page
   links for that system's tab) and register it in the `SYSTEM_REFERENCE` map. The system
   toggle, the two document columns (character/session, filtered by the tool registry), and
   the shared toolbar links all come from `SYSTEMS` / `TOOLS` automatically. Use `navFor`
   only for per-system nav overrides (e.g. D&D dropping Rulebooks).

## Phase 5 — Reference pages + homebrew

10. **Reference shell + pages** — add `components/<System>Ref.tsx` (the themed shell) and
    pages under `app/<system>/*` (classes/species/gear/bestiary/etc.). Each page reads its
    `lib/data/<system>-*` data and merges the user's homebrew of the matching type.
11. **Homebrew** — in `lib/homebrew.ts` add the `<system>-*` types to the union + list and
    write a normalizer per type; in `components/HomebrewEditor.tsx` add the editor field
    schema per type; in `components/HomebrewManager.tsx` add the union entries. Add a
    `app/<system>/homebrew` hub page and link it from the dashboard toolbar.

## Phase 6 — Document / campaign / VTT integrations (the easy-to-miss hardcoded lists)

These are literal per-system lists — a new system is invisible to these features until
added. This is the #1 source of "it half-works":

12. **`app/api/documents/[id]/route.ts` → `extractDocTitle`** — add a branch that names a
    saved doc from the sheet's `name` (parse `blob.<system>_sheet`). Without it, sheets
    show as "Untitled" in the dashboard/roster.
13. **`app/api/vtt/documents/[id]/route.ts`** — add `<system>_sheet` to the array of sheet
    keys it scans for the campaign link (the `["dcc_sheet", …]` list). Without it, the
    sheet can't join a campaign's VTT.
14. **`app/campaigns/page.tsx`** — add a sheet-name/summary extraction branch (mirrors the
    `sd_sheet` / `dcc_sheet` / `d62e_sheet` blocks) so party cards show the character.
15. **`app/obr/popover/route.ts`** — add the system to its system list
    (`{ key, name, cls }`) and a `.group-head.<cls>` accent color for the VTT sheet picker.

## Phase 7 — GM Screen (`tools/templates/gm_screen.html`)

Give the system the newer-system baseline (monster generator + treasure builder) via the
data-driven "xs" framework — see `claude/gm-screen-darkspace-d62e-generators.md` for the
exact edits. In brief:

16. Add the `<option>` to `#gm-system-toggle` and an entry to `SYS_GENS`
    (`['<sys>monster','<sys>treasure']`); add the `<script src>` for its bestiary + gear data.
17. Add the two generator tab `<option>`s, a monster panel (`data-panel="<sys>monster"`)
    and a treasure panel (`class="xs-treasure" data-sys="<sys>"`).
18. Extend `xsBestiary` (+ a facet in `xsMonType`) and add a `xsMonSummary` branch that maps
    the creature's stats/lines/notes/hp into the shared card shape.
19. Add the source to the monster-panel select population and the generate branch; add the
    treasure config to `XS_TREASURE`; add the treasure panels to `BUILDER_PANELS`.
20. Add the source to `XS_SOURCES` (+ the monster-lookup branch and `hpMode` map) so the
    combat tracker's picker follows the system too.
    *(Optional, richer: author a `gm-<system>-tables.js` `window.<SYS>_GM` table set to power
    the fuller Shadowdark-style suite — NPC/Dungeon/Encounter/Shop. DarkSpace has one;
    parity with ACE/NIM/SW only needs monster + treasure.)*

## Phase 8 — Admin, verify, deliver

21. **Admin → Systems** visibility needs no change — `app/admin/systems/page.tsx` reads
    `SYSTEMS`. Confirm the new system appears and can be hidden/shown.
22. **Catch-all sweep (do this every time):** `grep -rn "<EXISTING_KEY>"` for a comparable
    system (e.g. `D62E`/`d62e`, or `SW`/`sw`) across `app components lib scripts tools styles`
    and confirm the new system has a parallel in every hit. This is what makes results
    consistent — it surfaces any list added since this checklist was written.
23. **Verify:** `npx tsc --noEmit` (expect only the pre-existing `@/generated/prisma`
    cascade in the cloud clone); run `node scripts/build-<system>-data.mjs`; `node --check`
    the new runtime JS; headless-test the character sheet, the session builder, and the GM
    Screen generators (serve the template + `/tools-data`, drive with Playwright/Chromium).
24. **Deliver:** write changed files to the repo (on the PC via the device bridge); note any
    Prisma migration if the change touched the schema (system visibility already exists).

---

### The dependency order in one line
data build → `systemStore` + accent → sheet + session builder + `lib/tools` → dashboard →
reference pages + homebrew → doc/campaign/VTT lists → GM Screen → verify + catch-all grep.

### Registries that fan out automatically (get these right, get most of it free)
`SYSTEMS` (toggle, panels, admin), `TOOLS`/`TOOL_ORDER` (routing, create, roster, VTT
sheet access), `CHARACTER_TOOL_IDS` (derived). Everything in Phase 6 is the opposite —
manual per-system lists — which is why the catch-all grep in step 22 is mandatory.
