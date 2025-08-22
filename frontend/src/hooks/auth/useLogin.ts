import type { AuthLoginPostRequest } from "@/api";
import { api } from "@/hooks";
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
    mutationFn: (credentials: AuthLoginPostRequest) => {
      return api.authLoginPost(credentials);
    },
    onSuccess: (res) => {
      console.log(res.data.user);
      queryClient.setQueryData(["me"], res.data.user);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { login, isLoading, error };
};
