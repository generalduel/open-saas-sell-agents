#!/usr/bin/env bash
# Pull latest code, rebuild and restart. Migrations run automatically when the server starts.
set -euo pipefail
cd "$(dirname "$0")"

if grep -q '=FILL_ME$' .env; then
  echo "deploy/.env still has FILL_ME values:" >&2
  grep -n '=FILL_ME$' .env | cut -d= -f1 >&2
  exit 1
fi

git -C .. pull --ff-only
docker compose build --pull
docker compose up -d
docker compose ps
echo "Server log (migrations + startup):"
docker compose logs --tail=60 server
