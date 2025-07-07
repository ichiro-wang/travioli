import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { AuthService } from "../../services/auth.service.js";
import prisma from "../../db/prisma.js";
import bcrypt from "bcryptjs";
import { User } from "../../generated/client/index.js";

vi.mock("../../db/prisma.js", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock("bcryptjs", () => ({
  default: {
    genSalt: vi.fn(),
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

const mockPrismaUserFindUnique = prisma.user.findUnique as Mock;
const mockPrismaUserCreate = prisma.user.create as Mock;
const mockPrismaUserUpdate = prisma.user.update as Mock;
const mockBcryptGenSalt = bcrypt.genSalt as Mock;
const mockBcryptHash = bcrypt.hash as Mock;
const mockBcryptCompare = bcrypt.compare as Mock;

describe("AuthService unit tests", () => {
  let authService: AuthService;

  const mockUser = {
    id: "1",
    email: "lebronjames@gmail.com",
    username: "lebronjames",
    password: "hashedPassword",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    authService = new AuthService();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("createUser", () => {
    const userData = {
      email: "lebronjames@gmail.com",
      username: "lebronjames",
      password: "password",
    };

    it("should successfully create a new user", async () => {
      // mock that email and username don't exist
      mockPrismaUserFindUnique.mockResolvedValue(null);

      // mock password hashing
      mockBcryptGenSalt.mockResolvedValue("salt");
      mockBcryptHash.mockResolvedValue("hashedPassword");

      // mock user creation
      mockPrismaUserCreate.mockResolvedValue(mockUser);

      const res = await authService.createUser(userData);

      expect(res).toEqual(mockUser);
      expect(mockPrismaUserFindUnique).toHaveBeenCalledTimes(2);
      expect(mockPrismaUserFindUnique).toHaveBeenCalledWith({
        where: { email: "lebronjames@gmail.com" },
      });
      expect(mockPrismaUserFindUnique).toHaveBeenCalledWith({
        where: { username: "lebronjames" },
      });

      expect(mockBcryptGenSalt).toHaveBeenCalledWith(10);
      expect(mockBcryptHash).toHaveBeenCalledWith(userData.password, "salt");

      expect(mockPrismaUserCreate).toHaveBeenCalledWith({
        data: {
          email: "lebronjames@gmail.com",
          username: "lebronjames",
          password: "hashedPassword",
        },
      });
    });

    it("should normalize username to lowercase", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(null);

      mockBcryptGenSalt.mockResolvedValue("salt");
      mockBcryptHash.mockResolvedValue("hashedPassword");

      mockPrismaUserCreate.mockResolvedValue({} as Partial<User>);

      const res = await authService.createUser({ ...userData, username: "LEBRONJAMES" });

      expect(mockPrismaUserFindUnique).toHaveBeenCalledWith({ where: { username: "lebronjames" } });
    });

    it("should throw an error if email already exists", async () => {
      // create user with existing email
      const existingUser = { email: "lebronjames@gmail.com" };

      mockPrismaUserFindUnique.mockResolvedValueOnce(existingUser).mockResolvedValueOnce(null);

      await expect(authService.createUser(userData)).rejects.toThrow(/lebronjames@gmail.com already exists/i);

      expect(mockBcryptGenSalt).not.toHaveBeenCalled();
      expect(mockPrismaUserCreate).not.toHaveBeenCalled();
    });

    it("should throw an error if username already exists", async () => {
      // create user with existing username
      const existingUser = { username: "lebronjames" };

      mockPrismaUserFindUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(existingUser);

      await expect(authService.createUser(userData)).rejects.toThrow(/@lebronjames already exists/i);

      expect(mockBcryptGenSalt).not.toHaveBeenCalled();
      expect(mockPrismaUserCreate).not.toHaveBeenCalled();
    });

    //
  });

  describe("authenticateUser", () => {
    const authData = {
      email: "lebronjames@gmail.com",
      password: "password",
    };

    it("should successfully authenticate user with correct credentials", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(mockUser);
      mockBcryptCompare.mockResolvedValue(true);

      const result = await authService.authenticateUser(authData);

      expect(result).toBe(mockUser);
      expect(mockPrismaUserFindUnique).toHaveBeenCalledWith({
        where: { email: "lebronjames@gmail.com" },
      });
      expect(mockBcryptCompare).toHaveBeenCalledWith("password", "hashedPassword");
    });

    it("should throw error if user not found", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(null);

      await expect(authService.authenticateUser(authData)).rejects.toThrow(/user not found/i);

      expect(mockBcryptCompare).not.toHaveBeenCalled();
    });

    it("should throw error if password incorrect", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(mockUser);
      mockBcryptCompare.mockResolvedValue(false);

      await expect(authService.authenticateUser(authData)).rejects.toThrow(/invalid credentials/i);
    });

    it("should reactivate account if deleted user logs in", async () => {
      mockPrismaUserFindUnique.mockResolvedValue({ ...mockUser, isDeleted: true });
      mockBcryptCompare.mockResolvedValue(true);
      mockPrismaUserUpdate.mockResolvedValue({ ...mockUser, isDeleted: false });

      const result = await authService.authenticateUser(authData);

      expect(result).toEqual({ ...mockUser, isDeleted: false });
      expect(mockPrismaUserUpdate).toHaveBeenCalledWith({
        where: { id: "1" },
        data: { isDeleted: false },
      });
    });

    //
  });

  describe("findUserById", () => {
    it("should return a user when found and not deleted", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(mockUser);

      const result = await authService.findUserById("1");

      expect(result).toEqual(mockUser);
      expect(mockPrismaUserFindUnique).toHaveBeenCalledWith({ where: { id: "1" } });
    });

    it("should return null if user is not found", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(null);

      const result = await authService.findUserById("1");

      expect(result).toBeNull();
    });

    it("should return null if user is deleted", async () => {
      mockPrismaUserFindUnique.mockResolvedValue({ ...mockUser, isDeleted: true });

      const result = await authService.findUserById("1");

      expect(result).toBeNull();
    });

    //
  });

  describe("findUserByUsername", () => {
    it("should return a user when found and not deleted", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(mockUser);

      const result = await authService.findUserByUsername("lebronjames");

      expect(result).toEqual(mockUser);
      expect(mockPrismaUserFindUnique).toHaveBeenCalledWith({
        where: { username: "lebronjames" },
      });
    });

    it("should return null if user is not found", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(null);

      const result = await authService.findUserByUsername("lebronjames");

      expect(result).toBeNull();
    });

    it("should return null if user is deleted", async () => {
      mockPrismaUserFindUnique.mockResolvedValue({ ...mockUser, isDeleted: true });

      const result = await authService.findUserByUsername("lebronjames");

      expect(result).toBeNull();
    });

    //
  });

  describe("findUserByEmail", () => {
    it("should return a user when found and not deleted", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(mockUser);

      // since findUserByEmail is a private method, we need to access it by casting it to 'any' type
      // this works since compiled JS has no private members, it is just a TS thing
      // private technically doesn't actually exist
      const result = await (authService as any).findUserByEmail("lebronjames@gmail.com");

      expect(result).toEqual(mockUser);
      expect(mockPrismaUserFindUnique).toHaveBeenCalledWith({
        where: { email: "lebronjames@gmail.com" },
      });
    });

    it("should return null if user is not found", async () => {
      mockPrismaUserFindUnique.mockResolvedValue(null);

      const result = await (authService as any).findUserByEmail("lebronjames@gmail.com");

      expect(result).toBeNull();
    });

    it("should return null if user is deleted", async () => {
      mockPrismaUserFindUnique.mockResolvedValue({ ...mockUser, isDeleted: true });

      const result = await (authService as any).findUserByEmail("lebronjames@gmail.com");

      // findUserByEmail doesn't return null even if the user is deleted
      // this is so deleted users who log back in can be automatically reactivated
      expect(result).toEqual(mockUser);
    });

    //
  });

  describe("verifyPassword", () => {
    it("should return true for correct password", async () => {
      mockBcryptCompare.mockResolvedValue(true);

      const result = await authService.verifyPassword("password", "hashedPassword");

      expect(result).toBe(true);
      expect(mockBcryptCompare).toHaveBeenCalledWith("password", "hashedPassword");
    });

    it("should return false for incorrect password", async () => {
      mockBcryptCompare.mockResolvedValue(false);

      const result = await authService.verifyPassword("wrongpassword", "hashedPassword");

      expect(result).toBe(false);
      expect(mockBcryptCompare).toHaveBeenCalledWith("wrongpassword", "hashedPassword");
    });

    //
  });

  describe("error handling", () => {
    it("should handle database errors in createUser", async () => {
      const userData = {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      };

      mockPrismaUserFindUnique.mockRejectedValue(new Error("Database error"));

      await expect(authService.createUser(userData)).rejects.toThrow("Database error");
    });

    it("should handle bcrypt errors", async () => {
      mockBcryptCompare.mockRejectedValue(new Error("Bcrypt error"));

      await expect(authService.verifyPassword("password", "hash")).rejects.toThrow("Bcrypt error");
    });
  });
});
