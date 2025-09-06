FROM node:22-alpine AS base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --include=dev

FROM base AS dev

# multi-stage build for frontend to go below when ready