import { Response } from "express";

export const invalidCredentialsResponse = (res: Response, message = "Invalid credentials") => {
  res.status(400).json({ message });
};

export const userNotFoundResponse = (res: Response, message = "User not found") => {
  res.status(404).json({ message });
};
