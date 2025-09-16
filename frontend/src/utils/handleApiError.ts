import type { ApiError } from "@/types/api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: AxiosError<ApiError>) => {
  const message = error.response?.data?.message || error.message;
  toast.error(message);
  // console.error(error);
};
