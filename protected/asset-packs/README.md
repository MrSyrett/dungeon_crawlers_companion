# Forgotten Adventures — gated asset bundle

This folder holds the **refined Forgotten Adventures (FA) object bundle** the Map Maker
loads automatically for signed-in admins, plus the tool that builds it. FA art is
licensed for personal use, not redistribution, so it lives here under `protected/`
(never under `public/`) and is served only through the admin-gated route
`/api/asset-packs` — exactly like the rulebook PDFs.

## Files
- `fa/` — the baked bundle: shared WebP atlas sheets + `fa-bundle.json` (the manifest
  the Map Maker reads). This is what gets served.
- `extract-fa.py` — the baker: turns `.dungeondraft_pack` files into the refined,
  atlased bundle. Downsamples to 96 px/cell, packs big shared atlases (a whole pack is
  ~10 files), keeps colour words in names (so the palette groups colour variants), and
  flags FA "Colorable" props so the Map Maker can recolour them. Needs Python + Pillow.
- `split-pack.js` — splits an oversized `.dungeondraft_pack` into smaller valid
  sub-packs. **Pure Node, no install.** Each sub-pack carries the same pack id so the
  baker re-merges them into one pack.
- `split-fa.bat` — double-click runner for `split-pack.js`.
- `bake-fa.bat` — double-click runner for `extract-fa.py` (only if you have Python).

## The normal workflow (Claude bakes; you don't need Python)
Claude bakes the stage-able packs in the cloud and commits them a handful of files at a
time. The only packs Claude can't reach on its own are the few **over ~400 MB** (Flora,
Nature Rocks, the big Structures packs). For those:

1. Double-click **`split-fa.bat`** — it uses Node (already on your machine, no install)
   to split every 400 MB+ pack into `_part` files under `<FA folder>\_split`.
2. Tell Claude "the _split folder is ready." Claude pulls the parts, bakes them (they
   re-merge into one pack), and commits.
3. You commit the `protected/asset-packs/fa` folder in GitHub Desktop and deploy.
4. Delete the `_split` folder when done.

## If you DO have Python (optional shortcut)
Double-click **`bake-fa.bat`** to bake **all** object packs yourself (no size limits),
then commit `fa/`. It installs Pillow for you. Edit its `PATTERN` line to bake a subset.

## Notes for whoever runs the extractor
It's **incremental**: each pack is atlased into its own sheets (`<packid>-obj-N.webp`)
and merged into `fa-bundle.json`, so packs can be baked one at a time without disturbing
the others. Texture ids are name-stable, so saved maps keep resolving. For a clean full
rebuild, delete the `fa/` folder first.

## Access control
`lib/asset-packs.ts` gates this to admins (`ADMIN_EMAILS`). To let players see FA art
in the Map Maker, widen `canAccessAssetPacks` the way `canAccessRulebook` works
(an "everyone" flag or per-user grants).
