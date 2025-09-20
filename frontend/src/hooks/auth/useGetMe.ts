import { api } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.authMeGet(),
    retry: false,
  });

  return { user: data?.data.user, isLoading, error };
};
