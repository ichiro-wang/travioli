import type { AuthLoginPostRequest } from "@/api";
import { api } from "@/hooks";
import type { ApiError } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (credentials: AuthLoginPostRequest) =>
      api.authLoginPost(credentials),

    onSuccess: (res) => {
      queryClient.setQueryData(["me"], res);
      navigate(`/${res.data.user.username}`);
    },
    onError: (error: ApiError) => {
      console.error("Error with login: " + error.response?.data.message);
    },
  });

  return { login, isLoading, error };
};
