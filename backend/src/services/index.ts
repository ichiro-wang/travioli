import { AuthService } from "./auth.service.js";
import { FollowService } from "./follow.service.js";
import { PermissionService } from "./permission.service.js";
import { UserService } from "./user.service.js";

// creating services here once, then importing in files where needed
// dependency injection

const authService = new AuthService();
const permissionService = new PermissionService(authService);
const followService = new FollowService(authService);
const userService = new UserService(authService, followService);

export { authService, permissionService, userService, followService };
