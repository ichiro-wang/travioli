type Message = {
  message: string;
};

type User = {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  profilePic: string;
  isPrivate: boolean;
  email: string | null;
};

type FollowStatus = "pending" | "accepted" | "notFollowing";

type UserProfile = {
  user: User;
  isSelf: boolean;
  followedByCount: number;
  followingCount: number;
  followStatus?: FollowStatus;
};

type Itinerary = {
  id: string;
  createdAt: Date;
  updateAt: Date;
  title: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isArchived: boolean;
  ownerId: string;
};

type Pagination = {
  loadIndex: number;
  hasMore: boolean;
};

type UserItineraries = {
  itineraries: Itinerary[];
  pagination: Pagination;
};
