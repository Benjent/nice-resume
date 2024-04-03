FROM node:20.11

ENV PNPM_HOME=/workspaces/pnpm
RUN corepack enable

COPY pnpm-lock.yaml ./
RUN pnpm fetch
