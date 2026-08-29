# Dungeon Crawler's Companion

A multi-user web wrapper around the [Dungeon Desk](https://github.com/MrSyrett/dungeondesk)
TTRPG tools (Dungeon Crawler Carl & Shadowdark character sheets and session-prep
builders), plus an ACE! (Awfully Cheerful Engine) Hero ID Card built for this app. The original tools store everything in the browser's `localStorage`;
this app hosts them behind accounts and saves each user's data in Postgres.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Prisma 7** + **Postgres** (via the `@prisma/adapter-pg` driver adapter)
- Email + password auth (scrypt hashing, DB-backed session in an httpOnly cookie)
- **Tailwind CSS 4**
- Deploys on **Railway**

## How the tools are served

The four tool HTML files live untouched in `tools/templates/`. They are **not**
in `public/` — they're served through an authenticated route handler at
`app/tools/[tool]/[id]/route.ts`, which:

1. Checks the session and loads the requested `Document` (scoped to the user).
2. Reads the template and injects, at the very top of `<head>`, a small shim
   (`lib/inject.ts`) that:
   - seeds the tool's `localStorage` key(s) from the saved document **synchronously**
     (the data is inlined into the page, so there's no async race with the tool's
     own init);
   - clears any stale per-key cookies so a fresh document can't inherit another
     document's data via the tool's built-in cookie fallback;
   - debounce-`PATCH`es changes back to `/api/documents/:id`.

The tool's own JavaScript is never rewritten. Each tool's `localStorage` key is
registered in `lib/tools.ts`.

| Tool id         | System               | localStorage key |
| --------------- | -------------------- | ---------------- |
| `dcc-character` | Dungeon Crawler Carl | `dcc_sheet`      |
| `dcc-session`   | Dungeon Crawler Carl | `dcw_builder_v5` |
| `sd-character`  | Shadowdark           | `sd_sheet`       |
| `sd-session`    | Shadowdark           | `dcw_builder_v5` |
| `ace-character` | ACE!                 | `ace_sheet`      |
| `kob-character` | Kids on Bikes        | `kob_sheet`      |

## Game systems

The dashboard, the `/rules` shelf and the tool registry are keyed by
`SystemKey` in `components/systemStore.ts` (`"SD" | "DCC" | "ACE" | "KOB"`).
Kids on Bikes, Kids on Brooms and Kids in Capes share the `KOB` system: one
sheet with a per-character book switch, one data layer tagged by book. To add a
system: add its key and accent to `SYSTEMS`, register its tools in
`lib/tools.ts`, and add its reference links to `SYSTEM_REFERENCE` in
`app/dashboard/page.tsx`. Everything else (rulebook tagging, campaign rosters,
VTT tokens, the documents API) reads those two tables.

Rulebook content lives as curated JSON under `data/<system>/` and is fanned out
to typed `lib/data/*.ts` (Next pages) and `public/tools-data/*.js` (the HTML
tools) by `npm run data:dcc` / `npm run data:ace` / `npm run data:kob`. The generated files are
committed; re-run after editing the JSON.

> Note: portrait images are intentionally not persisted (the original tools strip
> them before saving to avoid storage-quota issues). Same limitation here.

## Project layout

```
app/
  actions/            server actions (auth, document CRUD)
  api/documents/[id]  autosave + delete endpoint (used by the injected shim)
  tools/[tool]/[id]   authenticated HTML-serving route
  login, signup       auth pages
  dashboard           lists saved documents per tool
components/            AuthForm, ConfirmButton (client)
lib/                   prisma, auth, tools registry, injection shim
prisma/schema.prisma   User / Session / Document models
tools/templates/       the original tool HTML files (served, not static)
generated/prisma/      generated Prisma client (gitignored)
```

## Local development

1. **Install** (also generates the Prisma client via `postinstall`):

   ```bash
   npm install
   ```

2. **Database.** Point `DATABASE_URL` (in `.env`) at a Postgres instance. A local
   option using Docker is included:

   ```bash
   docker compose up -d   # Postgres 16 → postgresql://dungeon:dungeon@localhost:5432/dungeondesk
   ```

   Or set `DATABASE_URL` to any Postgres you already run. See `.env.example`.

3. **Apply migrations** to create/update the schema:

   ```bash
   npm run db:deploy        # applies committed migrations in prisma/migrations
   ```

   When you change `schema.prisma`, create a new migration instead:

   ```bash
   npm run db:migrate -- --name <change_name>
   ```

4. **Run it:**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000, create an account, and start a sheet.

## Deploying to Railway

1. Create a Railway project and add the **Postgres** plugin.
2. Add this repo as a service. Set service variables:
   - `DATABASE_URL = ${{Postgres.DATABASE_URL}}`
   - `SESSION_SECRET = <any random string>`
   - `NODE_ENV = production`
3. Deploy. `railway.json` runs `prisma migrate deploy` before `next start`
   (applying any pending migrations from `prisma/migrations`), and `postinstall`
   regenerates the Prisma client during the build.

### Schema changes

`prisma/migrations` is the source of truth. To evolve the schema:

1. Edit `prisma/schema.prisma`.
2. Run `npm run db:migrate -- --name <change_name>` against a dev DB to generate
   and apply a new migration.
3. Commit the new `prisma/migrations/*` folder and push — Railway's
   `migrate deploy` applies it on the next deploy.

> The initial migration (`0_init`) was **baselined** onto the already-existing
> production database (created earlier via `db push`) with
> `prisma migrate resolve --applied 0_init`, so no data was lost in the switch.

## Scripts

| Script               | Purpose                       |
| -------------------- | ----------------------------- |
| `npm run dev`        | Dev server                    |
| `npm run build`      | Production build              |
| `npm run start`      | Start production server       |
| `npm run db:migrate` | Create/apply a dev migration  |
| `npm run db:deploy`  | Apply migrations (production) |
| `npm run db:studio`  | Prisma Studio                 |
