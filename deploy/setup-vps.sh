#!/usr/bin/env bash
# One-time VPS bootstrap for app.my2ndworkforce.com (Ubuntu 24.04/26.04).
# Run as root:  curl -fsSL https://raw.githubusercontent.com/generalduel/open-saas-sell-agents/deploy/hostinger-prep/deploy/setup-vps.sh | bash
# Installs Docker + firewall, clones the repo, creates deploy/.env with generated secrets.
# It does NOT start the app: fill the FILL_ME values first, then run deploy.sh.
set -euo pipefail

REPO=https://github.com/generalduel/open-saas-sell-agents.git
BRANCH=${BRANCH:-deploy/hostinger-prep}
DIR=/opt/my2ndworkforce

export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git openssl ufw

if ! command -v docker >/dev/null 2>&1; then
  # Docker's repo may not list brand-new Ubuntu releases yet; fall back to Ubuntu's packages.
  if ! curl -fsSL https://get.docker.com | sh; then
    apt-get install -y docker.io docker-compose-v2 docker-buildx
  fi
fi
systemctl enable --now docker
docker compose version

ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 443/udp
ufw --force enable

if [ ! -d "$DIR/.git" ]; then
  git clone --branch "$BRANCH" "$REPO" "$DIR"
fi

ENV_FILE="$DIR/deploy/.env"
if [ ! -f "$ENV_FILE" ]; then
  cp "$DIR/deploy/.env.example" "$ENV_FILE"
  gen() { openssl rand -base64 48 | tr -dc 'A-Za-z0-9' | head -c "$1"; }
  sed -i "s|^POSTGRES_PASSWORD=GENERATED|POSTGRES_PASSWORD=$(gen 40)|" "$ENV_FILE"
  sed -i "s|^JWT_SECRET=GENERATED|JWT_SECRET=$(gen 64)|" "$ENV_FILE"
  sed -i "s|^PORTAL_ENCRYPTION_KEY=GENERATED|PORTAL_ENCRYPTION_KEY=$(openssl rand -base64 32)|" "$ENV_FILE"
  sed -i "s|^N8N_WEBHOOK_SHARED_SECRET=GENERATED|N8N_WEBHOOK_SHARED_SECRET=$(gen 48)|" "$ENV_FILE"
  chmod 600 "$ENV_FILE"
fi

echo
echo "Setup complete. Next:"
echo "  1. nano $ENV_FILE    # replace every FILL_ME"
echo "  2. bash $DIR/deploy/deploy.sh"
