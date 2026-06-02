import { api } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useGetItinerary = (itineraryId: string | undefined) => {
  return useQuery({
    queryKey: ["itinerary", itineraryId],
    queryFn: () => api.itinerariesIdGet(itineraryId!),
    enabled: itineraryId !== undefined,
    retry: false,
  });
};
