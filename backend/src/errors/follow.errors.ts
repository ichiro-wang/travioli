import { FollowStatus } from "../generated/client/index.js";

export class FollowSelfError extends Error {
  constructor() {
    super("Cannot follow self");
  }
}

export class FollowUserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NoFollowRelationshipError extends Error {
  constructor() {
    super("No follows relationship with this user found, could not update status");
  }
}

export class InvalidUpdateStatusActionError extends Error {
  constructor(from: FollowStatus, status: FollowStatus) {
    super(
      `Failed to update follow status. Expected existing status to be ${from}, but got ${status}`
    );
  }
}
