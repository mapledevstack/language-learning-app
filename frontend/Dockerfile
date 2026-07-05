# Build stage
FROM node:24-bookworm-slim as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# Production stage
FROM caddy:2-alpine as production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=build /app/dist /srv

