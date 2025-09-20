import type { AuthSignupPostRequest } from "@/api";
import { api } from "@/hooks";
import type { ApiError } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (credentials: AuthSignupPostRequest) =>
      api.authSignupPost(credentials),

    onSuccess: () => {
      navigate(`/pending-verification`);
    },

    onError: (error: ApiError) => {
      console.error("Error with signup: " + error.response?.data.message);
    },
  });

  return { signup, isLoading, error };
};
