import type { AuthSignupPostRequest } from "@/api";
import { api } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (credentials: AuthSignupPostRequest) => {
      return api.authSignupPost(credentials);
    },
    onSuccess: (_, args) => {
      // change this later to pass in a token associated with an email, not the straight up email
      navigate(`/verify-email?email=${args.email}`);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { signup, isLoading, error };
};
