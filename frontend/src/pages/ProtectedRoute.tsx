import FullPage from "@/components/FullPage";
import { useAuthGuard } from "@/hooks/auth/useAuthGuard";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { data, isLoading } = useAuthGuard();

  if (isLoading) {
    return <FullPage>loading...</FullPage>;
  }

  return data && children;
};

export default ProtectedRoute;
