import { Prisma } from "@prisma/client";
import { User } from "../generated/client/index.js";

// for checking whether the token was created from a refresh token or through authenticating
export type TokenType = "access" | "refresh";

// export type FollowStatus = "accepted" | "pending" | "rejected";

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

export interface FollowedBy {
  followedBy: User;
}
export interface Following {
  following: User;
}

export interface SanitizedUser {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  profilePic: string;
  isPrivate: boolean;
  email: string | null;
}
