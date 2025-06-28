export const FollowRelation = {
  following: "following",
  followedBy: "followedBy",
} as const;

export type FollowRelationType = (typeof FollowRelation)[keyof typeof FollowRelation];

// need this list to use it in zod enum
// keep it in this format
export const FollowRelationList = [FollowRelation.followedBy, FollowRelation.following] as const;

export const FollowAction = {
  accept: "accept",
  reject: "reject",
  remove: "remove",
  cancel: "cancel",
  unfollow: "unfollow",
} as const;

export type FollowActionType = (typeof FollowAction)[keyof typeof FollowAction];

// need this list to use it in zod enum
// keep it in this format
export const FollowActionList = [
  FollowAction.accept,
  FollowAction.reject,
  FollowAction.remove,
  FollowAction.cancel,
  FollowAction.unfollow,
] as const;

export const UpdatePrivacyOptions = {
  togglePrivate: "private",
  togglePublic: "public",
} as const;

export const UpdatePrivacyOptionsList = [
  UpdatePrivacyOptions.togglePrivate,
  UpdatePrivacyOptions.togglePublic,
] as const;
