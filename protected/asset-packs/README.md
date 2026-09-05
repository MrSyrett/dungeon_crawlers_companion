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
  atlased bundle. Objects only (textures come later). It downsamples to 96 px/cell,
  packs shared atlases, keeps colour words in names (so the palette groups colour
  variants), and flags FA "Colorable" props so the Map Maker can recolour them.
- `bake-fa.bat` — a double-click runner for Windows that bakes **all** your FA object
  packs into `fa/`. Because it runs on your PC it has no file-size limits — the big
  600 MB+ packs bake the same as the small ones.

## How to add / refresh packs (recommended: bake locally)
1. Make sure Python 3 is installed (with "Add python.exe to PATH" ticked).
2. Double-click **`bake-fa.bat`**. It installs Pillow if needed, then bakes every
   `FA_Walls and Objects*` pack from your FA folder into `fa/` (20–40 min for the
   full set; leave it running).
3. Open **GitHub Desktop**, commit the `protected/asset-packs/fa` folder, and deploy.
4. The Map Maker picks up every baked pack automatically on next load.

To bake just one pack, edit the `PATTERN` line in `bake-fa.bat` (e.g. `*Furniture*`).
To include the seamless-texture packs too, set it to `*.dungeondraft_pack`.

## Manual / advanced
```
python extract-fa.py "<your FA folder>" "<repo>/protected/asset-packs/fa" "*Furniture*" "*Decor*"
```
The extractor is **incremental**: each pack is atlased into its own sheets and merged
into `fa-bundle.json`, so you can bake pack-by-pack without disturbing packs already
there. Texture ids are name-stable, so existing saved maps keep resolving. For a clean
full rebuild, delete the `fa/` folder first (that's what `bake-fa.bat` does).

## Access control
`lib/asset-packs.ts` gates this to admins (`ADMIN_EMAILS`). To let players see FA art
in the Map Maker, widen `canAccessAssetPacks` the way `canAccessRulebook` works
(an "everyone" flag or per-user grants).
