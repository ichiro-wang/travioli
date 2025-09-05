import { z } from 'zod';
import type { Prisma } from '../client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','username','name','bio','password','profilePic','isPrivate','isDeleted','createdAt','updatedAt','verifiedAt']);

export const FollowsScalarFieldEnumSchema = z.enum(['followedById','followingId','status','createdAt','updatedAt']);

export const ItineraryScalarFieldEnumSchema = z.enum(['id','title','description','startDate','endDate','currency','isArchived','ownerId','createdAt','updatedAt']);

export const ItineraryItemScalarFieldEnumSchema = z.enum(['id','name','description','cost','currencyOverride','order','itineraryId','createdAt','updatedAt']);

export const LocationScalarFieldEnumSchema = z.enum(['id','itineraryItemId','country','city','address']);

export const MediaScalarFieldEnumSchema = z.enum(['id','thumbnail','feed','itineraryId','itineraryItemId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const FollowStatusSchema = z.enum(['pending','accepted','notFollowing']);

export type FollowStatusType = `${z.infer<typeof FollowStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string(),
  username: z.string(),
  name: z.string().nullish(),
  bio: z.string().nullish(),
  password: z.string(),
  profilePic: z.string(),
  isPrivate: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  verifiedAt: z.coerce.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  followedBy: FollowsWithRelations[];
  following: FollowsWithRelations[];
  createdItineraries: ItineraryWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  followedBy: z.lazy(() => FollowsWithRelationsSchema).array(),
  following: z.lazy(() => FollowsWithRelationsSchema).array(),
  createdItineraries: z.lazy(() => ItineraryWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// FOLLOWS SCHEMA
/////////////////////////////////////////

export const FollowsSchema = z.object({
  status: FollowStatusSchema,
  followedById: z.string(),
  followingId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Follows = z.infer<typeof FollowsSchema>

// FOLLOWS RELATION SCHEMA
//------------------------------------------------------

export type FollowsRelations = {
  followedBy: UserWithRelations;
  following: UserWithRelations;
};

export type FollowsWithRelations = z.infer<typeof FollowsSchema> & FollowsRelations

export const FollowsWithRelationsSchema: z.ZodType<FollowsWithRelations> = FollowsSchema.merge(z.object({
  followedBy: z.lazy(() => UserWithRelationsSchema),
  following: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// ITINERARY SCHEMA
/////////////////////////////////////////

export const ItinerarySchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullish(),
  startDate: z.coerce.date().nullish(),
  endDate: z.coerce.date().nullish(),
  currency: z.string(),
  isArchived: z.boolean(),
  ownerId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Itinerary = z.infer<typeof ItinerarySchema>

// ITINERARY RELATION SCHEMA
//------------------------------------------------------

export type ItineraryRelations = {
  media: MediaWithRelations[];
  itineraryItems: ItineraryItemWithRelations[];
  owner: UserWithRelations;
};

export type ItineraryWithRelations = z.infer<typeof ItinerarySchema> & ItineraryRelations

export const ItineraryWithRelationsSchema: z.ZodType<ItineraryWithRelations> = ItinerarySchema.merge(z.object({
  media: z.lazy(() => MediaWithRelationsSchema).array(),
  itineraryItems: z.lazy(() => ItineraryItemWithRelationsSchema).array(),
  owner: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// ITINERARY ITEM SCHEMA
/////////////////////////////////////////

export const ItineraryItemSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullish(),
  cost: z.number().nullish(),
  currencyOverride: z.string().nullish(),
  order: z.number().int(),
  itineraryId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ItineraryItem = z.infer<typeof ItineraryItemSchema>

// ITINERARY ITEM RELATION SCHEMA
//------------------------------------------------------

export type ItineraryItemRelations = {
  media: MediaWithRelations[];
  location?: LocationWithRelations | null;
  itinerary: ItineraryWithRelations;
};

export type ItineraryItemWithRelations = z.infer<typeof ItineraryItemSchema> & ItineraryItemRelations

export const ItineraryItemWithRelationsSchema: z.ZodType<ItineraryItemWithRelations> = ItineraryItemSchema.merge(z.object({
  media: z.lazy(() => MediaWithRelationsSchema).array(),
  location: z.lazy(() => LocationWithRelationsSchema).nullish(),
  itinerary: z.lazy(() => ItineraryWithRelationsSchema),
}))

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.string().cuid(),
  itineraryItemId: z.string(),
  country: z.string().nullish(),
  city: z.string().nullish(),
  address: z.string().nullish(),
})

export type Location = z.infer<typeof LocationSchema>

// LOCATION RELATION SCHEMA
//------------------------------------------------------

export type LocationRelations = {
  itineraryItem: ItineraryItemWithRelations;
};

export type LocationWithRelations = z.infer<typeof LocationSchema> & LocationRelations

export const LocationWithRelationsSchema: z.ZodType<LocationWithRelations> = LocationSchema.merge(z.object({
  itineraryItem: z.lazy(() => ItineraryItemWithRelationsSchema),
}))

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

export const MediaSchema = z.object({
  id: z.string().cuid(),
  thumbnail: z.string(),
  feed: z.string(),
  itineraryId: z.string().nullish(),
  itineraryItemId: z.string().nullish(),
})

export type Media = z.infer<typeof MediaSchema>

// MEDIA RELATION SCHEMA
//------------------------------------------------------

export type MediaRelations = {
  itinerary?: ItineraryWithRelations | null;
  itineraryItem?: ItineraryItemWithRelations | null;
};

export type MediaWithRelations = z.infer<typeof MediaSchema> & MediaRelations

export const MediaWithRelationsSchema: z.ZodType<MediaWithRelations> = MediaSchema.merge(z.object({
  itinerary: z.lazy(() => ItineraryWithRelationsSchema).nullish(),
  itineraryItem: z.lazy(() => ItineraryItemWithRelationsSchema).nullish(),
}))
