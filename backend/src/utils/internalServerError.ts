import { Response } from "express";

/**
 * helper function for handling internal server errors
 * @param error simply pass in the Error object that was caught
 * @param res simply pass in the Response object from the controller
 * @param location where the error occured
 */
export const internalServerError = (error: unknown, res: Response, location?: string) => {
  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
    console.error(error.stack);
  } else {
    errorMessage = "Unknown error";
    console.error("Unknown error object:", error);
  }

  const errorLocation = location || "controller";
  console.error(`Error in ${errorLocation}:`, errorMessage);

  res.status(500).json({
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { error: errorMessage }),
  });
};
