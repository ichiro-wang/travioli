import { Request, Response } from "express";
import cuid from "cuid";
import { internalServerError } from "../utils/internalServerError.js";
import {
  CreateItineraryBody,
  DeleteItineraryParams,
  GetItineraryParams,
  ItineraryItemSchema,
  UpdateItineraryBody,
  UpdateItineraryParams,
} from "../schemas/itineraries.schema.js";
import { itineraryService, permissionService } from "../services/index.js";
import prisma from "../db/prisma.js";
import { ItineraryNotFoundError } from "../errors/itineraries.errors.js";

const prepareItineraryItemData = (
  itineraryItems: ItineraryItemSchema[],
  itineraryId: string
) => {
  return itineraryItems.map((item) => ({
    ...item,
    id: cuid(),
    itineraryId,
  }));
};

type ItineraryItemData = ReturnType<typeof prepareItineraryItemData>;

const prepareLocationData = (itineraryItemData: ItineraryItemData) => {
  const locationData = itineraryItemData.map(({ location, ...item }) => {
    return {
      ...location,
      id: cuid(),
      itineraryItemId: item.id,
    };
  });

  return locationData;
};

const stripLocation = <T extends { location: unknown }>(items: T[]) => {
  return items.map(({ location, ...rest }) => rest);
};

/**
 * ### explaining my thought process behind this function
 *
 * - we create the itinerary first
 *    - this is just a single insert on the itinerary table
 *
 * **when using Prisma createMany, we can't do nested create's**
 *
 * - we create itinerary items in parallel
 * - we create locations in parallel
 * - we fetch the itinerary with all nested items to return it to the user
 */
export const createItinerary = async (
  req: Request<{}, {}, CreateItineraryBody>,
  res: Response
): Promise<void> => {
  try {
    const { title, description, startDate, endDate, itineraryItems } = req.body;
    const currentUserId = req.user.id;

    const fullItinerary = await prisma.$transaction(async (tx) => {
      const itinerary = await itineraryService.createItinerary(
        {
          title,
          description,
          startDate,
          endDate,
          ownerId: currentUserId,
        },
        tx
      );

      // preparing itinerary item data
      const itineraryItemsData = prepareItineraryItemData(
        itineraryItems,
        itinerary.id
      );

      await itineraryService.createItineraryItems(
        stripLocation(itineraryItemsData),
        tx
      );

      // prepating locations data
      const locations = prepareLocationData(itineraryItemsData);

      if (locations.length > 0) {
        await itineraryService.createLocations(locations, tx);
      }

      const fullItinerary = await itineraryService.getItineraryById(
        itinerary.id,
        tx
      );

      return fullItinerary;
    });

    res.status(201).json({ itinerary: fullItinerary });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, "createItinerary controller");
  }
};

export const getItinerary = async (
  req: Request<GetItineraryParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;

    const itinerary = await prisma.$transaction(async (tx) => {
      return await itineraryService.getItineraryById(id, tx);
    });

    const checkPermission = await permissionService.checkUserViewingPermission(
      currentUserId,
      itinerary.ownerId
    );

    if (!checkPermission.hasPermission) {
      res
        .status(403)
        .json({ message: "You do not have permission to view this itinerary" });
      return;
    }

    res.status(200).json({ itinerary });
    return;
  } catch (error: unknown) {
    if (error instanceof ItineraryNotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    internalServerError(error, res, "getItinerary controller");
  }
};

export const updateItinerary = async (
  req: Request<UpdateItineraryParams, {}, UpdateItineraryBody>,
  res: Response
): Promise<void> => {
  try {
    /**
     * - multiple fields: new items, items to delete, items to reorder, updated items, updated fields
     */
    const { id } = req.params;
    const {
      itineraryFields,
      newItems = [],
      deleteItemIds = [],
      updatedItems = [],
    } = req.body;
    const currentUserId = req.user.id;

    const existingItinerary = await prisma.$transaction(async (tx) => {
      return await itineraryService.getItineraryById(id, tx);
    });

    if (existingItinerary.ownerId !== currentUserId) {
      res
        .status(400)
        .json({ message: "The requested itinerary does not belong to you" });
      return;
    }

    // we want to check these item id's to ensure they actually belong on the itinerary we are updating
    const itemIdsToCheck: string[] = [
      ...updatedItems.map((item) => item.id),
      ...deleteItemIds,
    ];

    if (itemIdsToCheck.length > 0) {
      const invalidIds = await itineraryService.findInvalidItineraryItemIds(
        itemIdsToCheck,
        id
      );

      if (invalidIds.length > 0) {
        res.status(400).json({
          message: `At least one item does not belong to this itinerary (id: ${id})`,
          invalidItemIds: invalidIds,
        });
        return;
      }
    }

    // since order within an itinerary is unique, we want to validate them before updating
    if (updatedItems.length > 0) {
      const orderUpdates = updatedItems
        .filter((item) => item.order !== undefined)
        .map((item) => ({ id: item.id, order: item.order! }));

      if (orderUpdates.length > 0) {
        const orderConflicts = await itineraryService.validateOrderUpdates(
          orderUpdates,
          id
        );

        if (orderConflicts.length > 0) {
          res.status(400).json({
            message: "Order conflicts detected. Cannot update",
            conflicts: orderConflicts,
          });
          return;
        }
      }
    }

    // after passing checks, update itinerary
    const updatedItinerary = await prisma.$transaction(async (tx) => {
      if (itineraryFields) {
        await itineraryService.updateItineraryFields(
          itineraryFields,
          existingItinerary.id,
          tx
        );
      }

      /**
       * delete first to make room for reordering
       */

      if (deleteItemIds.length > 0) {
        await itineraryService.deleteItineraryItems(deleteItemIds, tx);
      }

      if (updatedItems.length > 0) {
        await itineraryService.updateItineraryItems(updatedItems, tx);
      }

      // adding new items to itinerary
      if (newItems.length > 0) {
        const newItemsData = prepareItineraryItemData(
          newItems,
          existingItinerary.id
        );

        await itineraryService.createItineraryItems(
          stripLocation(newItemsData),
          tx
        );

        const newLocations = prepareLocationData(newItemsData);

        if (newLocations.length > 0) {
          await itineraryService.createLocations(newLocations, tx);
        }
      }

      return await itineraryService.getItineraryById(id, tx);
    });

    res.status(200).json({ itinerary: updatedItinerary });
    return;
  } catch (error: unknown) {
    if (error instanceof ItineraryNotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }

    internalServerError(error, res, "updateItinerary controller");
  }
};

export const deleteItinerary = async (
  req: Request<DeleteItineraryParams>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId = req.user.id;

    const isOwner = await itineraryService.ownsItinerary(currentUserId, id);

    if (!isOwner) {
      res.status(403).json({ message: "You do not own this itinerary" });
      return;
    }

    const deletedItinerary = await prisma.$transaction(async (tx) => {
      return await itineraryService.deleteItinerary(id, tx);
    });

    res.status(200).json({
      message: `Itinerary "${deletedItinerary.title}" successfully deleted`,
    });
    return;
  } catch (error: unknown) {
    internalServerError(error, res, `${deleteItinerary.name} controller`);
  }
};
