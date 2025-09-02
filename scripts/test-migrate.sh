#!/bin/bash
# this script builds the containers for the test environment

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DOCKER_COMPOSE_FILE="docker-compose.test.yml"
BACKEND_SERVICE="travioli-backend-test"

echo -e "${CYAN}Building containers...${NC}"
docker compose -f "$DOCKER_COMPOSE_FILE" up --build -d

echo -e "${CYAN}Generating Prisma client and pushing database schema...${NC}"
docker exec -it "$BACKEND_SERVICE" sh -c "npx prisma generate && npx prisma db push && npm i"

echo -e "${GREEN}Test environment is ready!${NC}"

echo -e "${YELLOW}Composing down...${NC}"
docker compose -f "$DOCKER_COMPOSE_FILE" down