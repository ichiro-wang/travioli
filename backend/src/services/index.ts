import { AuthService } from "./auth.service.js";
import { RedisService } from "./redis.service.js";
import { PermissionService } from "./permission.service.js";
import { FollowService } from "./follow.service.js";
import { UserService } from "./user.service.js";

// creating services here once, then importing in files where needed

export const authService = new AuthService();
export const redisService = new RedisService();
await redisService.connect();

export const permissionService = new PermissionService(authService);
export const followService = new FollowService(authService);
export const userService = new UserService(authService, followService);
