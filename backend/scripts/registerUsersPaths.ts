import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  checkUsernameResponseSchema,
  checkUsernameSchema,
  deleteAccountResponseSchema,
  deleteAccountSchema,
  getProfileResponseSchema,
  getProfileSchema,
  getUserItinerariesResponseSchema,
  getUserItinerariesSchema,
  updateProfileResponseSchema,
  updateProfileSchema,
} from "../src/schemas/users.schemas.js";
import {
  errorMessageResponse,
  internalServerErrorResponse,
} from "./responses.js";

export const registerUsersPaths = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/users/check-username",
    description: "Check if a username is available",
    request: {
      query: checkUsernameSchema.shape.query,
    },
    responses: {
      200: {
        description: "Username is available",
        content: {
          "application/json": { schema: checkUsernameResponseSchema },
        },
      },
      400: errorMessageResponse("Check-Username failed"),
      409: {
        description: "Username taken, or already yours",
        content: {
          "application/json": { schema: checkUsernameResponseSchema },
        },
      },
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/users/{id}/itineraries",
    description: "Get the itineraries of a user",
    request: {
      params: getUserItinerariesSchema.shape.params,
      query: getUserItinerariesSchema.shape.query,
    },
    responses: {
      200: {
        description: "Retrieved index N of user's itineraries",
        content: {
          "application/json": {
            schema: getUserItinerariesResponseSchema,
          },
        },
      },
      400: errorMessageResponse("Error fetching user's itineraries"),
      403: errorMessageResponse(
        "Cannot view user's itineraries as their account is private"
      ),
      404: errorMessageResponse("This user was not found"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/users/{id}",
    description: "Get User Profile",
    request: {
      params: getProfileSchema.shape.params,
    },
    responses: {
      200: {
        description: "User profile retrieved",
        content: { "application/json": { schema: getProfileResponseSchema } },
      },
      400: errorMessageResponse("Error retrieving user profile"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "patch",
    path: "/users/me",
    description: "Update own profile",
    request: {
      body: {
        content: {
          "application/json": { schema: updateProfileSchema.shape.body },
        },
      },
    },
    responses: {
      200: {
        description: "Successfully updated",
        content: {
          "application/json": { schema: updateProfileResponseSchema },
        },
      },
      400: errorMessageResponse("Error in updating profile"),
      409: errorMessageResponse("Username already taken"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "delete",
    path: "/users/me",
    description: "Soft delete own account",
    request: {
      body: {
        content: {
          "application/json": { schema: deleteAccountSchema.shape.body },
        },
      },
    },
    responses: {
      200: {
        description: "Successfully (soft) deleted account",
        content: {
          "application/json": { schema: deleteAccountResponseSchema },
        },
      },
      400: errorMessageResponse("Error deleting account"),
      500: internalServerErrorResponse,
    },
  });
};
