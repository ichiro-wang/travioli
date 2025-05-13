import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;

  // make sure user ID is provided
  if (!userId) {
    res.status(400).json({ message: "Cannot get profile without providing ID" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  // if the user exists (or account not soft deleted)
  if (!user || user.isDeleted) {
    res.status(404).json({ message: "User with given ID not found" });
    return;
  }

  // check if the user is checking their own profile
  const isSelf = req.user?.id === userId;

  // get follower and following counts to include in profile details
  const followerCount = await prisma.follows.count({
    where: { followingId: userId, status: "accepted" },
  });
  const followingCount = await prisma.follows.count({
    where: { followedById: userId, status: "accepted" },
  });

  // if the user is private, and not checking own profile
  if (user.isPrivate && !isSelf) {
    const privateUser = {
      username: user.username,
      name: user.name,
      bio: user.bio,
      profilePic: user.profilePic,
      followerCount,
      followingCount,
    };
    res.status(200).json({ message: "User is private", user: privateUser });
    return;
  }

  const filteredUser = {
    username: user.username,
  };
  res.status(200).json({});
};
