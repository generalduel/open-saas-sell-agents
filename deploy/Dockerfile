# Builds the Wasp app (template/app) into two images:
#   target "server" - Wasp/Express API + PgBoss jobs; applies Prisma migrations on start
#   target "web"    - Caddy serving the built React client and proxying the API (auto HTTPS)
# Build context: repository root.

ARG NODE_VERSION=24.22.1

# ---------- 1. Wasp build (server code + client bundle) ----------
FROM node:${NODE_VERSION}-bookworm AS wasp
ENV WASP_TELEMETRY_DISABLE=1
RUN npm i -g npm@11 @wasp.sh/wasp-cli@0.26.1
WORKDIR /src
COPY template/app/ ./
RUN rm -rf .wasp node_modules .env.server .env.client
RUN wasp install && wasp build

# Client: API URL and client env vars are baked in at build time.
ARG REACT_APP_API_URL
ARG REACT_APP_GOOGLE_ANALYTICS_ID=""
RUN test -n "$REACT_APP_API_URL" || (echo "REACT_APP_API_URL build arg is required" && exit 1)
RUN REACT_APP_API_URL="$REACT_APP_API_URL" \
    REACT_APP_GOOGLE_ANALYTICS_ID="$REACT_APP_GOOGLE_ANALYTICS_ID" \
    npx vite build

# Server: same steps as Wasp's generated Dockerfile (.wasp/out/Dockerfile).
WORKDIR /src/.wasp/out
RUN npm install && cd server && npm install
RUN cd server && npx prisma generate --schema='../db/schema.prisma' && npm run bundle

# ---------- 2. Server runtime ----------
FROM node:${NODE_VERSION}-bookworm-slim AS server
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
# Keep the project layout so workspace links in node_modules (e.g. `wasp` -> .wasp/out/sdk/wasp) resolve.
COPY --from=wasp /src/package.json /app/package.json
COPY --from=wasp /src/node_modules /app/node_modules
COPY --from=wasp /src/.wasp/out /app/.wasp/out
WORKDIR /app/.wasp/out/server
EXPOSE 3001
# start-production = prisma migrate deploy, then node bundle/server.js
CMD ["npm", "run", "start-production"]

# ---------- 3. Web (static client + reverse proxy) ----------
FROM caddy:2-alpine AS web
COPY --from=wasp /src/.wasp/out/web-app/build /srv
COPY deploy/Caddyfile /etc/caddy/Caddyfile
