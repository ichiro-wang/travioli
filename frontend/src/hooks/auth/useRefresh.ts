import { api } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRefresh = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: refresh,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => api.authRefreshPost(),

    onSuccess: () => {
      /**
       * invalidating will cause useGetMe to refetch the getMe route
       *
       * https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
       * - If the query is currently being rendered via useQuery or related hooks, it will also be refetched in the background
       */
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },

    onError: () => {
      // error refreshing token should log out user
      console.error("Logging out...");
      navigate("/login", { replace: true });
    },
  });

  return { refresh, isLoading, error };
};
