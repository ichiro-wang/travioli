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

# ensure that the api key can only be accessed from specified domain
# we don't want anyone on the internet to steal our key
ARG VITE_MAPS_API
ENV VITE_MAPS_API=$VITE_MAPS_API

COPY ./ ./
RUN npm run build

FROM nginx:alpine AS prod

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]