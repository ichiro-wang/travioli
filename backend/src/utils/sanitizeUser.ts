import { User } from "../generated/client/index.js";
import { SanitizedUser } from "../types/global.js";

/**
 * remove data from User object such as password, createdAt, etc
 * @param user the User object
 * @param includeEmail whether to include email in sanitized User object or not
 * @returns the sanitized User object: id, username, name, bio, profilePic, email (if includeEmail is true)
 */
export const sanitizeUser = (user: User, includeEmail = false): SanitizedUser => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    bio: user.bio,
    profilePic: user.profilePic,
    isPrivate: user.isPrivate,
    ...(includeEmail ? { email: user.email } : { email: null }),
  };
};
