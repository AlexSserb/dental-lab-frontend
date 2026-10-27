# Stage 1: build the static bundle
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# Vite inlines VITE_* variables into the bundle at build time
ARG VITE_API_URL
ARG VITE_LAB_ADMIN_EMAIL
ARG VITE_LAB_ADMIN_NUMBER
ARG VITE_SYS_DEV_EMAIL

COPY . .
RUN npm run build

# Stage 2: serve the bundle with nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
