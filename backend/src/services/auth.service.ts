export class UserService {
  async checkUsernameAvailability(
    username: string,
    currentUserUsername: string
  ): Promise<{ available: boolean; reason: "current" | "taken" | null }> {
    const normalizedUsername = username.toLowerCase();

    if (normalizedUsername === currentUserUsername.toLowerCase()) {
      return { available: false, reason: "current" };
    }
    
    
  }
}
