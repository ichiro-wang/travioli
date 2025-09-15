import type { AuthSignupPostRequest } from "@/api";
import { api } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
    onSuccess: () => {
      navigate(`/pending-verification`);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Error with signup: " + error.message);
    },
  });

  return { signup, isLoading, error };
};
