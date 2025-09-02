#!/bin/bash
# this script is for generating the client from the openapi yml file

cd frontend

echo "Generating..."
npm run generate:client

cd ..
echo "Finished."
