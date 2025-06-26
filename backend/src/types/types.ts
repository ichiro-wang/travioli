export const FollowRelation = {
  following: "following",
  followedBy: "followedBy",
} as const;

// need this list to use it in zod enum
export const FollowRelationList = [FollowRelation.followedBy, FollowRelation.following] as const;

export const FollowAction = {
  accept: "accept",
  reject: "reject",
  cancel: "cancel",
  unfollow: "unfollow",
} as const;

// need this list to use it in zod enum
export const FollowActionList = [
  FollowAction.accept,
  FollowAction.reject,
  FollowAction.cancel,
  FollowAction.unfollow,
] as const;
