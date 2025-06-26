#!/bin/sh
# this script is for running the test environment and exiting it automatically

DOCKER_COMPOSE_FILE="docker-compose.test.yml"
TEST_PATTERN=$(printf "%s " "$@")

echo "Running tests. Composing up..."

docker compose -f "$DOCKER_COMPOSE_FILE" up -d

docker exec -it "travioli-backend-test" sh -c "npm run test -- $TEST_PATTERN"

echo "Finished running tests. Composing down..."

docker compose -f "$DOCKER_COMPOSE_FILE" down
