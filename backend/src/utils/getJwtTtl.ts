import jwt, { JwtPayload } from "jsonwebtoken";
import { DecodedToken } from "../types/global.js";

/**
 * check the time-to-live of a given jwt token in seconds. 
 * returns null if invalid or no expiry
 */
export const getJwtTtl = (token: DecodedToken): number | null => {
  try {
    if (!token.exp) {
      return null;
    }

    const expiryTime = token.exp;
    const now = Math.floor(Date.now() / 1000);

    const ttl = expiryTime - now;
    
    return ttl > 0 ? ttl : 0;
  } catch (error: unknown) {
    return null;
  }
};
