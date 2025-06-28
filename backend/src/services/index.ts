import { AuthService } from "./auth.service.js";
import { UserService } from "./user.service.js";

const authService = new AuthService();
const userService = new UserService(authService);

export { authService, userService };
