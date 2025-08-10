import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { FollowService } from "../../services/follows.service.js";
import { AuthService } from "../../services/auth.service.js";
import prisma from "../../db/prisma.js";
import { FollowStatus, Follows, User } from "../../generated/client/index.js";
import { FollowAction, FollowRelation } from "../../types/types.js";
import {
  FollowSelfError,
  FollowUserError,
  InvalidUpdateStatusActionError,
  NoFollowRelationshipError,
} from "../../errors/follow.errors.js";
import { UserNotFoundError } from "../../errors/auth.errors.js";

vi.mock("../../db/prisma.js", () => ({
  default: {
    follows: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
  },
}));

const mockPrismaFollowsFindMany = prisma.follows.findMany as Mock;
const mockPrismaFollowsFindUnique = prisma.follows.findUnique as Mock;
const mockPrismaFollowsCreate = prisma.follows.create as Mock;
const mockPrismaFollowsUpdate = prisma.follows.update as Mock;
const mockPrismaFollowsCount = prisma.follows.count as Mock;

const mockAuthServiceFindUserById = vi.fn() as Mock;

describe("FollowService unit tests", () => {
  let followService: FollowService;
  let mockAuthService: AuthService;

  const mockUser = {
    id: "user1",
    email: "user1@example.com",
    username: "user1",
    password: "hashedPassword",
    isDeleted: false,
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTargetUser = {
    id: "user2",
    email: "user2@example.com",
    username: "user2",
    password: "hashedPassword",
    isDeleted: false,
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  const mockPrivateUser = {
    ...mockTargetUser,
    isPrivate: true,
  } as User;

  const mockFollow = {
    followedById: "user1",
    followingId: "user2",
    status: FollowStatus.accepted,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Follows;

  beforeEach(() => {
    mockAuthService = {
      findUserById: mockAuthServiceFindUserById,
    } as any;

    followService = new FollowService(mockAuthService);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getFollowList", () => {
    it("should return followedBy list with correct pagination", async () => {
      const mockFollowList = [
        { ...mockFollow, followedBy: mockUser },
        { ...mockFollow, followedBy: { ...mockUser, id: "user3" } },
      ];

      mockPrismaFollowsFindMany.mockResolvedValue(mockFollowList);

      const result = await followService.getFollowList(
        "user2",
        FollowRelation.followedBy,
        0
      );

      expect(result.users).toHaveLength(2);
      expect(result.hasMore).toBe(false);
      expect(mockPrismaFollowsFindMany).toHaveBeenCalledWith({
        where: { followingId: "user2", status: FollowStatus.accepted },
        include: { followedBy: true },
        orderBy: { updatedAt: "desc" },
        skip: 0,
        take: 21,
      });
    });

    it("should return following list with correct pagination", async () => {
      const mockFollowList = [{ ...mockFollow, following: mockTargetUser }];

      mockPrismaFollowsFindMany.mockResolvedValue(mockFollowList);

      const result = await followService.getFollowList(
        "user1",
        FollowRelation.following,
        0
      );

      expect(result.users).toHaveLength(1);
      expect(result.hasMore).toBe(false);
      expect(mockPrismaFollowsFindMany).toHaveBeenCalledWith({
        where: { followedById: "user1", status: FollowStatus.accepted },
        include: { following: true },
        orderBy: { updatedAt: "desc" },
        skip: 0,
        take: 21,
      });
    });

    it("should handle pagination correctly with hasMore true", async () => {
      // create 21 mock follows (one more than page size)
      const mockFollowList = Array.from({ length: 21 }, (_, i) => ({
        ...mockFollow,
        followedBy: { ...mockUser, id: `user${i}` },
      }));

      mockPrismaFollowsFindMany.mockResolvedValue(mockFollowList);

      const result = await followService.getFollowList(
        "user2",
        FollowRelation.followedBy,
        0
      );

      expect(result.users).toHaveLength(20);
      expect(result.hasMore).toBe(true);
    });

    it("should calculate offset correctly for different load indices", async () => {
      mockPrismaFollowsFindMany.mockResolvedValue([]);

      await followService.getFollowList("user1", FollowRelation.following, 2);

      expect(mockPrismaFollowsFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 40, // 2 * 20
        })
      );
    });
  });

  describe("followUser", () => {
    beforeEach(() => {
      (mockAuthService.findUserById as Mock).mockResolvedValue(mockTargetUser);
    });

    it("should throw error when trying to follow self", async () => {
      await expect(followService.followUser("user1", "user1")).rejects.toThrow(
        FollowSelfError
      );
    });

    it("should throw error when target user not found", async () => {
      (mockAuthService.findUserById as Mock).mockResolvedValue(null);

      await expect(followService.followUser("user1", "user2")).rejects.toThrow(
        UserNotFoundError
      );
    });

    it("should create new follow relationship for public user", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue(null);
      mockPrismaFollowsCreate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted,
      });

      const result = await followService.followUser("user1", "user2");

      expect(result.isNewRelationship).toBe(true);
      expect(result.follow.status).toBe(FollowStatus.accepted);
      expect(mockPrismaFollowsCreate).toHaveBeenCalledWith({
        data: {
          followedById: "user1",
          followingId: "user2",
          status: FollowStatus.accepted,
        },
      });
    });

    it("should create pending follow relationship for private user", async () => {
      (mockAuthService.findUserById as Mock).mockResolvedValue(mockPrivateUser);
      mockPrismaFollowsFindUnique.mockResolvedValue(null);
      mockPrismaFollowsCreate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.pending,
      });

      const result = await followService.followUser("user1", "user2");

      expect(result.follow.status).toBe(FollowStatus.pending);
      expect(mockPrismaFollowsCreate).toHaveBeenCalledWith({
        data: {
          followedById: "user1",
          followingId: "user2",
          status: FollowStatus.pending,
        },
      });
    });

    it("should throw error if already following", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted,
      });

      await expect(followService.followUser("user1", "user2")).rejects.toThrow(
        new FollowUserError("You already follow this user")
      );
    });

    it("should throw error if follow request already pending", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.pending,
      });

      await expect(followService.followUser("user1", "user2")).rejects.toThrow(
        new FollowUserError("You have already requested to follow this user")
      );
    });

    it("should update existing notFollowing relationship", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.notFollowing,
      });
      mockPrismaFollowsUpdate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted,
      });

      const result = await followService.followUser("user1", "user2");

      expect(result.isNewRelationship).toBe(false);
      expect(mockPrismaFollowsUpdate).toHaveBeenCalledWith({
        where: {
          followedById_followingId: {
            followedById: "user1",
            followingId: "user2",
          },
        },
        data: {
          status: FollowStatus.accepted,
        },
      });
    });
  });

  describe("updateFollowStatus", () => {
    it("should accept follow request", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.pending,
      });
      mockPrismaFollowsUpdate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted,
      });

      const result = await followService.updateFollowStatus(
        "user2",
        "user1",
        FollowAction.accept
      );

      expect(result.message).toBe("Successfully accepted follow request");
      expect(mockPrismaFollowsUpdate).toHaveBeenCalledWith({
        where: {
          followedById_followingId: {
            followedById: "user1",
            followingId: "user2",
          },
        },
        data: { status: FollowStatus.accepted },
      });
    });

    it("should reject follow request", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.pending,
      });
      mockPrismaFollowsUpdate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.notFollowing,
      });

      const result = await followService.updateFollowStatus(
        "user2",
        "user1",
        FollowAction.reject
      );

      expect(result.message).toBe("Successfully rejected follow request");
    });

    it("should remove follower", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted,
      });
      mockPrismaFollowsUpdate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.notFollowing,
      });

      const result = await followService.updateFollowStatus(
        "user2",
        "user1",
        FollowAction.remove
      );

      expect(result.message).toBe("Successfully removed follower");
    });

    it("should cancel follow request", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.pending,
      });
      mockPrismaFollowsUpdate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.notFollowing,
      });

      const result = await followService.updateFollowStatus(
        "user1",
        "user2",
        FollowAction.cancel
      );

      expect(result.message).toBe("Successfully cancelled follow request");
      expect(mockPrismaFollowsUpdate).toHaveBeenCalledWith({
        where: {
          followedById_followingId: {
            followedById: "user1",
            followingId: "user2",
          },
        },
        data: { status: FollowStatus.notFollowing },
      });
    });

    it("should unfollow user", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted,
      });
      mockPrismaFollowsUpdate.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.notFollowing,
      });

      const result = await followService.updateFollowStatus(
        "user1",
        "user2",
        FollowAction.unfollow
      );

      expect(result.message).toBe("Successfully unfollowed user");
    });

    it("should throw error if no follow relationship exists", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue(null);

      await expect(
        followService.updateFollowStatus("user1", "user2", FollowAction.accept)
      ).rejects.toThrow(NoFollowRelationshipError);
    });

    it("should throw error for invalid status transition", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted, // current status
      });

      await expect(
        followService.updateFollowStatus("user2", "user1", FollowAction.accept) // trying to accept when already accepted
      ).rejects.toThrow(InvalidUpdateStatusActionError);
    });
  });

  describe("getPendingFollowRequests", () => {
    it("should return pending follow requests", async () => {
      const mockPendingRequests = [
        { ...mockFollow, status: FollowStatus.pending },
        { ...mockFollow, followedById: "user3", status: FollowStatus.pending },
      ];

      mockPrismaFollowsFindMany.mockResolvedValue(mockPendingRequests);

      const result = await followService.getPendingFollowRequests("user2");

      expect(result).toEqual(mockPendingRequests);
      expect(mockPrismaFollowsFindMany).toHaveBeenCalledWith({
        where: { followingId: "user2", status: FollowStatus.pending },
        orderBy: { updatedAt: "desc" },
      });
    });
  });

  describe("getFollowStatus", () => {
    beforeEach(() => {
      (mockAuthService.findUserById as Mock).mockResolvedValue(mockTargetUser);
    });

    it("should return null for self", async () => {
      const result = await followService.getFollowStatus("user1", "user1");
      expect(result).toBeNull();
    });

    it("should throw error if target user not found", async () => {
      (mockAuthService.findUserById as Mock).mockResolvedValue(null);

      await expect(
        followService.getFollowStatus("user1", "user2")
      ).rejects.toThrow(UserNotFoundError);
    });

    it("should return follow status if relationship exists", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue({
        ...mockFollow,
        status: FollowStatus.accepted,
      });

      const result = await followService.getFollowStatus("user1", "user2");

      expect(result).toBe(FollowStatus.accepted);
    });

    it("should return notFollowing if no relationship exists", async () => {
      mockPrismaFollowsFindUnique.mockResolvedValue(null);

      const result = await followService.getFollowStatus("user1", "user2");

      expect(result).toBe(FollowStatus.notFollowing);
    });
  });

  describe("getFollowCount", () => {
    it("should return follower count", async () => {
      mockPrismaFollowsCount.mockResolvedValue(5);

      const result = await followService.getFollowCount(
        "user1",
        FollowRelation.followedBy
      );

      expect(result).toBe(5);
      expect(mockPrismaFollowsCount).toHaveBeenCalledWith({
        where: { followedById: "user1", status: FollowStatus.accepted },
      });
    });

    it("should return following count", async () => {
      mockPrismaFollowsCount.mockResolvedValue(3);

      const result = await followService.getFollowCount(
        "user1",
        FollowRelation.following
      );

      expect(result).toBe(3);
      expect(mockPrismaFollowsCount).toHaveBeenCalledWith({
        where: { followingId: "user1", status: FollowStatus.accepted },
      });
    });
  });

  describe("error handling", () => {
    it("should handle database errors in followUser", async () => {
      (mockAuthService.findUserById as Mock).mockResolvedValue(mockTargetUser);
      mockPrismaFollowsFindUnique.mockRejectedValue(
        new Error("Database error")
      );

      await expect(followService.followUser("user1", "user2")).rejects.toThrow(
        "Database error"
      );
    });

    it("should handle database errors in updateFollowStatus", async () => {
      mockPrismaFollowsFindUnique.mockRejectedValue(
        new Error("Database connection failed")
      );

      await expect(
        followService.updateFollowStatus("user1", "user2", FollowAction.accept)
      ).rejects.toThrow("Database connection failed");
    });
  });
});
