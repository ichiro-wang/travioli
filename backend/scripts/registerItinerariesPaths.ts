import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  createItinerarySchema,
  fullItineraryResponse,
  getItinerarySchema,
  updateItinerarySchema,
} from "../src/schemas/itineraries.schema.js";
import {
  errorMessageResponse,
  internalServerErrorResponse,
} from "./responses.js";

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
            schema: fullItineraryResponse,
          },
        },
      },
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/itineraries/{id}",
    description: "Get an itinerary via id",
    request: {
      params: getItinerarySchema.shape.params,
    },
    responses: {
      200: {
        description: "Got itinerary",
        content: {
          "application/json": {
            schema: fullItineraryResponse,
          },
        },
      },
      403: errorMessageResponse("No permission to view this itinerary"),
      404: errorMessageResponse("Itinerary not found"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "patch",
    path: "/itineraries/{id}",
    description: "Update an itinerary",
    request: {
      params: updateItinerarySchema.shape.params,
      body: {
        content: {
          "application/json": {
            schema: updateItinerarySchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successful update",
        content: {
          "application/json": {
            schema: fullItineraryResponse,
          },
        },
      },
    },
  });
};
