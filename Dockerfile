# syntax=docker/dockerfile:1
# Dungeon Desk — Next.js 16 + Prisma (pg adapter) on Railway.
# Using an explicit Dockerfile so the build does not depend on Nixpacks'
# source-file scanner (which can choke reading binary assets like the PDFs
# in public/ as UTF-8 text).

FROM node:20-slim AS base
# OpenSSL is needed by Prisma's query engine at runtime.
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# ---- deps: install node modules (postinstall runs `prisma generate`) ----
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
# npm ci runs the postinstall `prisma generate`, which needs the schema (copied above).
RUN npm ci

# ---- build: compile the Next.js app ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Regenerate the Prisma client against the full source tree, then build.
RUN npx prisma generate
RUN npm run build

# ---- run: production image ----
FROM base AS run
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 3000
ENV PORT=3000
# migrate deploy + start (mirrors railway.json's startCommand)
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
