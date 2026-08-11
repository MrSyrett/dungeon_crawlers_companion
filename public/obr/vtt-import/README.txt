Universal VTT Importer — a second Owlbear Rodeo extension hosted on the
Dungeon Crawler's Companion site, wired up exactly like the Companion
extension (/obr/manifest.json).

FILES ADDED (all additive — no existing file is modified):

  app/obr/vtt-import/manifest.json/route.ts   -> GET /obr/vtt-import/manifest.json
  app/obr/vtt-import/popover/route.ts         -> GET /obr/vtt-import/popover  (the UI)
  public/obr/vtt-import/app.js                -> prebuilt import logic (bundles @owlbear-rodeo/sdk v3)
  public/obr/vtt-import/icon.svg              -> action icon

No change needed in next.config.ts: its existing "/obr/:path*" CORS rule
already covers these paths. The routes reuse embedHeaders / OBR_FRAME_ANCESTORS
from lib/vtt.ts, same as the Companion popover.

INSTALL URL to paste into Owlbear Rodeo (Extensions -> Add Custom Extension):

  https://<your-site>/obr/vtt-import/manifest.json

  (locally: http://localhost:3000/obr/vtt-import/manifest.json after `next dev`)

REQUIREMENT: players/GMs also need the free official "Dynamic Fog" extension
in their room — this importer writes walls/doors/lights in its data format.
https://extensions.owlbear.rodeo/dynamic-fog

REBUILDING app.js (only if you change the importer source):
The bundle is built from the standalone "uvtt-importer" project with esbuild:

  npx esbuild src/main.ts --bundle --minify --format=iife --target=es2019 \
    --outfile=public/obr/vtt-import/app.js

The importer source (src/*.ts, unit tests) is delivered separately as
uvtt-importer.zip. All wall/door geometry is unit-tested there (`npm test`).
