import { Prisma } from "@prisma/client";
import { User } from "../generated/client/index.js";
import { z } from "zod";

// for checking whether the token was created from a refresh token or through authenticating
export type TokenType = "access" | "refresh";

// defining what goes in the jwt payload
export interface DecodedToken extends JwtPayload {
  userId: string;
  tokenType: TokenType;
}

// allow user and JWT cookie in requests
declare global {
  namespace Express {
    interface Request {
      user: User;
      tokenType: TokenType;
    }
  }
}

export interface FilteredUser {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  profilePic: string;
  isPrivate: boolean;
  email: string | null;
}

