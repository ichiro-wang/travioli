import { User } from "../generated/client/index.js";
import { FilteredUser } from "../types/global.js";

/**
 * remove sensitive/unnecessary data from User object
 * @returns the User object filtered to include what should be shown in profile
 */
export const filterUser = (user: User, includeEmail = false): FilteredUser => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    bio: user.bio,
    profilePic: user.profilePic,
    isPrivate: user.isPrivate,
    email: includeEmail ? user.email : null,
  };
};
