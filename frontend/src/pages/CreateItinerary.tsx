import type { ItinerariesPostRequest } from "@/api";
import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";
import { useCreateItinerary } from "@/hooks/itineraries/useCreateItinerary";
import {
  APIProvider,
  Map,
  Marker,
  type MapMouseEvent,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Plus, Trash2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface StopForm {
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  lat: string;
  lng: string;
  cost: string;
  currency: string;
}

const emptyStop = (currency: string): StopForm => ({
  name: "",
  description: "",
  address: "",
  city: "",
  country: "",
  lat: "",
  lng: "",
  cost: "",
  currency,
});

const optionalValue = (value: string) => {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const parseCoordinate = (value: string, field: string) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${field} must be a valid number.`);
  }

  return parsed;
};

const getSelectedPosition = (stop: StopForm) => {
  if (!stop.lat.trim() || !stop.lng.trim()) return undefined;

  const lat = Number(stop.lat);
  const lng = Number(stop.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return undefined;

  return { lat, lng };
};

interface StopLocationUpdate {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  lat: string;
  lng: string;
}

type AddressComponentSource = {
  address_components?: google.maps.GeocoderAddressComponent[] | null;
};

const getAddressComponent = (
  source: AddressComponentSource,
  type: string
) => {
  return source.address_components?.find((component) =>
    component.types.includes(type)
  )?.long_name;
};

const getCity = (source: AddressComponentSource) => {
  return (
    getAddressComponent(source, "locality") ||
    getAddressComponent(source, "postal_town") ||
    getAddressComponent(source, "administrative_area_level_1")
  );
};

const getLocationUpdateFromPlace = (
  place: google.maps.places.PlaceResult,
  fallbackPosition: google.maps.LatLngLiteral,
  shouldUsePlaceName: boolean
): StopLocationUpdate => {
  const location = place.geometry?.location;

  return {
    name: shouldUsePlaceName ? optionalValue(place.name || "") : undefined,
    address: optionalValue(place.formatted_address || ""),
    city: getCity(place),
    country: getAddressComponent(place, "country"),
    lat: (location?.lat() ?? fallbackPosition.lat).toFixed(6),
    lng: (location?.lng() ?? fallbackPosition.lng).toFixed(6),
  };
};

const getLocationUpdateFromGeocode = (
  result: google.maps.GeocoderResult,
  fallbackPosition: google.maps.LatLngLiteral
): StopLocationUpdate => {
  const location = result.geometry.location;

  return {
    address: optionalValue(result.formatted_address),
    city: getCity(result),
    country: getAddressComponent(result, "country"),
    lat: (location?.lat() ?? fallbackPosition.lat).toFixed(6),
    lng: (location?.lng() ?? fallbackPosition.lng).toFixed(6),
  };
};

const getPlaceDetails = (
  places: google.maps.PlacesLibrary,
  map: google.maps.Map,
  placeId: string
) => {
  const service = new places.PlacesService(map);

  return new Promise<{
    place: google.maps.places.PlaceResult | null;
    status: google.maps.places.PlacesServiceStatus;
  }>((resolve) => {
    service.getDetails(
      {
        placeId,
        fields: ["address_components", "formatted_address", "geometry", "name"],
      },
      (place, status) => {
        resolve({
          place:
            status === google.maps.places.PlacesServiceStatus.OK && place
              ? place
              : null,
          status,
        });
      }
    );
  });
};

const reverseGeocode = (
  geocoding: google.maps.GeocodingLibrary,
  position: google.maps.LatLngLiteral
) => {
  const geocoder = new geocoding.Geocoder();

  return new Promise<{
    result: google.maps.GeocoderResult | null;
    status: google.maps.GeocoderStatus;
  }>((resolve) => {
    geocoder.geocode({ location: position }, (results, status) => {
      resolve({ result: results?.[0] ?? null, status });
    });
  });
};

const warnMapsDetailsUnavailable = (service: string, status: string) => {
  console.warn(
    `${service} did not return location details (${status}). Coordinates were still saved. Check that the required Google Maps APIs are enabled for this key and that localhost is allowed in the key's website restrictions.`
  );
};

interface LocationPickerProps {
  stop: StopForm;
  stopNumber: number;
  onSelect: (location: StopLocationUpdate) => void;
}

const LocationPicker = ({
  stop,
  stopNumber,
  onSelect,
}: LocationPickerProps) => {
  const map = useMap();
  const geocoding = useMapsLibrary("geocoding");
  const places = useMapsLibrary("places");
  const selectedPosition = getSelectedPosition(stop);
  const defaultCenter = selectedPosition || {
    lat: 49.282027142710106,
    lng: -123.11769390238607,
  };

  const handleMapClick = async (event: MapMouseEvent) => {
    if (!event.detail.latLng) return;

    const position = event.detail.latLng;
    let location: StopLocationUpdate = {
      lat: position.lat.toFixed(6),
      lng: position.lng.toFixed(6),
    };

    try {
      if (event.detail.placeId && places && map) {
        event.stop();

        const { place, status } = await getPlaceDetails(
          places,
          map,
          event.detail.placeId
        );

        if (place) {
          onSelect(
            getLocationUpdateFromPlace(place, position, !stop.name.trim())
          );
          return;
        }

        warnMapsDetailsUnavailable("Places service", status);
      }

      if (geocoding) {
        const { result, status } = await reverseGeocode(geocoding, position);

        if (result) {
          location = getLocationUpdateFromGeocode(result, position);
        } else {
          warnMapsDetailsUnavailable("Geocoding service", status);
        }
      }
    } catch (error) {
      console.error("Error enriching map click:", error);
      toast.error("Could not load location details. Coordinates were saved.");
    }

    onSelect(location);
  };

  return (
    <div className="grid gap-2">
      <Label>Pick location</Label>
      <div className="h-64 overflow-hidden rounded-md border">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={12}
          mapId={import.meta.env.VITE_MAP_ID}
          onClick={handleMapClick}
          gestureHandling="greedy"
        >
          {selectedPosition && (
            <Marker
              position={selectedPosition}
              title={`Selected location for stop ${stopNumber}`}
            />
          )}
        </Map>
      </div>
    </div>
  );
};

const CreateItinerary = () => {
  useSetDocumentTitle("Create itinerary");

  const { createItinerary, isLoading } = useCreateItinerary();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("CAD");
  const [stops, setStops] = useState<StopForm[]>([emptyStop("CAD")]);

  const updateStop = (index: number, field: keyof StopForm, value: string) => {
    setStops((currentStops) =>
      currentStops.map((stop, stopIndex) =>
        stopIndex === index ? { ...stop, [field]: value } : stop
      )
    );
  };

  const addStop = () => {
    setStops((currentStops) => [...currentStops, emptyStop(defaultCurrency)]);
  };

  const removeStop = (index: number) => {
    setStops((currentStops) =>
      currentStops.length === 1
        ? currentStops
        : currentStops.filter((_, stopIndex) => stopIndex !== index)
    );
  };

  const selectStopLocation = (index: number, location: StopLocationUpdate) => {
    setStops((currentStops) =>
      currentStops.map((stop, stopIndex) =>
        stopIndex === index
          ? {
              ...stop,
              name: location.name ?? stop.name,
              address: location.address ?? stop.address,
              city: location.city ?? stop.city,
              country: location.country ?? stop.country,
              lat: location.lat,
              lng: location.lng,
            }
          : stop
      )
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.error("Add a title before creating your itinerary.");
      return;
    }

    if (startDate && endDate && startDate > endDate) {
      toast.error("End date must be after the start date.");
      return;
    }

    try {
      const itineraryItems = stops.map((stop, index) => {
        const name = stop.name.trim();

        if (!name) {
          throw new Error(`Stop ${index + 1} needs a name.`);
        }

        const cost = optionalValue(stop.cost);

        return {
          name,
          description: optionalValue(stop.description),
          cost: cost === undefined ? undefined : Number(cost),
          currencyOverride: optionalValue(stop.currency),
          order: index,
          location: {
            coordinates: {
              lat: parseCoordinate(stop.lat, `Stop ${index + 1} latitude`),
              lng: parseCoordinate(stop.lng, `Stop ${index + 1} longitude`),
            },
            country: optionalValue(stop.country),
            city: optionalValue(stop.city),
            address: optionalValue(stop.address),
          },
        };
      });

      if (itineraryItems.some((item) => Number.isNaN(item.cost))) {
        toast.error("Cost must be a valid number.");
        return;
      }

      const payload: ItinerariesPostRequest = {
        title: trimmedTitle,
        description: optionalValue(description),
        startDate: optionalValue(startDate),
        endDate: optionalValue(endDate),
        itineraryItems,
      };

      createItinerary(payload);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Check your stops.");
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <Form title="Create itinerary" onSubmit={handleSubmit} className="gap-6">
        <section className="grid gap-4 rounded-md border p-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Weekend in Vancouver"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="defaultCurrency">Default currency</Label>
            <Input
              id="defaultCurrency"
              value={defaultCurrency}
              onChange={(e) => setDefaultCurrency(e.target.value.toUpperCase())}
              maxLength={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
              placeholder="What kind of trip is this?"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endDate">End date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <APIProvider
            apiKey={import.meta.env.VITE_MAPS_API}
            libraries={["places", "geocoding"]}
          >
            {stops.map((stop, index) => (
              <div key={index} className="grid gap-4 rounded-md border p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium">Stop {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStop(index)}
                    disabled={stops.length === 1}
                    aria-label={`Remove stop ${index + 1}`}
                  >
                    <Trash2 />
                  </Button>
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-name`}>Name</Label>
                        <Input
                          id={`stop-${index}-name`}
                          value={stop.name}
                          onChange={(event) =>
                            updateStop(index, "name", event.target.value)
                          }
                          placeholder="Coffee at the quay"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-address`}>Address</Label>
                        <Input
                          id={`stop-${index}-address`}
                          value={stop.address}
                          onChange={(event) =>
                            updateStop(index, "address", event.target.value)
                          }
                          placeholder="123 Example St"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-city`}>City</Label>
                        <Input
                          id={`stop-${index}-city`}
                          value={stop.city}
                          onChange={(event) =>
                            updateStop(index, "city", event.target.value)
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-country`}>Country</Label>
                        <Input
                          id={`stop-${index}-country`}
                          value={stop.country}
                          onChange={(event) =>
                            updateStop(index, "country", event.target.value)
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-currency`}>
                          Currency
                        </Label>
                        <Input
                          id={`stop-${index}-currency`}
                          value={stop.currency}
                          onChange={(event) =>
                            updateStop(index, "currency", event.target.value)
                          }
                          maxLength={3}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-lat`}>Latitude</Label>
                        <Input
                          id={`stop-${index}-lat`}
                          type="number"
                          step="any"
                          value={stop.lat}
                          onChange={(event) =>
                            updateStop(index, "lat", event.target.value)
                          }
                          placeholder="49.2827"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-lng`}>Longitude</Label>
                        <Input
                          id={`stop-${index}-lng`}
                          type="number"
                          step="any"
                          value={stop.lng}
                          onChange={(event) =>
                            updateStop(index, "lng", event.target.value)
                          }
                          placeholder="-123.1207"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor={`stop-${index}-cost`}>Cost</Label>
                        <Input
                          id={`stop-${index}-cost`}
                          type="number"
                          step="0.01"
                          min="0"
                          value={stop.cost}
                          onChange={(event) =>
                            updateStop(index, "cost", event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <LocationPicker
                    stop={stop}
                    stopNumber={index + 1}
                    onSelect={(position) => selectStopLocation(index, position)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`stop-${index}-description`}>
                    Description
                  </Label>
                  <textarea
                    id={`stop-${index}-description`}
                    value={stop.description}
                    onChange={(event) =>
                      updateStop(index, "description", event.target.value)
                    }
                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 min-h-20 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                    placeholder="Notes for this stop"
                  />
                </div>
              </div>
            ))}
          </APIProvider>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={addStop}>
              <Plus />
              Add stop
            </Button>
          </div>
        </section>

        <div className="mb-8 flex justify-end">
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Create itinerary
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateItinerary;
