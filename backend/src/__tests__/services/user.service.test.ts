import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { UserService } from "../../services/user.service.js";
import { AuthService } from "../../services/auth.service.js";
import { FollowStatus, User } from "../../generated/client/index.js";
import prisma from "../../db/prisma.js";

vi.mock("../../db/prisma.js", () => ({
  default: {
    user: {
      update: vi.fn(),
    },
    follows: {
      count: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("../../utils/sanitizeUser.js", () => ({
  sanitizeUser: vi.fn((user, isSelf) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    bio: user.bio,
    ...(isSelf && { email: user.email }),
  })),
}));

const mockPrismaUserUpdate = prisma.user.update as Mock;
const mockPrismaFollowsCount = prisma.follows.count as Mock;
const mockPrismaFollowsFindUnique = prisma.follows.findUnique as Mock;
const mockAuthServiceFindUserByUsername = vi.fn() as Mock;
const mockAuthServiceFindUserById = vi.fn() as Mock;
const mockAuthServiceVerifyPassword = vi.fn() as Mock;

describe("UserService unit tests", () => {
  let userService: UserService;
  let mockAuthService: AuthService;

  const mockUser = {
    id: "1",
    email: "lebronjames@gmail.com",
    username: "lebronjames",
    name: "LeBron James",
    bio: "Los Angeles Lakers",
    password: "hashedPassword",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  const mockTargetUser = {
    id: "2",
    email: "bronnyjames@gmail.com",
    username: "bronnyjames",
    name: "Bronny James",
    bio: "California",
    password: "hashedPassword",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockAuthService = {
      findUserByUsername: mockAuthServiceFindUserByUsername,
      findUserById: mockAuthServiceFindUserById,
      verifyPassword: mockAuthServiceVerifyPassword,
    } as any;

    userService = new UserService(mockAuthService);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("checkUsernameAvailability", () => {
    it("should return unavailable with reason 'current' when username matches current user", async () => {
      const result = await userService.checkUsernameAvailability("lebronjames", "lebronjames");

      expect(result).toEqual({
        available: false,
        reason: "current",
      });
      expect(mockAuthServiceFindUserByUsername).not.toHaveBeenCalled();
    });

    it("should normalize username to lowercase", async () => {
      mockAuthServiceFindUserByUsername.mockResolvedValue(null);

      await userService.checkUsernameAvailability("LeBronJames", "currentuser");

      expect(mockAuthServiceFindUserByUsername).toHaveBeenCalledWith("lebronjames");
    });

    it("should return unavailable with reason 'taken' when username already exists", async () => {
      mockAuthServiceFindUserByUsername.mockResolvedValue(mockTargetUser);

      const result = await userService.checkUsernameAvailability("existinguser", "lebronjames");

      expect(result).toEqual({
        available: false,
        reason: "taken",
      });
      expect(mockAuthServiceFindUserByUsername).toHaveBeenCalledWith("existinguser");
    });

    it("should return available when username is not taken", async () => {
      mockAuthServiceFindUserByUsername.mockResolvedValue(null);

      const result = await userService.checkUsernameAvailability("newuser", "lebronjames");

      expect(result).toEqual({
        available: true,
        reason: null,
      });
      expect(mockAuthServiceFindUserByUsername).toHaveBeenCalledWith("newuser");
    });

    //
  });

  describe("getUserProfileData", () => {
    beforeEach(() => {
      mockPrismaFollowsCount.mockResolvedValue(5);
      mockPrismaFollowsFindUnique.mockResolvedValue({
        status: FollowStatus.accepted,
      });
    });

    it("should return profile data for current user (self)", async () => {
      const result = await userService.getUserProfileData(mockUser.id, mockUser);

      expect(result.user.id).toBe(mockUser.id);
      expect(result.user.username).toBe(mockUser.username);
      expect(result.isSelf).toBe(true);
      expect(result.followedByCount).toBe(5);
      expect(result.followingCount).toBe(5);
      expect(result).not.toHaveProperty("followStatus");
      expect(mockAuthServiceFindUserById).not.toHaveBeenCalled();
    });

    it("should return profile data for another user", async () => {
      mockAuthServiceFindUserById.mockResolvedValue(mockTargetUser);

      const result = await userService.getUserProfileData(mockTargetUser.id, mockUser);

      expect(result.user.id).toBe(mockTargetUser.id);
      expect(result.user.username).toBe(mockTargetUser.username);
      expect(result.isSelf).toBe(false);
      expect(result.followedByCount).toBe(5);
      expect(result.followingCount).toBe(5);
      expect(result.followStatus).toBe(FollowStatus.accepted); // check beforeEach to see that we set this to accepted
      expect(mockAuthServiceFindUserById).toHaveBeenCalledWith(mockTargetUser.id);
    });

    it("should throw error when target user is not found", async () => {
      mockAuthServiceFindUserById.mockResolvedValue(null);

      await expect(userService.getUserProfileData("nonexistent", mockUser)).rejects.toThrow(
        /user not found/i
      );
    });

    it("should return notFollowing status when no follow relationship exists", async () => {
      mockAuthServiceFindUserById.mockResolvedValue(mockTargetUser);
      mockPrismaFollowsFindUnique.mockResolvedValue(null);

      const result = await userService.getUserProfileData(mockTargetUser.id, mockUser);

      expect(result.followStatus).toBe(FollowStatus.notFollowing);
      expect(mockPrismaFollowsFindUnique).toHaveBeenCalledWith({
        where: {
          followedById_followingId: {
            followedById: mockUser.id,
            followingId: mockTargetUser.id,
          },
        },
        select: { status: true },
      });
    });

    it("should count followers and following correctly", async () => {
      mockAuthServiceFindUserById.mockResolvedValue(mockTargetUser);
      mockPrismaFollowsCount.mockResolvedValueOnce(10).mockResolvedValueOnce(15);

      const result = await userService.getUserProfileData(mockTargetUser.id, mockUser);

      expect(result.followedByCount).toBe(10);
      expect(result.followingCount).toBe(15);
      expect(mockPrismaFollowsCount).toHaveBeenCalledWith({
        where: { followedById: mockTargetUser.id, status: FollowStatus.accepted },
      });
      expect(mockPrismaFollowsCount).toHaveBeenCalledWith({
        where: { followingId: mockTargetUser.id, status: FollowStatus.accepted },
      });
    });

    //
  });

  describe("updateUserProfile", () => {
    const updatedFields = {
      name: "Updated Name",
      username: "updateduser",
      bio: "Updated bio",
    };

    it("should update user profile with filtered changes", async () => {
      const updatedUser = { ...mockUser, ...updatedFields };
      mockPrismaUserUpdate.mockResolvedValue(updatedUser);

      const result = await userService.updateUserProfile(mockUser, updatedFields);

      expect(mockPrismaUserUpdate).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          name: "Updated Name",
          username: "updateduser",
          bio: "Updated bio",
        },
      });
      expect(result.name).toBe("Updated Name");
      expect(result.username).toBe("updateduser");
      expect(result.bio).toBe("Updated bio");
    });

    it("should normalize username to lowercase", async () => {
      const updatedUser = { ...mockUser, username: "newusername" };
      mockPrismaUserUpdate.mockResolvedValue(updatedUser);

      await userService.updateUserProfile(mockUser, {
        username: "NewUserName",
      });

      expect(mockPrismaUserUpdate).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          username: "newusername",
        },
      });
    });

    it("should return sanitized current user when no changes are made", async () => {
      const result = await userService.updateUserProfile(mockUser, {
        name: mockUser.name as string,
        username: mockUser.username,
        bio: mockUser.bio as string,
      });

      expect(mockPrismaUserUpdate).not.toHaveBeenCalled();
      expect(result.id).toBe(mockUser.id);
      expect(result.username).toBe(mockUser.username);
      expect(result.name).toBe(mockUser.name);
      expect(result.bio).toBe(mockUser.bio);
    });

    it("should filter out unchanged fields", async () => {
      const updatedUser = { ...mockUser, name: "New Name" };
      mockPrismaUserUpdate.mockResolvedValue(updatedUser);

      await userService.updateUserProfile(mockUser, {
        name: "New Name",
        username: mockUser.username, // same as current
        bio: mockUser.bio as string, // same as current
      });

      expect(mockPrismaUserUpdate).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          name: "New Name",
        },
      });
    });

    it("should not update if all fields are undefined", async () => {
      const result = await userService.updateUserProfile(mockUser, {
        name: undefined,
        username: undefined,
        bio: undefined,
      });

      expect(mockPrismaUserUpdate).not.toHaveBeenCalled();
      expect(result.id).toBe(mockUser.id);
      expect(result.username).toBe(mockUser.username);
      expect(result.name).toBe(mockUser.name);
      expect(result.bio).toBe(mockUser.bio);
    });

    it("should update even with some missing fields", async () => {
      const updatedUser = { ...mockUser, name: "New name" };
      mockPrismaUserUpdate.mockResolvedValue(updatedUser);

      const result = await userService.updateUserProfile(mockUser, {
        name: "New name",
      });

      expect(mockPrismaUserUpdate).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          name: "New name",
        },
      });
      expect(result.id).toBe(mockUser.id);
      expect(result.username).toBe(mockUser.username);
      expect(result.name).toBe("New name");
      expect(result.bio).toBe(mockUser.bio);
    });

    //
  });

  describe("softDeleteUser", () => {
    const inputPassword = "inputpassword";
    const hashedPassword = "hashedpassword";

    it("should soft delete user with correct password", async () => {
      mockAuthServiceVerifyPassword.mockResolvedValue(true);
      const deletedUser = { ...mockUser, isDeleted: true };
      mockPrismaUserUpdate.mockResolvedValue(deletedUser);

      const result = await userService.softDeleteUser(mockUser.id, inputPassword, hashedPassword);

      expect(mockAuthServiceVerifyPassword).toHaveBeenCalledWith(inputPassword, hashedPassword);
      expect(mockPrismaUserUpdate).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { isDeleted: true },
      });
      expect(result.id).toBe(mockUser.id);
    });

    it("should throw error with incorrect password", async () => {
      mockAuthServiceVerifyPassword.mockResolvedValue(false);

      await expect(
        userService.softDeleteUser(mockUser.id, "wrongpassword", hashedPassword)
      ).rejects.toThrow(/invalid credentials/i);

      expect(mockPrismaUserUpdate).not.toHaveBeenCalled();
    });

    //
  });

  describe("error handling", () => {
    it("should handle database errors in getUserProfileData", async () => {
      mockAuthServiceFindUserById.mockRejectedValue(new Error("Database error"));

      await expect(userService.getUserProfileData("userid", mockUser)).rejects.toThrow(
        /database error/i
      );
    });

    it("should handle database errors in updateUserProfile", async () => {
      mockPrismaUserUpdate.mockRejectedValue(new Error("Database error"));

      await expect(userService.updateUserProfile(mockUser, { name: "New Name" })).rejects.toThrow(
        /database error/i
      );
    });

    it("should handle auth service errors in checkUsernameAvailability", async () => {
      mockAuthServiceFindUserByUsername.mockRejectedValue(new Error("Auth error"));

      await expect(userService.checkUsernameAvailability("username", "current")).rejects.toThrow(
        /auth error/i
      );
    });

    //
  });
});
