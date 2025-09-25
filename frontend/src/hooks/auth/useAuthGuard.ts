import { useNavigate } from "react-router-dom";
import { useGetMe } from "./useGetMe";
import { useRefresh } from "./useRefresh";
import { useEffect } from "react";
import { AxiosError } from "axios";

/**
 * - calls get me route
 * - if it fails:
 *  - call the refresh route to refresh the JWT
 *  - if refresh fails, it will return to login page
 *  - if it succeeds, it calls get me route
 */
export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { user, isLoading, error } = useGetMe();
  const { refresh } = useRefresh();

  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError && error.status === 401) {
        refresh(undefined);
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [error, refresh, navigate]);

  return { user, isLoading };
};
