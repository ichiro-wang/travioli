import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createItinerarySchema } from "../src/schemas/itineraries.schema.js";

export const registerItinerariesPaths = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "post",
    path: "/itineraries",
    description: "Create an itinerary",
    request: {
      body: {
        content: {
          "application/json": {
            schema: createItinerarySchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Itinerary created",
        content: {
            "application/json": {
              schema: 
            }
        }
      },
    },
  });
};
