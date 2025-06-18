import { Response } from "express";

/**
 * helper function for handling internal server errors
 * @param error simply pass in the Error object that was caught
 * @param res simply pass in the Response object from the controller
 */
export const internalServerError = (error: unknown, res: Response) => {
  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
    console.error(error.stack);
  } else {
    errorMessage = "Unknown error";
    console.error("Unknown error object:", error);
  }

  const location = internalServerError.caller.name; // get function name of where the error occured
  console.error(`Error in ${location.toLowerCase()}:`, errorMessage);

  res.status(500).json({
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { error: errorMessage }),
  });
};
