import { useGetMe } from "@/hooks/auth/useGetMe";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMe();

  useEffect(() => {
    if (!isLoading && !data) {
      console.log("Please log in")
      navigate("/login", { replace: true });
    }
  }, [data, isLoading, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default ProtectedRoute;
