export class ItineraryNotFoundError extends Error {
  constructor(id: string) {
    super(`Itinerary with ID ${id} not found`);
  }
}

export class NotItineraryOwnerError extends Error {
  constructor() {
    super("Forbidden");
  }
}
