#!/bin/sh
# this script is for running the dev environment 
# and removing the containers automatically when finished
# add option for detached mode as you would normally running docker compose

DOCKER_COMPOSE_FILE="docker-compose.dev.yml"

cleanup() {
  echo "Shutting down containers..."
  docker compose -f "$DOCKER_COMPOSE_FILE" down
  exit 0
}

if [ "$1" = "-d" ] || [ "$1" = "--detach" ]; then
  echo "Running in detached mode..."
  echo "To stop containers, run: docker compose -f '$DOCKER_COMPOSE_FILE' down"
  docker compose -f "$DOCKER_COMPOSE_FILE" up -d
else
  echo "Running in attached mode..."
  docker compose -f "$DOCKER_COMPOSE_FILE" up
  cleanup
fi
