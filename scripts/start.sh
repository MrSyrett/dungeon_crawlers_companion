#!/bin/sh
# Railway start script.
# Runs DB migrations, then ALWAYS starts the Next.js server. The server start is
# never gated on the migration succeeding, so a migration hiccup can't leave the
# container with nothing listening (which surfaces as a 502).
set -u

echo "[start] PORT=${PORT:-3000}  NODE_ENV=${NODE_ENV:-}"

echo "[start] running: prisma migrate deploy"
if npx --no-install prisma migrate deploy; then
  echo "[start] migrations applied (or none pending)"
else
  echo "[start] WARNING: prisma migrate deploy failed — starting server anyway"
fi

echo "[start] launching: next start on 0.0.0.0:${PORT:-3000}"
exec node node_modules/next/dist/bin/next start -H 0.0.0.0 -p "${PORT:-3000}"
