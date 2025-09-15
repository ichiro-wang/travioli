import { useMutation } from "@tanstack/react-query";
import { api } from "@/hooks";
import toast from "react-hot-toast";

export const useResendVerifEmail = () => {
  const {
    mutate: resendVerifEmail,
    data: responseMessage,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (email: string) => {
      return api.authResendVerificationEmailPost({ email });
    },

    onSuccess: () => {
      console.log("Verification email sent");
      toast.success("Verification email sent");
    },

    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  return { resendVerifEmail, responseMessage, isLoading, error };
};
