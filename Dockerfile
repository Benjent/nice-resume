ARG NODE_VERSION=20.11
ARG NUXT_HOST=0.0.0.0
ARG NUXT_PORT=3000

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
RUN corepack enable pnpm
# Install packages first to get better layer caching
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base as builder
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN pnpm run build && pnpm store prune

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro

COPY --from=builder /app/.output ./.output
EXPOSE ${NUXT_PORT}
ENV NUXT_HOST=${NUXT_HOST} \
    NUXT_PORT=${NUXT_PORT} \
    NODE_ENV=PRODUCTION
USER nitro
CMD ["node", ".output/server/index.mjs"]
