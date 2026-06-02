FROM node:22-alpine AS base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --include=dev

FROM base AS dev

# multi-stage build for frontend to go below when ready
FROM node:22-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

FROM nginx:alpine AS prod

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]