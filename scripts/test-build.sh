#!/bin/sh
# this script builds the containers for the test environment

DOCKER_COMPOSE_FILE="docker-compose.test.yml"

echo "Building containers..." 
docker compose -f "$DOCKER_COMPOSE_FILE" up --build -d

echo "Generating Prisma client and pushing database scheme..."
docker exec -it "travioli-backend-test" sh -c "npx prisma generate && npx prisma db push"

echo "Test environment is ready!"
echo "Composing down..."

docker compose -f "$DOCKER_COMPOSE_FILE" down