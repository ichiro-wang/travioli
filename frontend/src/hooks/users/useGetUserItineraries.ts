import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "..";

export const useGetUserItineraries = (userId: string | undefined) => {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["itineraries", userId],
    queryFn: ({ pageParam = 0 }) => {
      return api.usersIdItinerariesGet(userId!, pageParam.toString());
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.pagination.hasMore ? allPages.length : undefined;
    },
    retry: false,
    // user id grabbed from search params. prevent from being called when undefined
    enabled: userId !== undefined,
  });
};
