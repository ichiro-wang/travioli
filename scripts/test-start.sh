#!/bin/bash
# this script is for running the test environment and exiting it automatically

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DOCKER_COMPOSE_FILE="docker-compose.test.yml"
BACKEND_SERVICE="travioli-backend-test"
TEST_PATTERN=$(printf "%s " "$@")

echo -e "${CYAN}Running tests. Composing up...${NC}"
docker compose -f "$DOCKER_COMPOSE_FILE" up -d

# Run tests inside container
echo -e "${CYAN}Executing tests inside ${BACKEND_SERVICE}...${NC}"
docker exec -it "$BACKEND_SERVICE" sh -c "npm run test -- $TEST_PATTERN"

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}Tests passed.${NC}"
else
  echo -e "${RED}Tests failed with exit code $EXIT_CODE.${NC}"
fi

echo -e "${YELLOW}Finished running tests. Composing down...${NC}"
docker compose -f "$DOCKER_COMPOSE_FILE" down

exit $EXIT_CODE
