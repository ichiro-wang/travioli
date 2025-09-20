import type { LoginResponse } from "@/api";
import { api } from "@/hooks";
import type { ApiError } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

export const useGetMe = () => {
  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery<AxiosResponse<LoginResponse>, ApiError>({
    queryKey: ["me"],
    queryFn: () => api.authMeGet(),
    retry: false,
  });

  return { user: data?.data.user, isLoading, error };
};
