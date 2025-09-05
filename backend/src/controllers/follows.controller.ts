import { Request, Response } from "express";
import {
  FollowUserParams,
  followUserResponseSchema,
  GetFollowListParams,
  GetFollowListQuery,
  getFollowListResponseSchema,
  getFollowRequestsResponseSchema,
  getFollowStatusResponseSchema,
  UpdateFollowStatusBody,
  UpdateFollowStatusParams,
  updateFollowStatusResponseSchema,
} from "../schemas/follows.schema.js";
import { internalServerError } from "../utils/internalServerError.js";
import { followService, permissionService } from "../services/index.js";
import { UserNotFoundError } from "../errors/auth.errors.js";
import { userNotFoundResponse } from "../utils/responseHelpers.js";
import {
  FollowSelfError,
  FollowUserError,
  InvalidUpdateStatusActionError,
  NoFollowRelationshipError,
} from "../errors/follow.errors.js";
import { FollowStatus } from "@prisma/client";

/**
 * get the followedBy or following list of a user
 * in request body, specify if type is "followedBy" or "following"
 * check if the user is private first
 */
export const getFollowList = async (
  req: Request<GetFollowListParams, {}, {}, GetFollowListQuery>,
  res: Response
): Promise<void> => {
  // ensure data is validated first. check validateData middleware
  const { id: targetUserId, type: relationType } = req.params;
  const currentUserId = req.user.id;

  // basically page number for pagination, but frontend uses infinite scroll pagination
  const loadIndex = Math.max(0, parseInt(req.query.loadIndex) || 0);

  try {
    const permissionCheck = await permissionService.checkUserViewingPermission(
      currentUserId,
      targetUserId
    );

    if (!permissionCheck.hasPermission) {
      res.status(403).json({ message: "This account is private" });
      return;
    }

    const result = await followService.getFollowList(
      targetUserId,
      relationType,
      loadIndex
    );

    const validatedResponse = getFollowListResponseSchema.parse({
      [relationType]: result.users,
      pagination: { loadIndex, hasMore: result.hasMore },
    });

    // return followedBy or following list as the filtered user list
    res.status(200).json(validatedResponse);
    return;
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }

    internalServerError(error, res, "getFollowList controller");
  }
};

/**
 * follow a user if profile is public
 * send a follow request if profile is private
 */
export const followUser = async (
  req: Request<FollowUserParams>,
  res: Response
): Promise<void> => {
  const { id: userId } = req.params;
  const currentUserId = req.user.id;

  try {
    const { follow, isNewRelationship } = await followService.followUser(
      currentUserId,
      userId
    );

    const message =
      follow.status === FollowStatus.pending
        ? "Follow request sent"
        : "Successfully followed user";

    const statusCode = isNewRelationship ? 201 : 200;

    const validatedResponse = followUserResponseSchema.parse({
      message,
      follow,
    });

    res.status(statusCode).json(validatedResponse);
    return;
  } catch (error: unknown) {
    if (error instanceof FollowSelfError || error instanceof FollowUserError) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (error instanceof UserNotFoundError) {
      userNotFoundResponse(res);
      return;
    }

    internalServerError(error, res, "followUser controller");
  }
};

/**
 * - update a follow status to accepted or notFollowing
 * - types of actions: accept, reject, remove - target (current user); cancel, unfollow - target (other user)
 */
export const updateFollowStatus = async (
  req: Request<UpdateFollowStatusParams, {}, UpdateFollowStatusBody>,
  res: Response
): Promise<void> => {
  const { id: userId } = req.params;
  const { type: actionType } = req.body;
  const currentUserId = req.user.id;

  try {
    const updatedResult = await followService.updateFollowStatus(
      currentUserId,
      userId,
      actionType
    );

    const validatedResponse =
      updateFollowStatusResponseSchema.parse(updatedResult);

    res.status(200).json(validatedResponse);
    return;
  } catch (error: unknown) {
    if (error instanceof NoFollowRelationshipError) {
      res.status(404).json({ message: error.message });
      return;
    }

    if (error instanceof InvalidUpdateStatusActionError) {
      res.status(400).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "updateFollowStatus controller");
  }
};

/**
 * get list of pending follow requests of requesting user
 */
export const getPendingRequests = async (
  req: Request,
  res: Response
): Promise<void> => {
  const currentUser = req.user;

  if (!currentUser.isPrivate) {
    res
      .status(400)
      .json({ message: "Your account is public, you have no requests" });
    return;
  }

  try {
    const pendingRequests = await followService.getPendingFollowRequests(
      currentUser.id
    );

    const validatedResponse = getFollowRequestsResponseSchema.parse({
      pendingRequests,
    });

    res.status(200).json(validatedResponse);
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "getPendingRequests controller");
  }
};

/**
 * get follow relationship status of requesting user and requested user
 */
export const getFollowStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: userId } = req.params;
  const currentUserId = req.user.id;

  try {
    const followStatus = await followService.getFollowStatus(
      currentUserId,
      userId
    );

    if (followStatus === null) {
      res.status(400).json({
        message: "You do not have a follow relationship with yourself",
      });
    }

    const validatedResponse = getFollowStatusResponseSchema.parse({
      followStatus,
    });

    res.status(200).json(validatedResponse);
    return;
  } catch (error: unknown) {
    if (error instanceof UserNotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "getFollowStatus controller");
  }
};
