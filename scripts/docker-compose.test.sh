#!/bin/sh
# this script is for running the test environment and exiting it automatically

docker compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from backend
exit_code=$?
docker compose down
exit $exit_code