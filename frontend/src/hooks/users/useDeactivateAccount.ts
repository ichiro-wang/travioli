import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import type { UsersMeDeleteRequest } from "@/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { ApiError } from "@/types/api";

export const useDeactivateAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deactivateAccount,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (password: UsersMeDeleteRequest) => {
      return api.usersMeDelete(password);
    },

    onSuccess: () => {
      toast.success("Account deactivated");
      queryClient.clear(); // invalidate all queries
      navigate("/login", { replace: true });
    },

    onError: (error: ApiError) => {
      toast.error(
        "Error in deactivating account: " + error.response?.data.message
      );
    },
  });

  return { deactivateAccount, isLoading, error };
};
