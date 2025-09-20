import { useMutation } from "@tanstack/react-query";
import { api } from "@/hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import type { ApiError } from "@/types/api";

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    mutate: verifyEmail,
    data: responseMessage,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (token: string) => api.authVerifyEmailPost(token),

    onSuccess: (res) => {
      console.log(res.data.message);
      toast.success("Email verified! Redirecting to login page...");

      timeoutRef.current = setTimeout(() => {
        navigate("/login");
      }, 5000);
    },

    onError: (error: ApiError) => {
      console.log(error.response?.data.message);
      toast.error("Error verifying email: " + error.response?.data.message);
    },
  });

  // make sure timeout is cleaned up if the component unmounts before timeout is cleared
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { verifyEmail, responseMessage, isLoading, error };
};
