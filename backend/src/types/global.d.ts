import { User } from "../generated/client/index.js";
import { JwtPayload } from "jsonwebtoken";

export type TokenType = "access" | "refresh";

/**
 * check whether a token was generated via refresh or via login/signup
 * this allows us to flag sensitive operations such as delete-account, change-password, etc.
 */
export type TokenSource = "credentials" | "refresh";

// defining what goes in the jwt payload
export interface DecodedToken extends JwtPayload {
  userId: string;
  type: TokenType;
  source: TokenSource;
  jti: string;
}

// allow user and JWT cookie in requests
declare global {
  namespace Express {
    interface Request {
      user: User;
      tokenSource: TokenSource;
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
