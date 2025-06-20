#!/bin/sh
# this script is for running the test environment and exiting it automatically

DOCKER_COMPOSE_FILE="docker-compose.test.yml"
TEST_PATTERN=$(printf "%s " "$@")

TEST_PATTERN="$TEST_PATTERN" docker compose -f "$DOCKER_COMPOSE_FILE" up \
  --abort-on-container-exit \
  --exit-code-from backend

exit_code=$?

docker compose -f "$DOCKER_COMPOSE_FILE" down

exit $exit_code