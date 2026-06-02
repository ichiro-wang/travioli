import {
  APIProvider,
  Map,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { Loader } from "@/components/ui/loader";
import { useGetItinerary } from "@/hooks/itineraries/useGetItinerary";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

interface RouteOverlayProps {
  points: google.maps.LatLngLiteral[];
}

const RouteOverlay = ({ points }: RouteOverlayProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    if (points.length === 1) {
      map.setCenter(points[0]);
      map.setZoom(14);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds, 80);
  }, [map, points]);

  useEffect(() => {
    if (!map || points.length < 2) return;

    const routeLine = new google.maps.Polyline({
      path: points,
      geodesic: true,
      strokeColor: "#2563eb",
      strokeOpacity: 0.85,
      strokeWeight: 4,
    });

    routeLine.setMap(map);

    return () => {
      routeLine.setMap(null);
    };
  }, [map, points]);

  return null;
};

const formatDate = (date: string | null | undefined) => {
  if (!date) return undefined;

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const formatDateRange = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (start && end) return `${start} to ${end}`;
  return start || end || "Dates not set";
};

const formatCost = (
  cost: number | null | undefined,
  currency: string | null | undefined
) => {
  if (cost === null || cost === undefined) return undefined;

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency || "CAD",
  }).format(cost);
};

const MapDisplay = () => {
  const { itineraryId } = useParams();
  const { data, status } = useGetItinerary(itineraryId);

  const itinerary = data?.data.itinerary;
  const itineraryItems = useMemo(
    () => itinerary?.itineraryItems ?? [],
    [itinerary?.itineraryItems]
  );
  const points = useMemo(
    () =>
      itineraryItems.flatMap((item) => {
        const coordinates = item.location?.coordinates;
        return coordinates ? [coordinates] : [];
      }),
    [itineraryItems]
  );

  const defaultCenter = points[0] || { lat: 49.2827, lng: -123.1207 };

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error loading itinerary.</p>;

  return (
    <div className="mx-auto flex h-full w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-4 md:px-6">
      <div className="grid gap-2">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">{itinerary?.title}</h1>
            <p className="text-sm text-slate-600">
              {formatDateRange(itinerary?.startDate, itinerary?.endDate)}
            </p>
          </div>
          <p className="rounded-md border px-3 py-1 text-sm">
            {itineraryItems.length}{" "}
            {itineraryItems.length === 1 ? "stop" : "stops"}
          </p>
        </div>

        {itinerary?.description && (
          <p className="max-w-3xl text-slate-700">{itinerary.description}</p>
        )}
      </div>

      <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-h-[28rem] overflow-hidden rounded-md border">
          <APIProvider apiKey={import.meta.env.VITE_MAPS_API}>
            <Map
              defaultCenter={defaultCenter}
              defaultZoom={12}
              mapId={import.meta.env.VITE_MAP_ID}
              gestureHandling="greedy"
            >
              {itineraryItems.map((item, index) => {
                const position = item.location?.coordinates;
                if (!position) return null;

                return (
                  <Marker
                    key={item.id}
                    position={position}
                    label={`${index + 1}`}
                    title={item.name}
                  />
                );
              })}

              <RouteOverlay points={points} />
            </Map>
          </APIProvider>
        </div>

        <aside className="grid content-start gap-3 lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto">
          <h2 className="text-lg font-semibold">Stops</h2>

          {itineraryItems.length === 0 ? (
            <p className="rounded-md border p-4 text-sm text-slate-600">
              This itinerary does not have any stops yet.
            </p>
          ) : (
            itineraryItems.map((item, index) => {
              const location = item.location;
              const cost = formatCost(
                item.cost,
                item.currencyOverride || itinerary?.currency
              );

              return (
                <article key={item.id} className="grid gap-2 rounded-md border p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 flex-none items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-medium leading-6">{item.name}</h3>
                      {location?.address && (
                        <p className="text-sm text-slate-600">
                          {location.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {(location?.city || location?.country) && (
                    <p className="text-sm text-slate-600">
                      {[location.city, location.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-sm text-slate-700">{item.description}</p>
                  )}

                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    {cost && <span className="rounded-md border px-2 py-1">{cost}</span>}
                    {location?.coordinates && (
                      <span className="rounded-md border px-2 py-1">
                        {location.coordinates.lat.toFixed(5)},{" "}
                        {location.coordinates.lng.toFixed(5)}
                      </span>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </aside>
      </div>
    </div>
  );
};

export default MapDisplay;
