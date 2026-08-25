#!/bin/sh
# Railway start script.
# Runs DB migrations, then ALWAYS starts the Next.js server. The server start is
# never gated on the migration succeeding, so a migration hiccup can't leave the
# container with nothing listening (which surfaces as a 502).
#
# The deploy step retries: on Railway the app and Postgres can restart together,
# and the first attempt often lands while the DB is still booting ("the database
# system is starting up"). Skipping migrations then leaves the app running
# against an old schema, which crashes any page that touches a new column.
set -u

echo "[start] PORT=${PORT:-3000}  NODE_ENV=${NODE_ENV:-}"

migrated=0
attempt=1
while [ "$attempt" -le 5 ]; do
  echo "[start] running: prisma migrate deploy (attempt $attempt/5)"
  if npx --no-install prisma migrate deploy; then
    echo "[start] migrations applied (or none pending)"
    migrated=1
    break
  fi
  echo "[start] migrate deploy failed — retrying in $((attempt * 3))s"
  sleep $((attempt * 3))
  attempt=$((attempt + 1))
done

if [ "$migrated" -ne 1 ]; then
  echo "[start] WARNING: prisma migrate deploy failed after 5 attempts — starting server anyway"
fi

echo "[start] launching: next start on 0.0.0.0:${PORT:-3000}"
exec node node_modules/next/dist/bin/next start -H 0.0.0.0 -p "${PORT:-3000}"
