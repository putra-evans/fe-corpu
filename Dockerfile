# === Stage 1: Build Next.js ===
# FROM 10.5.49.40:5050/image-app/kominfotik-node-20.9-alpine AS builder
FROM 10.5.44.50:5050/devops/base-images/kominfotik-node-20.19-alpine AS builder

WORKDIR /app

# Copy package.json dan install deps (dev + prod)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Next.js (SSR build disimpan di .next/)
RUN npm run build

# === Stage 2: Runtime (lebih kecil & hanya prod deps) ===
# FROM 10.5.49.40:5050/image-app/kominfotik-node-20.9-alpine AS runner
FROM 10.5.44.50:5050/devops/base-images/kominfotik-nginx-1.21-openresty:latest AS runner

WORKDIR /app

ENV NODE_ENV production

# Salin hanya deps production
COPY package*.json ./
RUN npm ci --omit=dev

# Copy hasil build dari stage builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Variabel environment (API base URL, dll)
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Gunakan user non-root (lebih aman)
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -s /bin/sh -D nextjs
USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]