import { AuthService } from "./auth.service.js";
import { RedisService } from "./redis.service.js";
import { PermissionService } from "./permission.service.js";
import { FollowService } from "./follows.service.js";
import { UserService } from "./users.service.js";
import { ItineraryService } from "./itineraries.service.js";
import { EmailService } from "./email.service.js";

// creating services here once, then importing in files where needed

export const emailService = new EmailService();
export const redisService = new RedisService();
export const itineraryService = new ItineraryService();
export const authService = new AuthService(emailService, redisService);
export const permissionService = new PermissionService(authService);
export const followService = new FollowService(authService);
export const userService = new UserService(
  authService,
  followService,
  redisService
);

await redisService.connect();
