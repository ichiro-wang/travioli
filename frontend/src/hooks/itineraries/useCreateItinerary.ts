import type { ItinerariesPostRequest } from "@/api";
import { api } from "@/hooks";
import type { ApiError } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateItinerary = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: createItinerary,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (itinerary: ItinerariesPostRequest) => {
      return api.itinerariesPost(itinerary);
    },

    onSuccess: (res) => {
      const itinerary = res.data.itinerary;

      toast.success("Itinerary created");
      queryClient.invalidateQueries({ queryKey: ["itineraries"] });
      navigate(`/i/${itinerary.id}`);
    },

    onError: (error: ApiError) => {
      const message =
        error.response?.data.message || "Could not create itinerary";

      toast.error(message);
      console.error("Error creating itinerary: " + message);
    },
  });

  return { createItinerary, isLoading, error };
};
