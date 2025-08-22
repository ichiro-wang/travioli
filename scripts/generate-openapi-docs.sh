#!/bin/bash
# this script is for generating the openapi yml file in the backend based on the zod schemas

cd backend

echo "Generating..."
npm run generate:openapi

cd ..
echo "Finished."