import { TokenType } from "../types/global.js";

export class NoSecretKeyError extends Error {
  constructor(tokenType: TokenType) {
    super(`No ${tokenType} token secret key provided`);
  }
}

export class NoTokenProvidedError extends Error {
  constructor(tokenType: TokenType) {
    super(`Unauthorized - No ${tokenType} token provided`);
  }
}
