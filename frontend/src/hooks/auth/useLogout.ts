import { api } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    data: message,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => {
      return api.authLogoutPost();
    },
    onSuccess: () => {
      queryClient.clear(); // invalidate all queries
      navigate("/login");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Error with logout: " + error.message);
    },
  });

  return { logout, message, isLoading, error };
};
