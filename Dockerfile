FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

ARG VITE_API_BASE_URL=""
ARG VITE_ENABLE_MOCKS=false
ARG VITE_TOKEN_REFRESH_INTERVAL_MS=300000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL} \
    VITE_ENABLE_MOCKS=${VITE_ENABLE_MOCKS} \
    VITE_TOKEN_REFRESH_INTERVAL_MS=${VITE_TOKEN_REFRESH_INTERVAL_MS}
RUN pnpm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
