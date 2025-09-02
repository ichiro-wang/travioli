#!/bin/bash
# this script is for running the dev environment 
# and removing the containers automatically when finished
# add option for detached mode as you would normally running docker compose

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' 

DOCKER_COMPOSE_FILE="docker-compose.dev.yml"

cleanup() {
  echo -e "${YELLOW}Shutting down containers...${NC}"
  docker compose -f "$DOCKER_COMPOSE_FILE" down
  exit 0
}

if [ "$1" = "-d" ] || [ "$1" = "--detach" ]; then
  echo -e "${CYAN}Running in detached mode...${NC}"
  echo -e "${GREEN}To stop containers, run: docker compose -f '$DOCKER_COMPOSE_FILE' down${NC}"
  docker compose -f "$DOCKER_COMPOSE_FILE" up -d
else
  echo -e "${CYAN}Running in attached mode...${NC}"
  docker compose -f "$DOCKER_COMPOSE_FILE" up
  cleanup
fi
