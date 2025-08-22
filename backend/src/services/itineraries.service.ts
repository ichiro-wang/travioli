import z from "zod";
import prisma from "../db/prisma.js";
import { ItineraryNotFoundError } from "../errors/itineraries.errors.js";
import { Itinerary, ItineraryItem } from "../generated/client/index.js";
import {
  LocationSchema,
  UpdateItineraryBodyUpdatedItems,
} from "../schemas/itineraries.schema.js";
import { PrismaTransactionalClient } from "../types/global.js";
import { getUserItinerariesResponseSchema } from "../schemas/users.schemas.js";

interface ItineraryData {
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  ownerId: string;
}

interface ItineraryItemData {
  id: string;
  itineraryId: string;
  name: string;
  order: number;
  description?: string;
  cost?: number;
  currency?: string;
}

interface LocationData {
  id: string;
  itineraryItemId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country?: string;
  city?: string;
  address?: string;
}

interface UpdateItineraryFields {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

type LocationWithItineraryItemId = {
  location: LocationSchema;
  itineraryItemId: string;
};

interface OrderUpdate {
  id: string;
  order: number;
}

interface ConflictingOrder {
  id: string;
  conflictingOrder: number;
}

export class ItineraryService {
  private static SRID = 4326;
  private static PAGINATION_TAKE_SIZE = 10;

  async getItineraryById(id: string, tx: PrismaTransactionalClient) {
    const itinerary = await tx.itinerary.findUnique({
      where: { id },
      include: {
        itineraryItems: {
          include: {
            location: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!itinerary) {
      throw new ItineraryNotFoundError(id);
    }

    const coordinates = await tx.$queryRawUnsafe<
      { itineraryItemId: string; coordinates: string }[]
    >(
      `
      SELECT 
        l."itineraryItemId",
        ST_AsGeoJSON(l."coordinates") AS coordinates
      FROM "Location" l
      JOIN "ItineraryItem" ii ON l."itineraryItemId" = ii.id
      WHERE ii."itineraryId" = $1
      `,
      id
    );

    const coordinatesMap = new Map(
      coordinates.map((coord) => {
        const parsed: { type: string; coordinates: number[] } = JSON.parse(
          coord.coordinates
        );
        const [lng, lat] = parsed.coordinates;
        return [coord.itineraryItemId, { lng, lat }];
      })
    );

    for (const item of itinerary.itineraryItems) {
      if (item.location && coordinatesMap.has(item.id)) {
        (item.location as any).coordinates = coordinatesMap.get(item.id);
      }
    }

    return itinerary;
  }

  async ownsItinerary(ownerId: string, itineraryId: string): Promise<boolean> {
    const itinerary = await prisma.itinerary.findUnique({
      where: { id: itineraryId },
    });

    if (!itinerary) {
      throw new ItineraryNotFoundError(itineraryId);
    }

    return itinerary.ownerId === ownerId;
  }

  /**
   * check for itinerary items that don't actually belong in the requested itinerary
   */
  async findInvalidItineraryItemIds(
    itemIdList: string[],
    itineraryId: string
  ): Promise<string[]> {
    if (itemIdList.length <= 0) {
      return [];
    }

    const foundItems = await prisma.itineraryItem.findMany({
      where: { id: { in: itemIdList }, itineraryId },
      select: { id: true },
    });

    const foundItemsSet = new Set(foundItems.map((fi) => fi.id));

    const invalidIds = itemIdList.filter((id) => !foundItemsSet.has(id));
    return invalidIds;
  }

  async createItinerary(
    itineraryData: ItineraryData,
    tx: PrismaTransactionalClient
  ): Promise<Itinerary> {
    return await tx.itinerary.create({ data: itineraryData });
  }

  async createItineraryItems(
    itineraryItems: ItineraryItemData[],
    tx: PrismaTransactionalClient
  ): Promise<ItineraryItem[]> {
    return await tx.itineraryItem.createManyAndReturn({
      data: itineraryItems,
    });
  }

  async createLocations(
    locations: LocationData[],
    tx: PrismaTransactionalClient
  ): Promise<void> {
    // building raw queries to work with postgis
    // see prisma docs for working with raw queries

    if (locations.length === 0) {
      return;
    }

    const queries = locations.map((loc) =>
      tx.$executeRawUnsafe(
        `
        INSERT INTO "Location" (
          "id", 
          "itineraryItemId", 
          "coordinates", 
          "country", 
          "city", 
          "address"
        )
        VALUES (
          $1, $2, 
          ST_SetSRID(ST_MakePoint($3, $4), ${ItineraryService.SRID}), 
          $5, $6, $7
        )
        `,
        loc.id,
        loc.itineraryItemId,
        loc.coordinates.lng,
        loc.coordinates.lat,
        loc.country ?? "",
        loc.city ?? "",
        loc.address ?? ""
      )
    );

    await Promise.all(queries);
  }

  async updateItineraryFields(
    fields: UpdateItineraryFields,
    itineraryId: string,
    tx: PrismaTransactionalClient
  ): Promise<Itinerary | void> {
    let filteredUpdates: UpdateItineraryFields = {};

    if (fields.title !== undefined) {
      filteredUpdates.title = fields.title;
    }
    if (fields.description !== undefined) {
      filteredUpdates.description = fields.description;
    }
    if (fields.startDate !== undefined) {
      filteredUpdates.startDate = fields.startDate;
    }
    if (fields.endDate !== undefined) {
      filteredUpdates.endDate = fields.endDate;
    }

    if (Object.keys(filteredUpdates).length === 0) {
      return;
    }

    const updatedItinerary = await tx.itinerary.update({
      where: {
        id: itineraryId,
      },
      data: filteredUpdates,
    });

    return updatedItinerary;
  }

  async updateItineraryItems(
    updatedItems: UpdateItineraryBodyUpdatedItems,
    tx: PrismaTransactionalClient
  ): Promise<void> {
    if (updatedItems.length === 0) {
      return;
    }

    // we need to handle order updates separately since we need to set orders to temp values first
    const itemsWithOrderUpdates = updatedItems.filter(
      (item) => item.order !== undefined
    );
    const itemsWithoutOrderUpdates = updatedItems.filter(
      (item) => item.order === undefined
    );

    if (itemsWithOrderUpdates.length > 0) {
      await Promise.all(
        itemsWithOrderUpdates.map((item, index) =>
          tx.itineraryItem.update({
            where: { id: item.id },
            data: { order: -(index + 1) },
          })
        )
      );

      await Promise.all(
        itemsWithOrderUpdates.map((item) => {
          const { location, id, order, ...updatedFields } = item;
          return tx.itineraryItem.update({
            where: { id },
            data: { ...updatedFields, order },
          });
        })
      );
    }

    if (itemsWithoutOrderUpdates.length > 0) {
      await Promise.all(
        itemsWithoutOrderUpdates.map((item) => {
          const { location, id, order, ...updatedFields } = item;
          return tx.itineraryItem.update({
            where: { id },
            data: updatedFields,
          });
        })
      );
    }

    const locationsToUpdate = updatedItems
      .filter((item) => item.location)
      .map((item) => ({ location: item.location!, itineraryItemId: item.id }));

    if (locationsToUpdate.length > 0) {
      await this.updateLocations(locationsToUpdate, tx);
    }
  }

  async deleteItineraryItems(
    deleteItemIds: string[],
    tx?: PrismaTransactionalClient
  ): Promise<void> {
    if (deleteItemIds.length === 0) {
      return;
    }

    const client = tx ?? prisma;

    await client.itineraryItem.deleteMany({
      where: { id: { in: deleteItemIds } },
    });
  }

  async deleteItinerary(
    itineraryId: string,
    tx: PrismaTransactionalClient
  ): Promise<Itinerary> {
    const deletedItinerary = await tx.itinerary.delete({
      where: { id: itineraryId },
    });
    return deletedItinerary;
  }

  async updateLocations(
    locations: LocationWithItineraryItemId[],
    tx: PrismaTransactionalClient
  ): Promise<void> {
    if (locations.length === 0) {
      return;
    }

    const queries = locations.map((loc) => {
      return tx.$executeRawUnsafe(
        `
        UPDATE "Location"
        SET 
          "coordinates" = ST_SetSRID(ST_MakePoint($1, $2), ${ItineraryService.SRID}),
          "country" = $3,
          "city" = $4,
          "address" = $5
        WHERE "itineraryItemId" = $6
        `,
        loc.location.coordinates.lng,
        loc.location.coordinates.lat,
        loc.location.country,
        loc.location.city,
        loc.location.address,
        loc.itineraryItemId
      );
    });

    await Promise.all(queries);
  }

  async validateOrderUpdates(
    orderUpdates: OrderUpdate[],
    itineraryId: string
  ): Promise<ConflictingOrder[]> {
    if (orderUpdates.length === 0) {
      return [];
    }

    const orderSet = new Set<number>();
    const duplicateOrders: ConflictingOrder[] = [];

    orderUpdates.forEach((o) => {
      if (orderSet.has(o.order)) {
        duplicateOrders.push({ id: o.id, conflictingOrder: o.order });
      } else {
        orderSet.add(o.order);
      }
    });

    if (duplicateOrders.length > 0) {
      return duplicateOrders;
    }

    const existingItems = await prisma.itineraryItem.findMany({
      where: {
        itineraryId,
        order: { in: Array.from(orderSet) },
        id: { notIn: orderUpdates.map((o) => o.id) },
      },
      select: { id: true, order: true },
    });

    return existingItems.map((item) => ({
      id: item.id,
      conflictingOrder: item.order,
    }));
  }

  async getItinerariesByUserId(
    userId: string,
    loadIndex: number
  ): Promise<z.infer<typeof getUserItinerariesResponseSchema>> {
    const offset = ItineraryService.PAGINATION_TAKE_SIZE * loadIndex;
    const take = ItineraryService.PAGINATION_TAKE_SIZE + 1;

    const retrievedItineraries = await prisma.itinerary.findMany({
      where: { ownerId: userId, isArchived: false },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take,
    });

    const hasMore =
      retrievedItineraries.length > ItineraryService.PAGINATION_TAKE_SIZE;

    let itineraries: Itinerary[];

    if (hasMore) {
      itineraries = retrievedItineraries.slice(
        0,
        ItineraryService.PAGINATION_TAKE_SIZE
      );
    } else {
      itineraries = retrievedItineraries;
    }

    return { itineraries, pagination: { hasMore, loadIndex } };
  }
}
