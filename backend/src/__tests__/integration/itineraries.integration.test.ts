import request from "supertest";
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { setUpTestData, takeDownTest, TestData } from "./helpers.js";
import { app } from "../../index.js";

describe("create itinerary integration tests", () => {
  const CREATE_URL = "/api/itineraries";
  let testData: TestData;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  it("should successfully create itinerary with basic fields", async () => {
    const itineraryData = {
      title: "Summer Trip to Japan",
      description: "A two-week adventure in Japan",
      startDate: "2024-07-15T00:00:00.000Z",
      endDate: "2024-07-29T00:00:00.000Z",
      itineraryItems: [
        {
          name: "Tokyo",
          order: 0,
          location: {
            coordinates: { lat: 35.6654, lng: 139.7707 },
          },
        },
      ],
    };

    const res = await request(app)
      .post(CREATE_URL)
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.itinerary).toHaveProperty("id");
    expect(res.body.itinerary).toHaveProperty("title", itineraryData.title);
    expect(res.body.itinerary).toHaveProperty(
      "description",
      itineraryData.description
    );
    expect(res.body.itinerary).toHaveProperty("ownerId", testData.user.id);
    expect(res.body.itinerary.itineraryItems).toHaveLength(1);
  });

  it("should successfully create itinerary with items and locations", async () => {
    const itineraryData = {
      title: "Tokyo Food Tour",
      description: "Best restaurants in Tokyo",
      startDate: "2024-08-01T00:00:00.000Z",
      endDate: "2024-08-03T00:00:00.000Z",
      currency: "JPY",
      itineraryItems: [
        {
          name: "Tsukiji Fish Market",
          description: "Fresh sushi breakfast",
          cost: 2500,
          order: 1,
          location: {
            coordinates: { lat: 35.6654, lng: 139.7707 },
            country: "Japan",
            city: "Tokyo",
            address: "5 Chome-2-1 Tsukiji, Chuo City, Tokyo",
          },
        },
        {
          name: "Ramen Alley",
          description: "Famous ramen street",
          cost: 1200,
          order: 2,
          location: {
            coordinates: { lat: 35.6762, lng: 139.7653 },
            country: "Japan",
            city: "Tokyo",
            address: "Shibuya City, Tokyo",
          },
        },
      ],
    };

    const res = await request(app)
      .post(CREATE_URL)
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.itinerary.itineraryItems).toHaveLength(2);
    expect(res.body.itinerary.itineraryItems[0]).toHaveProperty("location");
    expect(res.body.itinerary.itineraryItems[0].location).toHaveProperty(
      "coordinates"
    );
    expect(res.body.itinerary.itineraryItems[0].location.coordinates).toEqual({
      lat: 35.6654,
      lng: 139.7707,
    });
  });

  it("should successfully create itinerary with only required fields", async () => {
    const itineraryData = {
      title: "Minimal Trip",
      itineraryItems: [
        {
          name: "Basic Item",
          order: 1,
          location: {
            coordinates: { lat: 40.7128, lng: -74.006 },
            country: "USA",
            city: "New York",
            address: "Times Square, New York, NY",
          },
        },
      ],
    };

    const res = await request(app)
      .post(CREATE_URL)
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.itinerary).toHaveProperty("title", "Minimal Trip");
    expect(res.body.itinerary).toHaveProperty("description", null);
    expect(res.body.itinerary.itineraryItems).toHaveLength(1);
  });

  it("should fail to create itinerary without title", async () => {
    const itineraryData = {
      description: "Missing title",
      itineraryItems: [
        {
          name: "Some item",
          order: 1,
        },
      ],
    };

    const res = await request(app)
      .post(CREATE_URL)
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid input data/i);
  });

  it("should fail to create itinerary with empty title", async () => {
    const itineraryData = {
      title: "",
      itineraryItems: [
        {
          name: "Some item",
          order: 1,
        },
      ],
    };

    const res = await request(app)
      .post(CREATE_URL)
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid input data/i);
  });

  it("should fail to create itinerary with invalid date range", async () => {
    const itineraryData = {
      title: "Invalid Dates",
      startDate: "2024-08-15T00:00:00.000Z",
      endDate: "2024-08-10T00:00:00.000Z", // end before start
      itineraryItems: [
        {
          name: "Some item",
          order: 1,
        },
      ],
    };

    const res = await request(app)
      .post(CREATE_URL)
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid input data/i);
  });
});

describe("get itinerary integration tests", () => {
  const GET_URL = (id: string) => `/api/itineraries/${id}`;
  let testData: TestData;
  let testItinerary: any;

  beforeAll(async () => {
    testData = await setUpTestData();

    // Create a test itinerary
    const itineraryData = {
      title: "Test Itinerary",
      description: "For testing purposes",
      startDate: "2024-09-01T00:00:00.000Z",
      endDate: "2024-09-05T00:00:00.000Z",
      currency: "USD",
      itineraryItems: [
        {
          name: "Test Location",
          description: "A test location",
          cost: 100,
          order: 1,
          location: {
            coordinates: { lat: 40.7128, lng: -74.006 },
            country: "USA",
            city: "New York",
            address: "Times Square, New York, NY",
          },
        },
      ],
    };

    const createRes = await request(app)
      .post("/api/itineraries")
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    testItinerary = createRes.body.itinerary;
  });

  afterAll(async () => {
    await takeDownTest();
  });

  it("should successfully retrieve own itinerary", async () => {
    const res = await request(app)
      .get(GET_URL(testItinerary.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.itinerary).toHaveProperty("id", testItinerary.id);
    expect(res.body.itinerary).toHaveProperty("title", "Test Itinerary");
    expect(res.body.itinerary.itineraryItems).toHaveLength(1);
    expect(res.body.itinerary.itineraryItems[0]).toHaveProperty("location");
  });

  it("should fail to retrieve non-existent itinerary", async () => {
    const res = await request(app)
      .get(GET_URL("csomerandomitinerary777"))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  it("should fail to retrieve invalid itinerary id", async () => {
    const res = await request(app)
      .get(GET_URL("invalid-id"))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/invalid cuid/i);
  });

  it("should fail to retrieve other user's private itinerary", async () => {
    // Create itinerary as other user
    const otherUserItinerary = {
      title: "Private Itinerary",
      itineraryItems: [
        {
          name: "Private item",
          order: 1,
          location: {
            coordinates: { lat: 40.7128, lng: -74.006 },
          },
        },
      ],
    };

    const createRes = await request(app)
      .post("/api/itineraries")
      .send(otherUserItinerary)
      .set("Cookie", testData.privateUserAccessTokenCookie);

    const res = await request(app)
      .get(GET_URL(createRes.body.itinerary.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/permission/i);
  });
});

describe("update itinerary integration tests", () => {
  const UPDATE_URL = (id: string) => `/api/itineraries/${id}`;
  let testData: TestData;
  let testItinerary: any;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    // Create fresh itinerary for each test
    const itineraryData = {
      title: "Original Title",
      description: "Original description",
      startDate: "2024-10-01T00:00:00.000Z",
      endDate: "2024-10-05T00:00:00.000Z",
      itineraryItems: [
        {
          name: "Original Item 1",
          order: 1,
          location: {
            coordinates: { lat: 40.7128, lng: -74.006 },
            city: "New York",
          },
        },
        {
          name: "Original Item 2",
          order: 2,
          location: {
            coordinates: { lat: 34.0522, lng: -118.2437 },
            city: "Los Angeles",
          },
        },
      ],
    };

    const createRes = await request(app)
      .post("/api/itineraries")
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    testItinerary = createRes.body.itinerary;
  });

  it("should successfully update itinerary fields only", async () => {
    const updateData = {
      itineraryFields: {
        title: "Updated Title",
        description: "Updated description",
      },
    };

    const res = await request(app)
      .patch(UPDATE_URL(testItinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.itinerary).toHaveProperty("title", "Updated Title");
    expect(res.body.itinerary).toHaveProperty(
      "description",
      "Updated description"
    );
    expect(res.body.itinerary.itineraryItems).toHaveLength(2); // unchanged
  });

  it("should successfully add new items to existing itinerary", async () => {
    const updateData = {
      newItems: [
        {
          name: "New Item 1",
          order: 3,
          location: {
            coordinates: { lat: 41.8781, lng: -87.6298 },
            city: "Chicago",
          },
        },
      ],
    };

    const res = await request(app)
      .patch(UPDATE_URL(testItinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.itinerary.itineraryItems).toHaveLength(3);
    expect(res.body.itinerary.itineraryItems[2]).toHaveProperty(
      "name",
      "New Item 1"
    );
  });

  it("should successfully update existing items", async () => {
    const firstItemId = testItinerary.itineraryItems[0].id;
    const updateData = {
      updatedItems: [
        {
          id: firstItemId,
          name: "Updated Item Name",
          description: "Updated description",
        },
      ],
    };

    const res = await request(app)
      .patch(UPDATE_URL(testItinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.itinerary.itineraryItems[0]).toHaveProperty(
      "name",
      "Updated Item Name"
    );
    expect(res.body.itinerary.itineraryItems[0]).toHaveProperty(
      "description",
      "Updated description"
    );
  });

  it("should successfully delete items from itinerary", async () => {
    const firstItemId = testItinerary.itineraryItems[0].id;
    const updateData = {
      deleteItemIds: [firstItemId],
    };

    const res = await request(app)
      .patch(UPDATE_URL(testItinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.itinerary.itineraryItems).toHaveLength(1);
    expect(res.body.itinerary.itineraryItems[0]).not.toHaveProperty(
      "id",
      firstItemId
    );
  });

  it("should successfully reorder items", async () => {
    const firstItemId = testItinerary.itineraryItems[0].id;
    const secondItemId = testItinerary.itineraryItems[1].id;

    const updateData = {
      updatedItems: [
        {
          id: firstItemId,
          order: 2,
        },
        {
          id: secondItemId,
          order: 1,
        },
      ],
    };

    const res = await request(app)
      .patch(UPDATE_URL(testItinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.itinerary.itineraryItems[0]).toHaveProperty(
      "id",
      secondItemId
    );
    expect(res.body.itinerary.itineraryItems[1]).toHaveProperty(
      "id",
      firstItemId
    );
  });

  it("should fail to update non-existent itinerary", async () => {
    const updateData = {
      itineraryFields: {
        title: "Updated Title",
      },
    };

    const res = await request(app)
      .patch(UPDATE_URL("csomerandomitinerary777"))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  it("should fail to update other user's itinerary", async () => {
    // Create itinerary as other user
    const otherUserItinerary = {
      title: "Other User's Itinerary",
      itineraryItems: [
        {
          name: "Other user's item",
          order: 1,
          location: {
            coordinates: { lat: 40.7128, lng: -74.006 },
          },
        },
      ],
    };

    const createRes = await request(app)
      .post("/api/itineraries")
      .send(otherUserItinerary)
      .set("Cookie", testData.otherUserAccessTokenCookie);

    const updateData = {
      itineraryFields: {
        title: "Hacked Title",
      },
    };

    const res = await request(app)
      .patch(UPDATE_URL(createRes.body.itinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/does not belong to you/i);
  });

  it("should fail to update with conflicting orders", async () => {
    const firstItemId = testItinerary.itineraryItems[0].id;
    const secondItemId = testItinerary.itineraryItems[1].id;

    const updateData = {
      updatedItems: [
        {
          id: firstItemId,
          order: 1,
        },
        {
          id: secondItemId,
          order: 1, // same order as first item
        },
      ],
    };

    const res = await request(app)
      .patch(UPDATE_URL(testItinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/order conflicts/i);
  });

  it("should fail to update with invalid item ids", async () => {
    const updateData = {
      updatedItems: [
        {
          id: "csomerandomitemid777",
          name: "Updated Name",
        },
      ],
    };

    const res = await request(app)
      .patch(UPDATE_URL(testItinerary.id))
      .send(updateData)
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/does not belong to this itinerary/i);
  });
});

describe("delete itinerary integration tests", () => {
  const DELETE_URL = (id: string) => `/api/itineraries/${id}`;
  let testData: TestData;
  let testItinerary: any;

  beforeAll(async () => {
    testData = await setUpTestData();
  });

  afterAll(async () => {
    await takeDownTest();
  });

  beforeEach(async () => {
    // Create fresh itinerary for each test
    const itineraryData = {
      title: "To Be Deleted",
      description: "This will be deleted",
      itineraryItems: [
        {
          name: "Item to delete",
          order: 1,
          location: {
            coordinates: { lat: 40.7128, lng: -74.006 },
            city: "New York",
          },
        },
      ],
    };

    const createRes = await request(app)
      .post("/api/itineraries")
      .send(itineraryData)
      .set("Cookie", testData.accessTokenCookie);

    testItinerary = createRes.body.itinerary;
  });

  it("should successfully delete own itinerary", async () => {
    const res = await request(app)
      .delete(DELETE_URL(testItinerary.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/successfully deleted/i);
    expect(res.body.message).toContain("To Be Deleted");

    // Verify itinerary is actually deleted
    const getRes = await request(app)
      .get(`/api/itineraries/${testItinerary.id}`)
      .set("Cookie", testData.accessTokenCookie);

    expect(getRes.statusCode).toBe(404);
  });

  it("should fail to delete non-existent itinerary", async () => {
    const res = await request(app)
      .delete(DELETE_URL("csomerandomitinerary777"))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(404); 
  });

  it("should fail to delete other user's itinerary", async () => {
    // Create itinerary as other user
    const otherUserItinerary = {
      title: "Other user itinerary",
      itineraryItems: [
        {
          name: "Some random place",
          order: 1,
          location: {
            coordinates: { lat: 35.6654, lng: 139.7707 },
          },
        },
      ],
    };

    const createRes = await request(app)
      .post("/api/itineraries")
      .send(otherUserItinerary)
      .set("Cookie", testData.otherUserAccessTokenCookie);

    const res = await request(app)
      .delete(DELETE_URL(createRes.body.itinerary.id))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/do not own/i);
  });

  it("should fail to delete with invalid itinerary id", async () => {
    const res = await request(app)
      .delete(DELETE_URL("invalid-id"))
      .set("Cookie", testData.accessTokenCookie);

    expect(res.statusCode).toBe(400);
    expect(res.body.errors.join(",")).toMatch(/invalid cuid/i);
  });
});
