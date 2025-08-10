import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { ItineraryService } from "../../services/itineraries.service.js";
import { Itinerary, ItineraryItem } from "../../generated/client/index.js";
import prisma from "../../db/prisma.js";
import { ItineraryNotFoundError } from "../../errors/itineraries.errors.js";

vi.mock("../../db/prisma.js", () => ({
  default: {
    itinerary: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
    },
    itineraryItem: {
      createManyAndReturn: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
    },
    $queryRawUnsafe: vi.fn(),
    $executeRawUnsafe: vi.fn(),
  },
}));

const mockPrismaItineraryCreate = prisma.itinerary.create as Mock;
const mockPrismaItineraryFindUnique = prisma.itinerary.findUnique as Mock;
const mockPrismaItineraryUpdate = prisma.itinerary.update as Mock;
const mockPrismaItineraryDelete = prisma.itinerary.delete as Mock;
const mockPrismaItineraryFindMany = prisma.itinerary.findMany as Mock;
const mockPrismaItineraryItemCreateManyAndReturn = prisma.itineraryItem
  .createManyAndReturn as Mock;
const mockPrismaItineraryItemFindMany = prisma.itineraryItem.findMany as Mock;
const mockPrismaItineraryItemUpdate = prisma.itineraryItem.update as Mock;
const mockPrismaItineraryItemDeleteMany = prisma.itineraryItem
  .deleteMany as Mock;
const mockPrismaQueryRawUnsafe = prisma.$queryRawUnsafe as Mock;
const mockPrismaExecuteRawUnsafe = prisma.$executeRawUnsafe as Mock;

describe("ItineraryService unit tests", () => {
  let itineraryService: ItineraryService;

  const mockItinerary = {
    id: "itinerary1",
    title: "Tokyo Adventure",
    description: "Amazing trip to Tokyo",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-07"),
    ownerId: "user1",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Itinerary;

  const mockItineraryItem = {
    id: "item1",
    itineraryId: "itinerary1",
    name: "Tokyo Tower",
    description: "Visit iconic tower",
    cost: 1000,
    currency: "JPY",
    order: 1,
    location: {
      id: "location1",
      itineraryItemId: "item1",
      coordinates: { lat: 35.6586, lng: 139.7454 },
      country: "Japan",
      city: "Tokyo",
      address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo",
    },
  } as ItineraryItem & { location: any };

  const mockItineraryWithItems = {
    ...mockItinerary,
    itineraryItems: [mockItineraryItem],
  };

  const mockTx = {
    itinerary: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    itineraryItem: {
      createManyAndReturn: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
    },
    $queryRawUnsafe: vi.fn(),
    $executeRawUnsafe: vi.fn(),
  };

  beforeEach(() => {
    itineraryService = new ItineraryService();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getItineraryById", () => {
    it("should return itinerary with items and coordinates", async () => {
      mockTx.itinerary.findUnique.mockResolvedValue(mockItineraryWithItems);
      mockTx.$queryRawUnsafe.mockResolvedValue([
        {
          itineraryItemId: "item1",
          coordinates: '{"type":"Point","coordinates":[139.7454,35.6586]}',
        },
      ]);

      const result = await itineraryService.getItineraryById(
        "itinerary1",
        mockTx as any
      );

      expect(result.id).toBe("itinerary1");
      expect(result.title).toBe("Tokyo Adventure");
      expect(result.itineraryItems).toHaveLength(1);
      expect((result.itineraryItems[0].location as any).coordinates).toEqual({
        lng: 139.7454,
        lat: 35.6586,
      });
      expect(mockTx.itinerary.findUnique).toHaveBeenCalledWith({
        where: { id: "itinerary1" },
        include: {
          itineraryItems: {
            include: { location: true },
            orderBy: { order: "asc" },
          },
        },
      });
    });

    it("should throw ItineraryNotFoundError when itinerary doesn't exist", async () => {
      mockTx.itinerary.findUnique.mockResolvedValue(null);

      await expect(
        itineraryService.getItineraryById("nonexistent", mockTx as any)
      ).rejects.toThrow(ItineraryNotFoundError);
    });
  });

  describe("ownsItinerary", () => {
    it("should return true when user owns the itinerary", async () => {
      mockPrismaItineraryFindUnique.mockResolvedValue(mockItinerary);

      const result = await itineraryService.ownsItinerary(
        "user1",
        "itinerary1"
      );

      expect(result).toBe(true);
      expect(mockPrismaItineraryFindUnique).toHaveBeenCalledWith({
        where: { id: "itinerary1" },
      });
    });

    it("should return false when user doesn't own the itinerary", async () => {
      mockPrismaItineraryFindUnique.mockResolvedValue(mockItinerary);

      const result = await itineraryService.ownsItinerary(
        "user2",
        "itinerary1"
      );

      expect(result).toBe(false);
    });

    it("should throw ItineraryNotFoundError when itinerary doesn't exist", async () => {
      mockPrismaItineraryFindUnique.mockResolvedValue(null);

      await expect(
        itineraryService.ownsItinerary("user1", "nonexistent")
      ).rejects.toThrow(ItineraryNotFoundError);
    });
  });

  describe("findInvalidItineraryItemIds", () => {
    it("should return empty array when all items are valid", async () => {
      mockPrismaItineraryItemFindMany.mockResolvedValue([
        { id: "item1" },
        { id: "item2" },
      ]);

      const result = await itineraryService.findInvalidItineraryItemIds(
        ["item1", "item2"],
        "itinerary1"
      );

      expect(result).toEqual([]);
      expect(mockPrismaItineraryItemFindMany).toHaveBeenCalledWith({
        where: { id: { in: ["item1", "item2"] }, itineraryId: "itinerary1" },
        select: { id: true },
      });
    });

    it("should return invalid item IDs", async () => {
      mockPrismaItineraryItemFindMany.mockResolvedValue([{ id: "item1" }]);

      const result = await itineraryService.findInvalidItineraryItemIds(
        ["item1", "item2", "item3"],
        "itinerary1"
      );

      expect(result).toEqual(["item2", "item3"]);
    });

    it("should return empty array when itemIdList is empty", async () => {
      const result = await itineraryService.findInvalidItineraryItemIds(
        [],
        "itinerary1"
      );

      expect(result).toEqual([]);
      expect(mockPrismaItineraryItemFindMany).not.toHaveBeenCalled();
    });
  });

  describe("createItinerary", () => {
    it("should create itinerary successfully", async () => {
      const itineraryData = {
        title: "New Trip",
        description: "Exciting adventure",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-04-07"),
        ownerId: "user1",
      };

      mockTx.itinerary.create.mockResolvedValue({
        ...mockItinerary,
        ...itineraryData,
      });

      const result = await itineraryService.createItinerary(
        itineraryData,
        mockTx as any
      );

      expect(result.title).toBe("New Trip");
      expect(result.ownerId).toBe("user1");
      expect(mockTx.itinerary.create).toHaveBeenCalledWith({
        data: itineraryData,
      });
    });
  });

  describe("createItineraryItems", () => {
    it("should create multiple itinerary items", async () => {
      const itemsData = [
        {
          id: "item1",
          itineraryId: "itinerary1",
          name: "Location 1",
          order: 1,
        },
        {
          id: "item2",
          itineraryId: "itinerary1",
          name: "Location 2",
          order: 2,
        },
      ];

      mockTx.itineraryItem.createManyAndReturn.mockResolvedValue(itemsData);

      const result = await itineraryService.createItineraryItems(
        itemsData,
        mockTx as any
      );

      expect(result).toEqual(itemsData);
      expect(mockTx.itineraryItem.createManyAndReturn).toHaveBeenCalledWith({
        data: itemsData,
      });
    });
  });

  describe("createLocations", () => {
    it("should create locations using raw SQL", async () => {
      const locationsData = [
        {
          id: "loc1",
          itineraryItemId: "item1",
          coordinates: { lat: 35.6586, lng: 139.7454 },
          country: "Japan",
          city: "Tokyo",
          address: "Tokyo Tower",
        },
      ];

      mockTx.$executeRawUnsafe.mockResolvedValue(1);

      await itineraryService.createLocations(locationsData, mockTx as any);

      expect(mockTx.$executeRawUnsafe).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO "Location"'),
        "loc1",
        "item1",
        139.7454,
        35.6586,
        "Japan",
        "Tokyo",
        "Tokyo Tower"
      );
    });

    it("should return early when locations array is empty", async () => {
      await itineraryService.createLocations([], mockTx as any);

      expect(mockTx.$executeRawUnsafe).not.toHaveBeenCalled();
    });
  });

  describe("updateItineraryFields", () => {
    it("should update only provided fields", async () => {
      const fieldsToUpdate = {
        title: "Updated Title",
        description: "Updated description",
      };

      mockTx.itinerary.update.mockResolvedValue({
        ...mockItinerary,
        ...fieldsToUpdate,
      });

      const result = await itineraryService.updateItineraryFields(
        fieldsToUpdate,
        "itinerary1",
        mockTx as any
      );

      expect(result?.title).toBe("Updated Title");
      expect(mockTx.itinerary.update).toHaveBeenCalledWith({
        where: { id: "itinerary1" },
        data: fieldsToUpdate,
      });
    });

    it("should return undefined when no fields to update", async () => {
      const result = await itineraryService.updateItineraryFields(
        {},
        "itinerary1",
        mockTx as any
      );

      expect(result).toBeUndefined();
      expect(mockTx.itinerary.update).not.toHaveBeenCalled();
    });
  });

  describe("validateOrderUpdates", () => {
    it("should return empty array when no conflicts", async () => {
      mockPrismaItineraryItemFindMany.mockResolvedValue([]);

      const orderUpdates = [
        { id: "item1", order: 1 },
        { id: "item2", order: 2 },
      ];

      const result = await itineraryService.validateOrderUpdates(
        orderUpdates,
        "itinerary1"
      );

      expect(result).toEqual([]);
    });

    it("should detect duplicate orders in input", async () => {
      const orderUpdates = [
        { id: "item1", order: 1 },
        { id: "item2", order: 1 },
      ];

      const result = await itineraryService.validateOrderUpdates(
        orderUpdates,
        "itinerary1"
      );

      expect(result).toEqual([{ id: "item2", conflictingOrder: 1 }]);
      expect(mockPrismaItineraryItemFindMany).not.toHaveBeenCalled();
    });

    it("should detect conflicts with existing items", async () => {
      mockPrismaItineraryItemFindMany.mockResolvedValue([
        { id: "existingItem", order: 1 },
      ]);

      const orderUpdates = [{ id: "item1", order: 1 }];

      const result = await itineraryService.validateOrderUpdates(
        orderUpdates,
        "itinerary1"
      );

      expect(result).toEqual([{ id: "existingItem", conflictingOrder: 1 }]);
    });
  });

  describe("getItinerariesByUserId", () => {
    it("should return itineraries with pagination", async () => {
      const mockItineraries = [
        { ...mockItinerary, id: "it1" },
        { ...mockItinerary, id: "it2" },
      ];

      mockPrismaItineraryFindMany.mockResolvedValue(mockItineraries);

      const result = await itineraryService.getItinerariesByUserId("user1", 0);

      expect(result.itineraries).toEqual(mockItineraries);
      expect(result.hasMore).toBe(false);
      expect(mockPrismaItineraryFindMany).toHaveBeenCalledWith({
        where: { ownerId: "user1" },
        orderBy: { createdAt: "desc" },
        skip: 0,
        take: 11,
      });
    });

    it("should indicate hasMore when there are more results", async () => {
      const mockItineraries = Array(11).fill(mockItinerary);
      mockPrismaItineraryFindMany.mockResolvedValue(mockItineraries);

      const result = await itineraryService.getItinerariesByUserId("user1", 0);

      expect(result.itineraries).toHaveLength(10);
      expect(result.hasMore).toBe(true);
    });

    it("should handle pagination with loadIndex", async () => {
      const mockItineraries = [mockItinerary];
      mockPrismaItineraryFindMany.mockResolvedValue(mockItineraries);

      await itineraryService.getItinerariesByUserId("user1", 2);

      expect(mockPrismaItineraryFindMany).toHaveBeenCalledWith({
        where: { ownerId: "user1" },
        orderBy: { createdAt: "desc" },
        skip: 20,
        take: 11,
      });
    });
  });

  describe("deleteItinerary", () => {
    it("should delete itinerary successfully", async () => {
      mockTx.itinerary.delete.mockResolvedValue(mockItinerary);

      const result = await itineraryService.deleteItinerary(
        "itinerary1",
        mockTx as any
      );

      expect(result).toEqual(mockItinerary);
      expect(mockTx.itinerary.delete).toHaveBeenCalledWith({
        where: { id: "itinerary1" },
      });
    });
  });

  describe("deleteItineraryItems", () => {
    it("should delete multiple itinerary items", async () => {
      const deleteIds = ["item1", "item2"];
      mockPrismaItineraryItemDeleteMany.mockResolvedValue({ count: 2 });

      await itineraryService.deleteItineraryItems(deleteIds);

      expect(mockPrismaItineraryItemDeleteMany).toHaveBeenCalledWith({
        where: { id: { in: deleteIds } },
      });
    });

    it("should return early when deleteItemIds is empty", async () => {
      await itineraryService.deleteItineraryItems([]);

      expect(mockPrismaItineraryItemDeleteMany).not.toHaveBeenCalled();
    });

    it("should use transaction when provided", async () => {
      const deleteIds = ["item1"];
      mockTx.itineraryItem.deleteMany.mockResolvedValue({ count: 1 });

      await itineraryService.deleteItineraryItems(deleteIds, mockTx as any);

      expect(mockTx.itineraryItem.deleteMany).toHaveBeenCalledWith({
        where: { id: { in: deleteIds } },
      });
    });
  });

  describe("updateLocations", () => {
    it("should update locations using raw SQL", async () => {
      const locationsToUpdate = [
        {
          location: {
            coordinates: { lat: 35.6586, lng: 139.7454 },
            country: "Japan",
            city: "Tokyo",
            address: "Updated address",
          },
          itineraryItemId: "item1",
        },
      ];

      mockTx.$executeRawUnsafe.mockResolvedValue(1);

      await itineraryService.updateLocations(locationsToUpdate, mockTx as any);

      expect(mockTx.$executeRawUnsafe).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE "Location"'),
        139.7454,
        35.6586,
        "Japan",
        "Tokyo",
        "Updated address",
        "item1"
      );
    });

    it("should return early when locations array is empty", async () => {
      await itineraryService.updateLocations([], mockTx as any);

      expect(mockTx.$executeRawUnsafe).not.toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should handle database errors in getItineraryById", async () => {
      mockTx.itinerary.findUnique.mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        itineraryService.getItineraryById("itinerary1", mockTx as any)
      ).rejects.toThrow("Database error");
    });

    it("should handle database errors in createItinerary", async () => {
      mockTx.itinerary.create.mockRejectedValue(new Error("Database error"));

      await expect(
        itineraryService.createItinerary(
          { title: "Test", ownerId: "user1" },
          mockTx as any
        )
      ).rejects.toThrow("Database error");
    });

    it("should handle database errors in updateItineraryFields", async () => {
      mockTx.itinerary.update.mockRejectedValue(new Error("Database error"));

      await expect(
        itineraryService.updateItineraryFields(
          { title: "Updated" },
          "itinerary1",
          mockTx as any
        )
      ).rejects.toThrow("Database error");
    });
  });
});
