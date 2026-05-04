# Tengo Derechos — production image for Coolify (or any Docker host).
# Multi-stage build → ~150MB final image.
#
# Build args:
#   --build-arg NEXT_PUBLIC_BUILD_ID=<git-sha>   (used by service worker cache key)
#   --build-arg NEXT_PUBLIC_SITE_URL=https://tengoderechos.org
#
# Runtime env (set in Coolify):
#   STRIPE_SECRET_KEY=sk_live_...
#   STRIPE_WEBHOOK_SECRET=whsec_...
#   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
#   STRIPE_PRICE_MONTHLY_25=price_... (optional)
#   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
#   ADMIN_TOKEN=<long-random-string>
#   NEXT_PUBLIC_NONPROFIT_STATUS=pending|confirmed|denied
#   NEXT_PUBLIC_NONPROFIT_EIN=
#   RESOURCES_ADMIN_EMAIL, RESEND_API_KEY (optional)
#
# Persistent volume (mount in Coolify):
#   /app/data → durable storage for content-attestations.json + donations.jsonl

# ---- 1. install deps (cached layer) ---------------------------------------
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund --include=dev

# ---- 2. build -------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_BUILD_ID
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_NONPROFIT_STATUS=pending
ENV NEXT_PUBLIC_BUILD_ID=$NEXT_PUBLIC_BUILD_ID \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_NONPROFIT_STATUS=$NEXT_PUBLIC_NONPROFIT_STATUS \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- 3. runtime -----------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

# Non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone bundle + public assets (audio, icons, manifest, security.txt)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Persistent runtime data (mount as Coolify volume in production).
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data
VOLUME ["/app/data"]

USER nextjs
EXPOSE 3000

# Standalone server
CMD ["node", "server.js"]
