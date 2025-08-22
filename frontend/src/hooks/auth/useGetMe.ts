import { api } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  const {
    data,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.authMeGet(),
    retry: false,
  });

  return { data, isLoading, error, refetch };
};
