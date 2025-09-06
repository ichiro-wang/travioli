import { TokenType } from "../types/global.js";

export class NoSecretKeyError extends Error {
  constructor(tokenType: TokenType) {
    super(`No ${tokenType} token secret key provided (Server side error)`);
  }
}

export class NoTokenProvidedError extends Error {
  constructor(tokenType: TokenType) {
    super(`Unauthorized - No ${tokenType} token provided`);
  }
}

export class InvalidTokenTypeError extends Error {
  constructor() {
    super(`Invalid token type`);
  }
}

export class InvalidRefreshTokenError extends Error {
  constructor() {
    super("Invalid refresh token provided");
  }
}
