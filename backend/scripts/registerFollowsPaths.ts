import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  followUserResponseSchema,
  followUserSchema,
  getFollowListSchema,
  getFollowRequestsResponseSchema,
  getFollowStatusResponseSchema,
  getFollowStatusSchema,
  updateFollowStatusResponseSchema,
  updateFollowStatusSchema,
} from "../src/schemas/follows.schema.js";
import {
  errorMessageResponse,
  internalServerErrorResponse,
} from "./responses.js";

export const registerFollowsPaths = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/follows/{id}",
    description: "Follow a user",
    request: {
      params: followUserSchema.shape.params,
    },
    responses: {
      200: {
        description: "Successfully followed",
        content: {
          "application/json": {
            schema: followUserResponseSchema,
          },
        },
      },
      201: {
        description: "Successfully followed",
        content: {
          "application/json": {
            schema: followUserResponseSchema,
          },
        },
      },
      400: errorMessageResponse("Error following user"),
      404: errorMessageResponse("Error following user: User not found"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/follows/{id}/status",
    description: "Check follow status with this user",
    request: {
      params: getFollowStatusSchema.shape.params,
    },
    responses: {
      200: {
        description: "Successfully retrieved",
        content: {
          "application/json": { schema: getFollowStatusResponseSchema },
        },
      },
      400: errorMessageResponse("Error checking follow status"),
      404: errorMessageResponse(
        "Error checking follow status: User does not exist"
      ),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "patch",
    path: "/follows/{id}/status",
    description: "Updated follow status of user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: updateFollowStatusSchema.shape.body,
          },
        },
      },
      params: updateFollowStatusSchema.shape.params,
    },
    responses: {
      200: {
        description: "Successfully updated follow status",
        content: {
          "application/json": {
            schema: updateFollowStatusResponseSchema,
          },
        },
      },
      400: errorMessageResponse("Error updating follow status"),
      404: errorMessageResponse(
        "Error updating follow status: No follow relationship exists"
      ),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/follows/{id}/{type}",
    description: "Get following or follower list of a user",
    request: {
      params: getFollowListSchema.shape.params,
    },
    responses: {
      200: {
        description: "Successfully retrieved follow list",
        content: {
          "application/json": {
            schema: getFollowStatusResponseSchema,
          },
        },
      },
      400: errorMessageResponse("Error retrieving following or follower list"),
      403: errorMessageResponse(
        "Error retrieving following or follower list: User is private"
      ),
      404: errorMessageResponse(
        "Error retrieving following or follower list: User does not exist"
      ),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/follows/requests",
    description: "Get follow requests",
    responses: {
      200: {
        description: "Successfully retrieved requests",
        content: {
          "application/json": {
            schema: getFollowRequestsResponseSchema,
          },
        },
      },
      400: errorMessageResponse("Error retrieving requests"),
      500: internalServerErrorResponse,
    },
  });
};
