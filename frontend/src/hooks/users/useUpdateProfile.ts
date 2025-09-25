import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import type { UsersMePatchRequest } from "@/api";
import toast from "react-hot-toast";
import type { ApiError } from "@/types/api";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    data: user,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (payload: UsersMePatchRequest) => api.usersMePatch(payload),

    onSuccess: (res) => {
      toast.success("Profile updated!");
      queryClient.setQueryData(["me"], res);
    },

    onError: (error: ApiError) => {
      console.log(error.response?.data.message);
    },
  });

  return { updateProfile, user, isLoading, error };
};
