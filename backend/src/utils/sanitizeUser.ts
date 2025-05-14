import { User } from "../generated/client/index.js";

/**
 * remove data from User object such as password, createdAt, etc
 * @param user the User object
 * @param includeEmail whether to include email in sanitized User object or not
 * @returns the sanitized User object: id, username, name, bio, profilePic, email (if includeEmail is true)
 */
const sanitizeUser = (user: User, includeEmail = false): Partial<User> => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    bio: user.bio,
    profilePic: user.profilePic,
    ...(includeEmail && { email: user.email }),
  };
};

export default sanitizeUser;
