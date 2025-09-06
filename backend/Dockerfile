FROM node:22-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM base AS prod-build-stage
COPY ./ ./
RUN npx prisma generate && \
    npm run build

FROM node:22-alpine AS prod-final-stage
WORKDIR /usr/src/app

# we don't need dev dependencies in production
COPY --from=prod-build-stage /usr/src/app/package*.json ./
# for my own reference: https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci
RUN npm ci --only=production && \
    npm cache clean --force

COPY --from=prod-build-stage /usr/src/app/dist ./dist
COPY --from=prod-build-stage /usr/src/app/prisma/schema.prisma ./prisma/
COPY --from=prod-build-stage /usr/src/app/node_modules/.prisma ./node_modules/.prisma

CMD [ "node", "./dist/src/server.js" ]
