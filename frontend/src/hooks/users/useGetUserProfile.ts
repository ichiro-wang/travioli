import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useGetUserProfile = (userId: string | undefined) => {
  const {
    data: user,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      return api.usersIdGet(userId!);
    },
    retry: false,
    // user id grabbed from search params. prevent from being called when undefined
    enabled: userId !== undefined,
  });

  return { user, isLoading, error };
};
