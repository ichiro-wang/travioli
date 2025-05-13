// for checking whether the token was created from a refresh token or through authenticating 
export type TokenType = "ACCESS" | "REFRESH"

// defining what goes in the jwt payload
export interface DecodedToken extends JwtPayload {
  userId: string;
  tokenType: TokenType;
}

// allow user in requests
declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
    }
  }
}
