import { api } from "@/hooks";
import { useMutation } from "@tanstack/react-query";

export const useRefresh = () => {
  const {
    mutate: refresh,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: api.authRefreshGet,

    onSuccess: () => {
      console.log("Token refreshed successfully");
    },

    onError: (error) => {
      console.log(error.message);
    },
  });

  return { refresh, isLoading, error };
};
