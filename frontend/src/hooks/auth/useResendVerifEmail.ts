import { useMutation } from "@tanstack/react-query";
import { api } from "@/hooks";
import toast from "react-hot-toast";
import type { ApiError } from "@/types/api";

export const useResendVerifEmail = () => {
  const {
    mutate: resendVerifEmail,
    data: responseMessage,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (email: string) =>
      api.authResendVerificationEmailPost({ email }),

    onSuccess: () => {
      console.log("Verification email sent");
      toast.success("Verification email sent");
    },

    onError: (error: ApiError) => {
      console.error(error.response?.data.message);
      toast.error("Error resending email: " + error.response?.data.message);
    },
  });

  return { resendVerifEmail, responseMessage, isLoading, error };
};
