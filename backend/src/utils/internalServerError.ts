import { Response } from "express";

/* 
helper function for handling internal server errors to avoid repetition
error is unknown type since it comes from the Try-Catch Block 
*/
const internalServerError = (location: string, error: unknown, res: Response) => {
  let errorMessage: string;
  if (error instanceof Error) {
    errorMessage = error.message;
    console.error(error.stack);
  } else {
    errorMessage = "Unknown error";
    console.error("Unknown error object:", error);
  }

  console.error(`Error in ${location.toLowerCase()}:`, errorMessage);

  res.status(500).json({
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { error: errorMessage }),
  });
};

export default internalServerError;
