import FullPage from "@/components/FullPage";
import { Loader } from "@/components/ui/loader";
import { AuthContext } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/auth/useAuthGuard";
import { type ReactNode } from "react";
import PageNotFound from "./PageNotFound";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <FullPage>
        <Loader />
      </FullPage>
    );
  }

  if (!user) return <PageNotFound />;

  /**
   * by using context to pass in `user` instead of retrieving via useGetMe or useAuthGuard,
   * we can avoid checking for `isLoading` or if `user` is undefined
   */
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default ProtectedRoute;
