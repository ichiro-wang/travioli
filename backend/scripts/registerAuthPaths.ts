import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  loginResponseSchema,
  loginSchema,
  resendVerificationEmailSchema,
  signupSchema,
  verifyEmailSchema,
} from "../src/schemas/auth.schemas.js";
import {
  errorMessageResponse,
  genericMessageResponse,
  internalServerErrorResponse,
} from "./responses.js";

export const registerAuthPaths = (registry: OpenAPIRegistry): void => {
  registry.registerPath({
    method: "post",
    path: "/auth/signup",
    description: "Signup a user",
    request: {
      body: {
        content: {
          "application/json": { schema: signupSchema.shape.body },
        },
      },
    },
    responses: {
      201: genericMessageResponse(
        "User created, check email to complete signup"
      ),
      400: errorMessageResponse("Signup failed"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "post",
    path: "/auth/login",
    description: "Login a user",
    request: {
      body: {
        content: {
          "application/json": { schema: loginSchema.shape.body },
        },
      },
    },
    responses: {
      200: {
        description: "User successfully logged in",
        content: {
          "application/json": {
            schema: loginResponseSchema,
          },
        },
      },
      400: errorMessageResponse("Login failed"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "post",
    path: "/auth/logout",
    description: "Logout a user",
    responses: {
      200: genericMessageResponse("User successfully logged in"),
      400: errorMessageResponse(
        "Logout failed: No refresh token secret key. This is a problem with environment variable not being set on backend."
      ),
      401: errorMessageResponse(
        "Logout failed: Invalid token type, This is a problem with an access token being attached as a 'refreshToken'."
      ),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/auth/verify-email",
    description: "Verify email",
    request: {
      query: verifyEmailSchema.shape.query,
    },
    responses: {
      200: genericMessageResponse("Email successfully verified"),
      404: errorMessageResponse("Invalid verification token provided"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "post",
    path: "/auth/resend-verification-email",
    description: "Resend verification email",
    request: {
      body: {
        content: {
          "application/json": {
            schema: resendVerificationEmailSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: genericMessageResponse(
        `Verification email resent. The email is only sent in the case that the email exists and is pending verification. If the email does not exist or is already verified, no email is sent. Response message are same in all cases.`
      ),
      400: errorMessageResponse("Error in sending email"),
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/auth/me",
    description: "Get me",
    responses: {
      200: {
        description: "Successfully got self",
        content: {
          "application/json": {
            schema: loginResponseSchema,
          },
        },
      },
      500: internalServerErrorResponse,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/auth/refresh",
    description: "Refresh JWT",
    responses: {
      200: genericMessageResponse("Successfully refreshed token"),
      400: errorMessageResponse(
        "No refresh token secret key. This is a problem with environment variable not being set on backend."
      ),
      500: internalServerErrorResponse,
    },
  });
};
