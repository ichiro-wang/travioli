#!/bin/sh
# this script builds the containers for the dev environment

DOCKER_COMPOSE_FILE="docker-compose.dev.yml"

echo "Building..." 
docker compose -f "$DOCKER_COMPOSE_FILE" up --build -d

echo "Generating Prisma client and pushing database scheme..."
docker exec -it "travioli-backend-dev" sh -c "npx prisma generate && npx prisma db push"

echo "Dev environment is ready!"

docker compose -f "$DOCKER_COMPOSE_FILE" down