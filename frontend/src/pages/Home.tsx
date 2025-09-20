import { useGetMe } from "@/hooks/auth/useGetMe";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user } = useGetMe();
  return <Navigate replace={false} to={`/${user?.username}`} />;
};

export default Home;
