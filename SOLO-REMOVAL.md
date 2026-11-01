# Solo Play — how to switch it off or remove it

Solo Play (Dragonbane solo campaigns, "Alone in Deepfall Breach") was built to be
removable. Nothing else on the site depends on it.

## Switch it off (no code changes)

| Setting | Effect |
|---|---|
| *(default)* | Visible only to admin accounts (`ADMIN_EMAILS`). |
| `SOLO_PLAY_PUBLIC=1` | Visible to everyone. |
| `SOLO_PLAY=off` | Hidden from everyone, admins included; `/solo/<id>` returns 404. |

The switch lives in `lib/solo.ts` → `soloEnabledFor()`. Every solo button, section
and page checks it.

## Remove it completely

### 1. Delete these solo-only files and folders
- `lib/solo.ts`, `lib/solo-modules.ts`
- `app/solo/` (the `/solo/[id]` page route)
- `app/actions/solo.ts`
- `components/solo/` (`SoloCampaignCard.tsx`, `NewSoloCampaign.tsx`)
- `tools/templates/db_solo.html`
- `public/tools-data/solo/` (`db-solo-tables.js`, `db-solo-deepfall.js`, `db-solo-sinking-tower.js`)
- `SOLO-REMOVAL.md` (this file)

### 2. Remove the marked hooks in shared files
Each one is commented `SOLO PLAY`:

| File | What to remove |
|---|---|
| `tools/templates/db_character_sheet.html` | The whole `<script>` block headed `SOLO PLAY BRIDGE`, just before `</body>`. |
| `components/CampaignsList.tsx` | The `solo` imports, the `solo` prop and the `{/* SOLO PLAY … */}` "Solo" panel at the end. |
| `app/campaigns/page.tsx` | The `@/lib/solo` import, the `solo` const and the `solo={solo}` prop. |
| `app/my-campaigns/page.tsx` | The `@/lib/solo` / `SoloCampaignCard` imports, the `solo` const (restore `const systems = SYSTEMS.filter((s) => bySystem.has(s.key));` and `cards.length` in the subtitle) and the `s.key === "DB" ? solo.map(...)` block. |
| `components/CharacterCard.tsx` | The `createSoloCampaign` import, the `solo` prop, the `Solo:` text in the campaign line, the `solo?.campaignId ? … Solo` link and the `Solo` form button. |
| `app/my-characters/page.tsx` | The `@/lib/solo` import, the `soloOn` / `soloBy` lines and the `solo={…}` prop. |
| `app/dashboard/page.tsx` | The `@/lib/solo` import, the `soloLinks` lines and the `soloLinks={soloLinks}` prop. |
| `components/DashboardDocs.tsx` | The `soloLinks` props (`DocList` and `DashboardDocs`) and the `solo={…}` prop on `CharacterCard`. |

### 3. Saved data
Solo campaigns are documents with `tool = "db-solo"`. Once the code is gone, nothing
lists or opens them, and they are harmless. To delete them as well:

```sql
DELETE FROM "Document" WHERE tool = 'db-solo';
```

Characters, campaigns and adventures are never touched: a solo campaign only stores
a reference to its hero's sheet.

### 4. Check
Run `npx tsc --noEmit` and `npm run build`. Nothing should still reference `@/lib/solo`,
`components/solo` or `db_solo`:

```sh
grep -rn "lib/solo\|components/solo\|db_solo\|SOLO PLAY" app components lib tools public
```
