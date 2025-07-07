import { User } from "../generated/client/index.js";
import { FilteredUser } from "../types/global.js";

/**
 * remove sensitive/unnecessary data from User object
 * @returns the filtered User object
 */
export const filterUser = (user: User, includeEmail = false): FilteredUser => {
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
