import FullPage from "@/components/FullPage";
import { useAuthGuard } from "@/hooks/auth/useAuthGuard";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuthGuard();

  if (isLoading) {
    return <FullPage>loading...</FullPage>;
  }

  return user && children;
};

export default ProtectedRoute;
