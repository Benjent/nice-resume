ARG NODE_VERSION=20.11
ARG NUXT_HOST=0.0.0.0
ARG NUXT_PORT=3000

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /app

RUN corepack enable pnpm

# Install packages first to get better layer caching
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE ${NUXT_PORT}
ENV NUXT_HOST=${NUXT_HOST} \
    NUXT_PORT=${NUXT_PORT} \
    NODE_ENV=PRODUCTION

CMD ["node", ".output/server/index.mjs"]
