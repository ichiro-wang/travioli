#!/bin/bash
# this file is for running database migrations with prisma 
# and regenerating the prisma client

# ensure backend container is running before executing this

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}Running database migration and regenerating Prisma client...${NC}"

if [ "$#" -ne 1 ]; then
  echo -e "${RED}Usage: $0 <migration-name>${NC}"
  exit 1
fi

BACKEND_SERVICE="travioli-backend-dev"
MIGRATION_NAME=$1
COMMAND_STRING="npx prisma migrate dev --name ${MIGRATION_NAME} && npx prisma generate"

echo -e "${GREEN}Running inside container: $BACKEND_SERVICE${NC}"
docker exec -it "$BACKEND_SERVICE" sh -c "$COMMAND_STRING"

echo -e "${GREEN}Running locally for dev tooling (eg type updates)...${NC}"
cd backend
sh -c "$COMMAND_STRING"
cd ..

echo -e "${CYAN}Done!${NC}"